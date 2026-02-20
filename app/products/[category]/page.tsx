import { notFound } from "next/navigation";
import Header from "@/components/HeaderCategories";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryTitle from "@/components/CategoryTitle";
import SearchBar from "@/components/SearchBar";
import PriceRange from "@/components/PriceRange";
import FilterStatus from "@/components/FilterStatus";
import FilterBrand from "@/components/FilterBrand";
import ProductList from "@/components/ProductList";

const validCategories = ["men", "women", "children", "shoes", "accessory"];

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "GUCCI DIANA MINI TOTE BAG",
    price: 1475,
    discount: 0,
    availability: true,
    brand: "gucci",
    image: {
      img1: "/images/clothes/men/shirt1.png",
    },
  },
  {
    id: "2",
    name: "BOW DETAIL A-LINE DRESS",
    price: 3450,
    discount: 0,
    availability: true,
    brand: "louis vuitton",
    image: {
      img1: "/images/clothes/men/shirt2.png",
    },
  },
  {
    id: "3",
    name: "LA MEDUSA SMALL HANDBAG",
    price: 2500,
    discount: 0,
    availability: false,
    brand: "versace",
    image: {
      img1: "/images/clothes/men/shirt3.png",
    },
  },
  {
    id: "4",
    name: "CHECK PANEL COTTON DRESS WITH BLOOMERS",
    price: 431.2,
    discount: 25,
    availability: true,
    brand: "burberry",
    image: {
      img1: "/images/clothes/men/shirt4.png",
    },
  },
];

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
      <main className="min-h-screen pt-12 bg-[var(--background)]">
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
              <FilterBrand numBalenciaga={0} numLouisVuitton={1} numGucci={1} />
            </aside>

            {/* Products grid - placeholder */}
            <section className="col-span-9">
              <ProductList products={mockProducts} category={category} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
