"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ProductVariant } from "@/types";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
}

// ─── Filter accordion section ─────────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-(--color-divider) pb-4 mb-4">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-(--color-text) text-sm font-semibold mb-3 cursor-pointer hover:text-(--color-primary) transition-colors duration-200">
        {title} <ChevronIcon open={open} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

function VariantCard({ variant, category }: { variant: ProductVariant; category: string }) {
  const { addItem } = useCartStore();
  const [hovered, setHovered] = useState(false);
  const img = variant.primary_image?.url;
  const discount = variant.has_sale && variant.sale_price
    ? Math.round(((variant.price - variant.sale_price) / variant.price) * 100)
    : 0;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-primary)/10 hover:border-(--color-primary)/35 transition-all duration-300">

      {/* Image */}
      <Link href={`/products/${category}/${variant.product_id}`} className="block relative aspect-square bg-(--color-subtle-bg) overflow-hidden">
        {img ? (
          <img src={img} alt={variant.product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-(--color-primary)/20 text-5xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}>
            {variant.product?.name?.[0] ?? "B"}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-(--color-primary) text-(--color-on-primary) text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {!variant.in_stock && (
            <span className="bg-(--color-subtle-bg) text-(--color-muted) text-[10px] font-medium px-2 py-0.5 rounded-full border border-(--color-divider)">
              Sin stock
            </span>
          )}
          {variant.low_stock && variant.in_stock && (
            <span className="bg-red-500/15 text-red-500 text-[10px] font-medium px-2 py-0.5 rounded-full border border-red-500/30">
              Últimas unidades
            </span>
          )}
        </div>

        {/* Quick add */}
        <div className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${hovered && variant.in_stock ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <button
            onClick={(e) => { e.preventDefault(); addItem({ variantId: variant.id, productId: variant.product_id, name: variant.product?.name ?? "", presentation: variant.presentation, price: variant.final_price, image: variant.primary_image?.url ?? null }); }}
            className="w-full flex items-center justify-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 cursor-pointer">
            <CartIcon /> Agregar al carrito
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {variant.product?.brand && (
          <p className="text-(--color-primary)/70 text-[10px] font-semibold uppercase tracking-widest mb-1">
            {variant.product.brand.name}
          </p>
        )}
        <Link href={`/products/${category}/${variant.product_id}`}>
          <p className="text-(--color-text) text-sm font-medium leading-snug mb-1 line-clamp-2 hover:text-(--color-primary) transition-colors">
            {variant.product?.name}
          </p>
        </Link>
        <p className="text-(--color-muted) text-xs mb-3">{variant.presentation}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-(--color-primary) font-bold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
            {fmt(variant.final_price)}
          </span>
          {variant.has_sale && variant.price !== variant.final_price && (
            <span className="text-(--color-muted) text-xs line-through">{fmt(variant.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  variants: ProductVariant[];
  regionName: string;
  regionSlug: string;
}

const SORT_OPTIONS = [
  { value: "default", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre A-Z" },
];

const PER_PAGE = 12;

export default function ProductListView({ variants, regionName, regionSlug }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const absoluteMax = useMemo(() => Math.max(...variants.map((v) => v.price), 0), [variants]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(Infinity);
  const brands = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => { if (v.product?.brand?.name) set.add(v.product.brand.name); });
    return Array.from(set).sort();
  }, [variants]);

  const filtered = useMemo(() => {
    let list = [...variants];
    if (search) list = list.filter((v) => v.product?.name?.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((v) => v.final_price >= priceMin && v.final_price <= priceMax);
    if (onlyInStock) list = list.filter((v) => v.in_stock);
    if (onlySale) list = list.filter((v) => v.has_sale);
    if (selectedBrands.size > 0) list = list.filter((v) => v.product?.brand?.name && selectedBrands.has(v.product.brand.name));

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.final_price - b.final_price); break;
      case "price-desc": list.sort((a, b) => b.final_price - a.final_price); break;
      case "name-asc": list.sort((a, b) => (a.product?.name ?? "").localeCompare(b.product?.name ?? "")); break;
    }
    return list;
  }, [variants, search, priceMin, priceMax, onlyInStock, onlySale, selectedBrands, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(brand) ? next.delete(brand) : next.add(brand);
      return next;
    });
    setPage(1);
  };

  const activeFilters = (onlyInStock ? 1 : 0) + (onlySale ? 1 : 0) + selectedBrands.size +
    (priceMin > 0 || priceMax < absoluteMax ? 1 : 0) + (search ? 1 : 0);

  const resetFilters = () => {
    setSearch(""); setSort("default"); setPriceMin(0); setPriceMax(absoluteMax);
    setOnlyInStock(false); setOnlySale(false); setSelectedBrands(new Set()); setPage(1);
  };

  const FiltersPanel = () => (
    <div className="space-y-0">
      {/* Price */}
      <FilterSection title="Precio">
        <div className="px-1">
          <div className="flex justify-between text-xs text-(--color-muted) mb-3">
            <span>{fmt(priceMin)}</span><span>{fmt(priceMax)}</span>
          </div>
          <div className="relative h-1 bg-(--color-divider) rounded-full mb-2">
            <div className="absolute h-full bg-(--color-primary) rounded-full"
              style={{ left: `${(priceMin / absoluteMax) * 100}%`, right: `${100 - (priceMax / absoluteMax) * 100}%` }} />
          </div>
          <input type="range" min={0} max={absoluteMax} value={priceMin}
            onChange={(e) => { setPriceMin(Math.min(Number(e.target.value), priceMax - 1000)); setPage(1); }}
            className="w-full accent-(--color-primary) bg-transparent cursor-pointer" />
          <input type="range" min={0} max={absoluteMax} value={priceMax}
            onChange={(e) => { setPriceMax(Math.max(Number(e.target.value), priceMin + 1000)); setPage(1); }}
            className="w-full accent-(--color-primary) bg-transparent cursor-pointer" />
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Disponibilidad">
        <div className="space-y-2">
          {[
            { label: "En stock", count: variants.filter((v) => v.in_stock).length, active: onlyInStock, toggle: () => { setOnlyInStock(!onlyInStock); setPage(1); } },
            { label: "En oferta", count: variants.filter((v) => v.has_sale).length, active: onlySale, toggle: () => { setOnlySale(!onlySale); setPage(1); } },
          ].map((opt) => (
            <button key={opt.label} onClick={opt.toggle}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer ${opt.active
                ? "bg-(--color-primary)/15 border border-(--color-primary)/40 text-(--color-primary)"
                : "bg-(--color-subtle-bg) border border-transparent text-(--color-muted) hover:border-(--color-primary)/20 hover:text-(--color-text)"}`}>
              <span className="font-medium">{opt.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${opt.active ? "bg-(--color-primary)/20" : "bg-(--color-divider)"}`}>{opt.count}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      {brands.length > 0 && (
        <FilterSection title="Marca">
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {brands.map((brand) => {
              const count = variants.filter((v) => v.product?.brand?.name === brand).length;
              const checked = selectedBrands.has(brand);
              return (
                <label key={brand} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <div onClick={() => toggleBrand(brand)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${checked ? "bg-(--color-primary) border-(--color-primary)" : "border-(--color-input-border) group-hover:border-(--color-primary)/50"}`}>
                      {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                    <span className={`text-xs transition-colors duration-200 ${checked ? "text-(--color-text) font-medium" : "text-(--color-muted) group-hover:text-(--color-text)"}`}>{brand}</span>
                  </div>
                  <span className="text-[10px] text-(--color-placeholder)">{count}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-(--color-bg) pt-30" style={{ fontFamily: "var(--font-inter)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-(--color-primary) text-xs font-semibold tracking-widest uppercase mb-1">Tienda</p>
            <h1 className="text-[2rem] font-bold text-(--color-text)" style={{ fontFamily: "var(--font-playfair)" }}>
              {regionName}
            </h1>
            <p className="text-(--color-muted) text-sm mt-1">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              {activeFilters > 0 && <span className="text-(--color-primary)"> · {activeFilters} filtro{activeFilters > 1 ? "s" : ""} activo{activeFilters > 1 ? "s" : ""}</span>}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="flex items-center bg-(--color-surface) border border-(--color-divider) rounded-lg px-3 py-2 gap-2 focus-within:border-(--color-primary)/50 transition-all duration-200">
              <span className="text-(--color-primary)/50"><SearchIcon /></span>
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar en esta tienda..."
                className="bg-transparent text-(--color-text) text-sm placeholder:text-(--color-placeholder) focus:outline-none w-48" />
              {search && (
                <button onClick={() => { setSearch(""); setPage(1); }} className="text-(--color-muted) hover:text-(--color-text) cursor-pointer transition-colors">
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Sort */}
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="bg-(--color-surface) border border-(--color-divider) text-(--color-text) text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-(--color-primary)/50 cursor-pointer transition-all duration-200">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Mobile filter toggle */}
            <button onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-(--color-surface) border border-(--color-divider) text-(--color-text) text-sm rounded-lg px-3 py-2 cursor-pointer hover:border-(--color-primary)/40 transition-all duration-200">
              <FilterIcon />
              Filtros {activeFilters > 0 && <span className="bg-(--color-primary) text-(--color-on-primary) text-[10px] font-bold px-1.5 rounded-full">{activeFilters}</span>}
            </button>

            {/* Reset */}
            {activeFilters > 0 && (
              <button onClick={resetFilters}
                className="text-(--color-muted) hover:text-(--color-primary) text-xs transition-colors duration-200 cursor-pointer underline underline-offset-2">
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-linear-to-r from-transparent via-(--color-primary)/30 to-transparent mb-8" />

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-5 sticky top-28">
              <div className="flex items-center justify-between mb-5">
                <span className="text-(--color-text) text-sm font-bold flex items-center gap-2">
                  <FilterIcon /> Filtros
                </span>
                {activeFilters > 0 && (
                  <button onClick={resetFilters} className="text-(--color-muted) hover:text-(--color-primary) text-xs cursor-pointer transition-colors">
                    Limpiar
                  </button>
                )}
              </div>
              <FiltersPanel />
            </div>
          </aside>

          {/* Mobile filters overlay */}
          {mobileFiltersOpen && (
            <>
              <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
              <div className="fixed inset-y-0 left-0 w-72 bg-(--color-surface) z-50 lg:hidden overflow-y-auto p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-(--color-text) text-sm font-bold">Filtros</span>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-(--color-muted) hover:text-(--color-text) cursor-pointer">
                    <CloseIcon />
                  </button>
                </div>
                <FiltersPanel />
                <button onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-4 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) py-3 rounded-xl font-bold text-sm cursor-pointer transition-colors">
                  Ver {filtered.length} productos
                </button>
              </div>
            </>
          )}

          {/* Product grid */}
          <main className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-(--color-surface) border border-(--color-primary)/20 flex items-center justify-center mb-4 text-(--color-primary)/40">
                  <SearchIcon />
                </div>
                <p className="text-(--color-text) font-semibold mb-1">Sin resultados</p>
                <p className="text-(--color-muted) text-sm mb-4">Prueba ajustando los filtros</p>
                <button onClick={resetFilters} className="text-(--color-primary) hover:underline text-sm cursor-pointer">
                  Limpiar todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((v) => <VariantCard key={v.id} variant={v} category={regionSlug} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-9 h-9 rounded-lg bg-(--color-surface) border border-(--color-divider) text-(--color-muted) hover:border-(--color-primary)/40 hover:text-(--color-primary) disabled:opacity-30 transition-all duration-200 cursor-pointer flex items-center justify-center text-xs">
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => { setPage(n); window.scrollTo(0, 0); }}
                    className={`w-9 h-9 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${page === n
                      ? "bg-(--color-primary) text-(--color-on-primary) font-bold"
                      : "bg-(--color-surface) border border-(--color-divider) text-(--color-muted) hover:border-(--color-primary)/40 hover:text-(--color-primary)"}`}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-9 h-9 rounded-lg bg-(--color-surface) border border-(--color-divider) text-(--color-muted) hover:border-(--color-primary)/40 hover:text-(--color-primary) disabled:opacity-30 transition-all duration-200 cursor-pointer flex items-center justify-center text-xs">
                  ›
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
