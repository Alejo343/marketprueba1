"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAddToCartAnimation } from "@/hooks/useAddToCartAnimation";
import { ProductVariant } from "@/types";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
}

// ─── Filter accordion ─────────────────────────────────────────────────────────

function FilterSection({ title, children, badge }: { title: string; children: React.ReactNode; badge?: number }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 cursor-pointer group mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-muted) group-hover:text-(--color-primary) transition-colors duration-200">
            {title}
          </span>
          {badge !== undefined && badge > 0 && (
            <span className="bg-(--color-primary)/20 text-(--color-primary) text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {badge}
            </span>
          )}
        </div>
        <span className="text-(--color-muted)/50 group-hover:text-(--color-primary)/60 transition-colors duration-200">
          <ChevronIcon open={open} />
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

function VariantCard({ variant, category }: { variant: ProductVariant; category: string }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const triggerAnimation = useAddToCartAnimation();
  const img = variant.primary_image?.url;
  const discount = variant.has_sale && variant.sale_price
    ? Math.round(((variant.price - variant.sale_price) / variant.price) * 100)
    : 0;

  const isWhatsAppOnly = variant.sku?.startsWith("VS") ?? false;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerAnimation(addBtnRef.current);
    addItem({
      variantId: variant.id,
      productId: variant.product_id,
      name: variant.product?.name ?? "",
      presentation: variant.presentation,
      price: variant.final_price,
      image: variant.primary_image?.url ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-primary)/8 hover:border-(--color-primary)/28 transition-all duration-400 hover:shadow-[0_12px_48px_rgba(201,168,76,0.07)] flex flex-col">

      {/* Image */}
      <Link href={`/products/${category}/${variant.product_id}`} className="block relative aspect-[4/5] bg-(--color-subtle-bg) overflow-hidden shrink-0">
        {img ? (
          <img src={img} alt={variant.product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-(--color-primary)/12 text-7xl font-bold select-none" style={{ fontFamily: "var(--font-playfair)" }}>
              {variant.product?.name?.[0] ?? "B"}
            </span>
          </div>
        )}

        {/* Dark gradient on hover for CTA */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-(--color-primary) text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
              −{discount}%
            </span>
          )}
          {!variant.in_stock && (
            <span className="bg-black/55 backdrop-blur-sm text-(--color-muted) text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/8">
              Sin stock
            </span>
          )}
          {variant.low_stock && variant.in_stock && (
            <span className="bg-red-500/12 backdrop-blur-sm text-red-400 text-[9px] font-medium px-2 py-0.5 rounded-full border border-red-500/25">
              Últimas
            </span>
          )}
        </div>

        {/* Quick add */}
        {variant.in_stock && !isWhatsAppOnly && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button ref={addBtnRef} onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 ${added
                ? "bg-green-500/18 text-green-400 border border-green-500/30"
                : "bg-(--color-primary) hover:bg-(--color-primary-hover) text-black"}`}>
              {added ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  Agregado
                </>
              ) : (
                <><CartIcon /> Agregar</>
              )}
            </button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {variant.product?.brand && (
          <p className="text-(--color-primary)/55 text-[9px] font-bold uppercase tracking-[0.14em] mb-1">
            {variant.product.brand.name}
          </p>
        )}
        <Link href={`/products/${category}/${variant.product_id}`}>
          <p className="text-(--color-text) text-sm font-medium leading-snug mb-1 line-clamp-2 hover:text-(--color-primary) transition-colors duration-200">
            {variant.product?.name}
          </p>
        </Link>
        <p className="text-(--color-muted) text-[11px] mb-auto pb-3">{variant.presentation}</p>

        <div className="flex items-baseline gap-2 pt-3 border-t border-(--color-primary)/8">
          {isWhatsAppOnly ? (
            <span className="text-(--color-muted) text-sm font-medium">Precio según corte</span>
          ) : (
            <>
              <span className="text-(--color-primary) font-bold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                {fmt(variant.final_price)}
              </span>
              {variant.has_sale && variant.price !== variant.final_price && (
                <span className="text-(--color-muted) text-xs line-through">{fmt(variant.price)}</span>
              )}
            </>
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
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "name-asc", label: "A → Z" },
];

const PER_PAGE = 12;

export default function ProductListView({ variants = [], regionName, regionSlug }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const brands = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => { if (v.product?.brand?.name) set.add(v.product.brand.name); });
    return Array.from(set).sort();
  }, [variants]);

  const filtered = useMemo(() => {
    let list = [...variants];
    if (search) list = list.filter((v) => v.product?.name?.toLowerCase().includes(search.toLowerCase()));
    if (onlyInStock) list = list.filter((v) => v.in_stock);
    if (onlySale) list = list.filter((v) => v.has_sale);
    if (selectedBrands.size > 0) list = list.filter((v) => v.product?.brand?.name && selectedBrands.has(v.product.brand.name));

    switch (sort) {
      case "default":
        list.sort((a, b) => {
          if (a.is_featured === b.is_featured) {
            return (a.featured_order ?? 9999) - (b.featured_order ?? 9999);
          }
          return a.is_featured ? -1 : 1;
        });
        break;
      case "price-asc": list.sort((a, b) => a.final_price - b.final_price); break;
      case "price-desc": list.sort((a, b) => b.final_price - a.final_price); break;
      case "name-asc": list.sort((a, b) => (a.product?.name ?? "").localeCompare(b.product?.name ?? "")); break;
    }
    return list;
  }, [variants, search, onlyInStock, onlySale, selectedBrands, sort]);

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

  const activeFilters = (onlyInStock ? 1 : 0) + (onlySale ? 1 : 0) + selectedBrands.size + (search ? 1 : 0);

  const resetFilters = () => {
    setSearch(""); setSort("default");
    setOnlyInStock(false); setOnlySale(false); setSelectedBrands(new Set()); setPage(1);
  };

  const filterTags: { label: string; remove: () => void }[] = [
    ...(search ? [{ label: `"${search}"`, remove: () => { setSearch(""); setPage(1); } }] : []),
    ...(onlyInStock ? [{ label: "Disponible", remove: () => { setOnlyInStock(false); setPage(1); } }] : []),
    ...(onlySale ? [{ label: "En oferta", remove: () => { setOnlySale(false); setPage(1); } }] : []),
    ...Array.from(selectedBrands).map((b) => ({ label: b, remove: () => toggleBrand(b) })),
  ];

  const FiltersPanel = () => (
    <div>
      {/* Availability */}
      <FilterSection title="Disponibilidad" badge={(onlyInStock ? 1 : 0) + (onlySale ? 1 : 0)}>
        <div className="space-y-1.5">
          {[
            { label: "Disponible", count: variants.filter((v) => v.in_stock).length, active: onlyInStock, toggle: () => { setOnlyInStock(!onlyInStock); setPage(1); } },
            { label: "En oferta", count: variants.filter((v) => v.has_sale).length, active: onlySale, toggle: () => { setOnlySale(!onlySale); setPage(1); } },
          ].map((opt) => (
            <button key={opt.label} onClick={opt.toggle}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border ${opt.active
                ? "bg-(--color-primary)/10 border-(--color-primary)/30 text-(--color-primary)"
                : "bg-transparent border-(--color-primary)/8 text-(--color-muted) hover:border-(--color-primary)/20 hover:text-(--color-text)"}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${opt.active ? "bg-(--color-primary)" : "bg-(--color-muted)/25"}`} />
                {opt.label}
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold transition-colors duration-200 ${opt.active ? "bg-(--color-primary)/20 text-(--color-primary)" : "bg-(--color-subtle-bg) text-(--color-placeholder)"}`}>
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-(--color-primary)/12 to-transparent my-4" />

      {/* Brands */}
      {brands.length > 0 && (
        <FilterSection title="Marca" badge={selectedBrands.size}>
          <div className="space-y-0.5 max-h-52 overflow-y-auto pr-0.5">
            {brands.map((brand) => {
              const count = variants.filter((v) => v.product?.brand?.name === brand).length;
              const checked = selectedBrands.has(brand);
              return (
                <button key={brand} onClick={() => toggleBrand(brand)}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer transition-colors duration-150 group ${checked ? "text-(--color-text)" : "text-(--color-muted) hover:text-(--color-text)"}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3.5 h-3.5 rounded-[4px] border-[1.5px] flex items-center justify-center transition-all duration-150 shrink-0 ${checked ? "bg-(--color-primary) border-(--color-primary)" : "border-(--color-divider) group-hover:border-(--color-primary)/40"}`}>
                      {checked && <CheckIcon />}
                    </div>
                    <span className="text-xs">{brand}</span>
                  </div>
                  <span className="text-[10px] text-(--color-placeholder)">{count}</span>
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-(--color-bg)" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Page header */}
      <div className="pt-28 border-b border-(--color-primary)/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">

            {/* Title block */}
            <div>
              <p className="text-(--color-primary)/60 text-[10px] font-bold tracking-[0.22em] uppercase mb-2">
                Barril Market · Tienda
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-(--color-text)" style={{ fontFamily: "var(--font-playfair)" }}>
                {regionName}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="h-px w-8 bg-linear-to-r from-(--color-primary) to-(--color-primary)/0" />
                <p className="text-(--color-muted) text-sm">
                  {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
                  {activeFilters > 0 && (
                    <span className="text-(--color-primary)/70"> · {activeFilters} filtro{activeFilters > 1 ? "s" : ""}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Search */}
              <div className="flex items-center bg-(--color-surface) border border-(--color-primary)/10 rounded-full px-4 py-2.5 gap-2.5 focus-within:border-(--color-primary)/40 transition-all duration-200 min-w-56">
                <span className="text-(--color-primary)/40 shrink-0"><SearchIcon /></span>
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Buscar producto..."
                  className="bg-transparent text-(--color-text) text-sm placeholder:text-(--color-placeholder) focus:outline-none flex-1 min-w-0" />
                {search && (
                  <button onClick={() => { setSearch(""); setPage(1); }} className="text-(--color-muted) hover:text-(--color-text) cursor-pointer transition-colors shrink-0">
                    <CloseIcon size={13} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="appearance-none bg-(--color-surface) border border-(--color-primary)/10 text-(--color-text) text-sm rounded-full pl-4 pr-9 py-2.5 focus:outline-none focus:border-(--color-primary)/40 cursor-pointer transition-all duration-200">
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-(--color-muted)/60">
                  <ChevronIcon open={false} />
                </span>
              </div>

              {/* Mobile filter toggle */}
              <button onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-(--color-surface) border border-(--color-primary)/10 text-(--color-text) text-sm rounded-full px-4 py-2.5 cursor-pointer hover:border-(--color-primary)/35 transition-all duration-200">
                <FilterIcon />
                Filtros
                {activeFilters > 0 && (
                  <span className="bg-(--color-primary) text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeFilters}</span>
                )}
              </button>
            </div>
          </div>

          {/* Active filter pills */}
          {filterTags.length > 0 && (
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              <span className="text-(--color-muted)/50 text-[10px] uppercase tracking-[0.15em]">Activos:</span>
              {filterTags.map((tag) => (
                <button key={tag.label} onClick={tag.remove}
                  className="flex items-center gap-1.5 bg-(--color-primary)/10 border border-(--color-primary)/22 text-(--color-primary) text-xs px-3 py-1 rounded-full hover:bg-(--color-primary)/18 transition-colors cursor-pointer">
                  {tag.label}
                  <CloseIcon size={10} />
                </button>
              ))}
              <button onClick={resetFilters}
                className="text-(--color-muted)/50 hover:text-(--color-muted) text-xs transition-colors cursor-pointer ml-1 underline underline-offset-2">
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-5 px-1">
                <span className="text-(--color-muted)/60"><FilterIcon /></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--color-muted)">Filtros</span>
                {activeFilters > 0 && (
                  <>
                    <span className="bg-(--color-primary) text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ml-auto">{activeFilters}</span>
                    <button onClick={resetFilters} className="text-(--color-muted)/50 hover:text-(--color-primary) text-[10px] cursor-pointer transition-colors">
                      Limpiar
                    </button>
                  </>
                )}
              </div>
              <FiltersPanel />
            </div>
          </aside>

          {/* Mobile filters overlay */}
          {mobileFiltersOpen && (
            <>
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
              <div className="fixed inset-y-0 right-0 w-72 bg-(--color-surface) z-50 lg:hidden overflow-y-auto shadow-2xl border-l border-(--color-primary)/10">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-(--color-text) text-sm font-bold uppercase tracking-widest">Filtros</span>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-(--color-muted) hover:text-(--color-text) cursor-pointer p-1 transition-colors">
                      <CloseIcon size={18} />
                    </button>
                  </div>
                  <FiltersPanel />
                  <div className="pt-4 mt-4 border-t border-(--color-primary)/10">
                    <button onClick={() => setMobileFiltersOpen(false)}
                      className="w-full bg-(--color-primary) hover:bg-(--color-primary-hover) text-black py-3 rounded-xl font-bold text-sm cursor-pointer transition-colors">
                      Ver {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Product grid */}
          <main className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 rounded-full border border-(--color-primary)/12 flex items-center justify-center mb-5 text-(--color-primary)/20">
                  <SearchIcon />
                </div>
                <p className="text-(--color-text) font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  Sin resultados
                </p>
                <p className="text-(--color-muted) text-sm mb-6">Prueba ajustando los filtros de búsqueda</p>
                <button onClick={resetFilters}
                  className="text-(--color-primary)/70 hover:text-(--color-primary) text-sm cursor-pointer underline underline-offset-4 transition-colors">
                  Limpiar todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {paginated.map((v) => <VariantCard key={v.id} variant={v} category={regionSlug} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-12">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-full bg-(--color-surface) border border-(--color-primary)/10 text-(--color-muted) hover:border-(--color-primary)/35 hover:text-(--color-primary) disabled:opacity-25 transition-all duration-200 cursor-pointer flex items-center justify-center text-base">
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${page === n
                      ? "bg-(--color-primary) text-black font-bold shadow-[0_0_20px_rgba(201,168,76,0.25)]"
                      : "bg-(--color-surface) border border-(--color-primary)/10 text-(--color-muted) hover:border-(--color-primary)/35 hover:text-(--color-primary)"}`}>
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-full bg-(--color-surface) border border-(--color-primary)/10 text-(--color-muted) hover:border-(--color-primary)/35 hover:text-(--color-primary) disabled:opacity-25 transition-all duration-200 cursor-pointer flex items-center justify-center text-base">
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
