import Link from "next/link";
import type { ProductVariant } from "@/types";
import { formatPrice } from "./ProductCard";
import { ArrowIcon } from "./icons";

interface Props {
  variants: ProductVariant[];
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-primary)]/10 animate-pulse">
          <div className="aspect-square bg-[var(--color-surface)]" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-[var(--color-surface)] rounded w-3/4" />
            <div className="h-3 bg-[var(--color-surface)] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LatestProducts({ variants }: Props) {
  return (
    <section className="py-12 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[var(--color-primary)] text-xs font-semibold tracking-widest uppercase block mb-2">
              Recién llegados
            </span>
            <h2
              className="text-[2rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Últimos productos
            </h2>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Ver todos <ArrowIcon />
          </Link>
        </div>

        {variants.length === 0 ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {variants.map((variant) => {
              const img = variant.primary_image?.url ?? variant.product?.media?.[0]?.url;
              return (
                <Link
                  key={variant.id}
                  href={`/products/${variant.product_id}`}
                  className="group bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/35 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-square bg-[var(--color-subtle-bg)] overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={variant.product?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-[var(--color-primary)]/20 text-5xl font-bold"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {variant.product?.name?.[0] ?? "B"}
                      </div>
                    )}
                    {variant.has_sale && (
                      <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Oferta
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[var(--color-text)] text-sm font-medium leading-snug mb-1 line-clamp-2">
                      {variant.product?.name}
                    </p>
                    <p className="text-[var(--color-muted)] text-xs mb-3">{variant.presentation}</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-[var(--color-primary)] font-bold text-base"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {formatPrice(variant.final_price)}
                      </span>
                      {variant.has_sale && variant.price !== variant.final_price && (
                        <span className="text-[var(--color-muted)] text-xs line-through">
                          {formatPrice(variant.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
