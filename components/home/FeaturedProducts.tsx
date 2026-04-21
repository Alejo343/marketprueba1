import Link from "next/link";
import type { ProductVariant } from "@/types";
import ProductCard from "./ProductCard";
import { ArrowIcon } from "./icons";

interface Props {
  variants: ProductVariant[];
}

export default function FeaturedProducts({ variants }: Props) {
  return (
    <section className="py-12 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[var(--color-primary)] text-xs font-semibold tracking-widest uppercase block mb-2">
              Selección especial
            </span>
            <h2
              className="text-[2rem] font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Productos destacados
            </h2>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Ver todos <ArrowIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {variants.map((v) => (
            <ProductCard key={v.id} variant={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
