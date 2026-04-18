import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductListView from "@/components/ProductListView";
import { getRegions, getProductVariantsByRegion } from "@/lib/api";
import { Region, ProductVariant } from "@/types";

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

  const variantsRes = await getProductVariantsByRegion(matchedRegion.id);
  const variants: ProductVariant[] = variantsRes.data;

  return (
    <>
      <Header />
      <ProductListView
        variants={variants}
        regionName={matchedRegion.name}
        regionSlug={regionSlug}
      />
    </>
  );
}
