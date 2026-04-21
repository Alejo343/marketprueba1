"use client";

import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);
  const name = variant.product?.name ?? "";
  const image = variant.primary_image?.url ?? "";

  return (
    <Link href={`/products/${variant.product_id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/35 transition-all duration-300 cursor-pointer"
      >
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
          <div
            className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
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
