import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getProductVariantsByProductId } from "@/lib/api";
import { Media } from "@/types";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: productId } = await params;

  const id = Number(productId);
  if (isNaN(id)) notFound();

  const { data: variants } = await getProductVariantsByProductId(id);
  if (!variants || variants.length === 0) notFound();

  const product = variants[0].product;

  const images: Media[] =
    (product as { media?: Media[] }).media?.length
      ? (product as { media: Media[] }).media
      : variants[0].primary_image
      ? [variants[0].primary_image]
      : [];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[var(--color-bg)]" style={{ fontFamily: "var(--font-inter)" }}>
        <div
          className="absolute inset-x-0 top-0 h-96 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--color-placeholder)] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors duration-200">Inicio</Link>
            <ChevronIcon />
            <span className="text-[var(--color-muted)] truncate max-w-50">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
            <ProductGallery images={images} productName={product.name} />
            <ProductInfo variants={variants} />
          </div>

          {/* Gold divider */}
          <div className="h-px bg-linear-to-r from-transparent via-[var(--color-primary)]/20 to-transparent my-16" />

          {/* Description section */}
          {product.description && (
            <div className="max-w-2xl">
              <h2
                className="text-lg font-bold text-[var(--color-text)] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Descripción
              </h2>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
