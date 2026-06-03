"use client";

import { useState, useEffect, useRef } from "react";
import type { Region, ProductVariant } from "@/types";
import ProductCard from "./ProductCard";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={`w-4 h-4 text-(--color-primary) transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const EXCLUDED_REGION_IDS = [47, 39];

export default function FeaturedProducts() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/regions").then((r) => r.json()),
      fetch("/api/featured-variants").then((r) => r.json()),
    ])
      .then(([regionsRes, featuredRes]) => {
        const allRegions: Region[] = regionsRes.data ?? [];
        const excludedSet = new Set(EXCLUDED_REGION_IDS);
        for (const r of allRegions) {
          if (r.parent_id !== null && excludedSet.has(r.parent_id)) excludedSet.add(r.id);
        }
        const allowedRegions = allRegions.filter((r: Region) => !excludedSet.has(r.id));
        const regionIdsWithProducts = new Set<number>(
          (featuredRes.data ?? [])
            .map((v: { product?: { region_id?: number | null } }) => v.product?.region_id)
            .filter(Boolean),
        );
        const loaded = allowedRegions.filter((r) => regionIdsWithProducts.has(r.id));
        setRegions(loaded);
        if (loaded.length > 0) setSelectedRegion(loaded[0].id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedRegion === null) return;
    setLoading(true);
    const url = `/api/featured-variants?region_id=${selectedRegion}`;
    fetch(url)
      .then((r) => r.json())
      .then((res) => setProducts((res.data ?? []).slice(0, 8)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedRegion]);

  // Auto-cycle every 10 s; restarted when user picks manually (timerKey changes)
  useEffect(() => {
    if (regions.length === 0) return;
    const options = regions.map((r) => r.id);
    const interval = setInterval(() => {
      setSelectedRegion((prev) => {
        const idx = options.indexOf(prev as number);
        return options[(idx + 1) % options.length];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [regions, timerKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleSelect = (id: number) => {
    setSelectedRegion(id);
    setDropdownOpen(false);
    setTimerKey((k) => k + 1);
  };

  const selectedName =
    regions.find((r) => r.id === selectedRegion)?.name ?? "Seleccionar región";

  // Progress bar key — restarts animation on every region change
  const progressKey = `${timerKey}-${selectedRegion}`;

  const dropdownOptions = regions.map((r) => ({ id: r.id, name: r.name }));

  return (
    <section className="py-14 bg-(--color-bg)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-(--color-primary) text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              Selección especial
            </span>
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-(--color-text) leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Productos destacados
            </h2>
          </div>

          {/* Dropdown */}
          {regions.length > 0 && (
            <div ref={dropdownRef} className="relative shrink-0 w-full sm:w-64">
              {/* Trigger */}
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-(--color-surface) border border-(--color-primary)/20 hover:border-(--color-primary)/50 transition-all duration-300 cursor-pointer group"
              >
                <span
                  className="text-sm font-medium text-(--color-text) truncate"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {selectedName}
                </span>
                <ChevronDown open={dropdownOpen} />
              </button>

              {/* Progress bar — runs from 100% → 0% width in 10 s */}
              <div className="absolute bottom-0 left-3 right-3 h-px overflow-hidden">
                <div
                  key={progressKey}
                  className="h-full bg-(--color-primary)/60"
                  style={{ animation: "region-progress 10s linear forwards" }}
                />
              </div>

              {/* Dropdown list */}
              {dropdownOpen && (
                <ul
                  className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-xl bg-(--color-surface) border border-(--color-primary)/20 shadow-2xl overflow-hidden z-50 py-1"
                  style={{ animation: "dropdown-in 0.18s ease forwards" }}
                >
                  {dropdownOptions.map((opt) => {
                    const active = opt.id === selectedRegion;
                    return (
                      <li key={opt.id}>
                        <button
                          onClick={() => handleSelect(opt.id)}
                          className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors duration-150 cursor-pointer text-left ${
                            active
                              ? "bg-(--color-primary)/10 text-(--color-primary)"
                              : "text-(--color-muted) hover:bg-(--color-primary)/5 hover:text-(--color-text)"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-150 ${
                              active ? "bg-(--color-primary)" : "bg-(--color-muted)/30"
                            }`}
                          />
                          <span style={active ? { fontFamily: "var(--font-playfair)" } : undefined}>
                            {opt.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-3/4 rounded-2xl bg-(--color-surface) animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((v) => (
              <ProductCard key={v.id} variant={v} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
