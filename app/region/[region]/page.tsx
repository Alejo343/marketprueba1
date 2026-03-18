import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/HeaderCategories";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryTitle from "@/components/CategoryTitle";
import SearchBar from "@/components/SearchBar";
import PriceRange from "@/components/PriceRange";
import FilterStatus from "@/components/FilterStatus";
import FilterBrand from "@/components/FilterBrand";
import ProductList from "@/components/ProductList";
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

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
  console.log("slug recibido:", regionSlug);

  const regionsRes = await getRegions();
  console.log(
    "regiones:",
    regionsRes.data.map((r: Region) => toSlug(r.name)),
  );
  const matchedRegion = regionsRes.data.find(
    (r: Region) => toSlug(r.name) === regionSlug,
  );

  if (!matchedRegion) {
    notFound();
  }

  const variantsRes = await getProductVariantsByRegion(matchedRegion.id);
  const variants: ProductVariant[] = variantsRes.data;

  const displayedVariants = variants.slice(0, 10);
  const totalProducts = variants.length;
  const displayedProducts = variants.length;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 bg-[var(--background)]">
        <div className="layout-container pb-20 sm:px-4">
          <Breadcrumb category={regionSlug} />

          <div className="flex xs:flex-col gap-3 overflow-visible">
            <Suspense fallback={null}>
              <CategoryTitle
                category={matchedRegion.name}
                totalProducts={totalProducts}
                displayedProducts={displayedProducts}
              />
            </Suspense>
            <SearchBar />
          </div>

          <div className="grid grid-cols-12 gap-8 mt-8">
            <aside className="col-span-3">
              <PriceRange
                initialMin={0}
                initialMax={4000}
                resultCount={totalProducts}
              />
              <FilterStatus
                numSaleOff={variants.filter((v) => v.has_sale).length}
                numLimited={variants.filter((v) => v.low_stock).length}
                numLoved={0}
              />
              <FilterBrand numBalenciaga={0} numLouisVuitton={0} numGucci={0} />
            </aside>

            <section className="col-span-9">
              <ProductList products={displayedVariants} category={regionSlug} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
