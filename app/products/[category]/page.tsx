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
import { getCategories, getProductVariantsByCategory } from "@/lib/api";
import { Category, ProductVariant } from "@/types";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// Convierte nombre de categoría a slug URL
const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

export async function generateStaticParams() {
  try {
    const res = await getCategories();
    return res.data.map((category: Category) => ({
      category: toSlug(category.name),
    }));
  } catch {
    return [];
  }
}

export default async function ProductsPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // Obtener todas las categorías y buscar la que coincide con el slug
  const categoriesRes = await getCategories();
  const matchedCategory = categoriesRes.data.find(
    (cat: Category) => toSlug(cat.name) === categorySlug,
  );

  if (!matchedCategory) {
    notFound();
  }

  // Obtener variantes filtradas por category_id
  const variantsRes = await getProductVariantsByCategory(matchedCategory.id);
  const variants: ProductVariant[] = variantsRes.data;

  const displayedVariants = variants.slice(0, 10);

  const totalProducts = variants.length;
  const displayedProducts = variants.length;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 bg-[var(--background)]">
        <div className="layout-container pb-20 sm:px-4">
          <Breadcrumb category={categorySlug} />

          <div className="flex xs:flex-col gap-3 overflow-visible">
            <Suspense fallback={null}>
              <CategoryTitle
                category={matchedCategory.name}
                totalProducts={totalProducts}
                displayedProducts={displayedProducts}
              />
            </Suspense>
            <SearchBar />
          </div>

          {/* Main content area - filters + products */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Sidebar filters */}
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

            {/* Products grid */}
            <section className="col-span-9">
              <ProductList
                products={displayedVariants}
                category={categorySlug}
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
