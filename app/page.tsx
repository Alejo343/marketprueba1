import Header from "../components/Header";
import Footer from "@/components/Footer";
import FeturedBanners from "@/components/FeaturedBanners";

export default function Home() {
  return (
    <div className="App">
      <Header cartTotal="$1290.00" />
      <FeturedBanners />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Bienvenido a FoodMart</h1>
        <p className="mt-4 text-gray-600">
          Este es un ejemplo de cómo usar el componente Header.
        </p>
      </main>
      <Footer />
    </div>
  );
}
