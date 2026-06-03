import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductListView from "@/components/ProductListView";
import { getRegions, getProductVariantsByRegion } from "@/lib/api";
import { Region, ProductVariant } from "@/types";

export const revalidate = 300;

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "y")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export async function generateStaticParams() {
  try {
    const res = await getRegions();
    return res.data.map((region: Region) => ({
      region: toSlug(region.name),
    }));
  } catch {
    return [];
  }
}

export default async function RegionPage({ params }: PageProps) {
  const { region: regionSlug } = await params;

  const regionsRes = await getRegions();
  const matchedRegion = regionsRes.data.find(
    (r: Region) => toSlug(r.name) === regionSlug,
  );

  if (!matchedRegion) {
    notFound();
  }

  const childRegions = regionsRes.data.filter(
    (r: Region) => r.parent_id === matchedRegion.id
  );

  let variants: ProductVariant[];

  if (childRegions.length > 0) {
    const [parentRes, ...childResults] = await Promise.all([
      getProductVariantsByRegion(matchedRegion.id),
      ...childRegions.map((child: Region) => getProductVariantsByRegion(child.id)),
    ]);
    variants = [
      ...(parentRes.data ?? []),
      ...childResults.flatMap((res) => res.data ?? []),
    ];
  } else {
    const variantsRes = await getProductVariantsByRegion(matchedRegion.id);
    variants = variantsRes.data ?? [];
  }

  return (
    <>
      <Header />
      <Suspense>
        <ProductListView
          variants={variants}
          regionName={matchedRegion.name}
          regionSlug={regionSlug}
        />
      </Suspense>
    </>
  );
}
