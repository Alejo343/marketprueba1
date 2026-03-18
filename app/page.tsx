import Header from "../components/Header";
import Footer from "@/components/Footer";
import FeturedBanners from "@/components/FeaturedBanners";
import CategoriesBanners from "@/components/CategoriesBanner";
import NewlyArrivedBrands from "@/components/NewlyArrivedBrands";
import TrendingProducts from "@/components/TrendingProducts";
import ProductCarousel from "@/components/ProductCarousel";
import FeaturedSections from "@/components/FeaturedSections";

export default function Home() {
  return (
    <div className="App">
      <Header cartTotal="$1290.00" />
      <FeturedBanners />
      <FeaturedSections />
      <CategoriesBanners />
      <NewlyArrivedBrands />
      <TrendingProducts />
      <ProductCarousel />

      {/* <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Bienvenido a The Barril Market</h1>
        <p className="mt-4 text-gray-600">
          Este es un ejemplo de cómo usar el componente Header.
        </p>
      </main> */}
      <Footer />
    </div>
  );
}
