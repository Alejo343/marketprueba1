import { notFound } from "next/navigation";
import Header from "@/components/HeaderCategories";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryTitle from "@/components/CategoryTitle";
import SearchBar from "@/components/SearchBar";
import PriceRange from "@/components/PriceRange";
import FilterStatus from "@/components/FilterStatus";

const validCategories = ["men", "women", "children", "shoes", "accessory"];

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default async function ProductsPage({ params }: PageProps) {
  const { category } = await params;

  // Validate category
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Mock data - replace with your actual data fetching
  const totalProducts = 4;
  const displayedProducts = 4;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 bg-[#fafafa]">
        <div className="layout-container pb-20 sm:px-4">
          <Breadcrumb category={category} />

          <div className="flex xs:flex-col gap-3 overflow-visible">
            <CategoryTitle
              category={category}
              totalProducts={totalProducts}
              displayedProducts={displayedProducts}
            />
            <SearchBar />
          </div>

          {/* Main content area - filters + products */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Sidebar filters */}
            <aside className="col-span-3">
              <PriceRange initialMin={0} initialMax={4000} resultCount={4} />
              <FilterStatus numSaleOff={1} numLimited={2} numLoved={1} />
            </aside>

            {/* Products grid - placeholder */}
            <section className="col-span-9">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-500">Products will go here</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
