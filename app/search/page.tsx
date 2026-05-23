"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ProductListView from "@/components/ProductListView";
import { ProductVariant } from "@/types";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
}

function SearchResults() {
  const params = useSearchParams();
  const q = params?.get("q") ?? "";
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/product-variants")
      .then((r) => r.json())
      .then((json) => setVariants(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = normalize(q.trim());
    if (!term) return variants;
    return variants.filter(
      (v) =>
        normalize(v.product?.name ?? "").includes(term) ||
        normalize(v.product?.brand?.name ?? "").includes(term) ||
        normalize(v.presentation ?? "").includes(term),
    );
  }, [variants, q]);

  const title = q.trim() ? `Resultados para "${q}"` : "Todos los productos";

  if (loading) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-(--color-muted) text-sm tracking-widest uppercase animate-pulse">
          Buscando...
        </p>
      </main>
    );
  }

  return (
    <ProductListView
      variants={filtered}
      regionName={title}
      regionSlug="search"
    />
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </>
  );
}
