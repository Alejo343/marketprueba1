"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Region, FeaturedProduct } from "@/types";
import ProductCard from "./ProductCard";
import { ArrowIcon } from "./icons";

export default function FeaturedProducts() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/regions")
      .then((r) => r.json())
      .then((res) => setRegions(res.data ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedRegion
      ? `/api/featured-products?region_id=${selectedRegion}`
      : `/api/featured-products`;
    fetch(url)
      .then((r) => r.json())
      .then((res) => setProducts(res.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedRegion]);

  return (
    <section className="py-12 bg-(--color-bg)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-(--color-primary) text-xs font-semibold tracking-widest uppercase block mb-2">
              Selección especial
            </span>
            <h2
              className="text-[2rem] font-bold text-(--color-text)"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Productos destacados
            </h2>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-(--color-primary) hover:text-(--color-primary-hover) text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Ver todos <ArrowIcon />
          </Link>
        </div>

        {regions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 cursor-pointer ${
                selectedRegion === null
                  ? "bg-(--color-primary) border-(--color-primary) text-(--color-on-primary)"
                  : "bg-transparent border-(--color-primary)/30 text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-text)"
              }`}
            >
              Todas
            </button>
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 cursor-pointer ${
                  selectedRegion === r.id
                    ? "bg-(--color-primary) border-(--color-primary) text-(--color-on-primary)"
                    : "bg-transparent border-(--color-primary)/30 text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-text)"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 rounded-2xl bg-(--color-surface) animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => {
              const v = p.variants?.[0];
              if (!v) return null;
              return (
                <ProductCard
                  key={p.id}
                  variant={{
                    ...v,
                    primary_image: p.primary_image ?? v.primary_image,
                    product: {
                      id: p.id,
                      name: p.name,
                      description: "",
                      sale_type: p.sale_type,
                      sale_type_label: p.sale_type_label ?? "",
                      brand: p.brand ?? null,
                      media: [],
                    },
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
