"use client";

import Link from "next/link";
import type { ProductVariant } from "@/types";
import { CartIcon } from "./icons";

export function formatPrice(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function ProductCard({ variant }: { variant: ProductVariant }) {
  const name = variant.product?.name ?? "";
  const image = variant.primary_image?.url ?? "";

  return (
    <Link href={`/products/${variant.product_id}`}>
      <div className="group bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-primary)/10 hover:border-(--color-primary)/35 transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square bg-[var(--color-subtle-bg)] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {variant.has_sale && (
            <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Oferta
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 transition-all duration-300 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
            <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer">
              <CartIcon /> Agregar al carrito
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[var(--color-text)] text-sm font-medium leading-snug mb-2 line-clamp-2">{name}</p>
          <p className="text-[var(--color-muted)] text-xs mb-3">{variant.presentation}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[var(--color-primary)] font-bold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
              {formatPrice(variant.final_price)}
            </span>
            {variant.has_sale && variant.price !== variant.final_price && (
              <span className="text-[var(--color-muted)] text-xs line-through">
                {formatPrice(variant.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
