import { notFound } from "next/navigation";
import Header from "@/components/HeaderCategories";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getProductVariantsByProductId } from "@/lib/api";
import { Media } from "@/types";

interface PageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categorySlug, productId } = await params;

  const id = Number(productId);
  if (isNaN(id)) notFound();

  const { data: variants } = await getProductVariantsByProductId(id);

  if (!variants || variants.length === 0) notFound();

  const product = variants[0].product;

  // Imágenes: usar media del producto si existe, si no primary_image como fallback
  const images: Media[] =
    (product as any).media?.length > 0
      ? (product as any).media
      : variants[0].primary_image
        ? [variants[0].primary_image]
        : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 bg-[var(--background)]">
        <div className="layout-container pb-20 sm:px-4">
          <Breadcrumb category={categorySlug} productName={product.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            <ProductGallery images={images} productName={product.name} />
            <ProductInfo variants={variants} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
