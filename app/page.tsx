"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ProductVariant } from "@/types";
import { getFeaturedVariants } from "@/lib/api";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const GiftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <polyline points="23 20 23 14 17 14" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    id: 1,
    badge: "Nuevo · Temporada 2025",
    title: "El Sabor que\nMerece tu Mesa",
    subtitle:
      "Productos artesanales y gourmet seleccionados de los mejores productores.",
    image: "/images/barril.png",
    cta: "Explorar tienda",
    ctaSecondary: "Ver categorías",
  },
  {
    id: 2,
    badge: "BBQ Profesional",
    title: "Domina el Arte\ndel Asado",
    subtitle:
      "Herramientas, carbón premium y accesorios para parrilleros exigentes.",
    image: "/images/SetBBq.png",
    cta: "Ver colección",
    ctaSecondary: "Saber más",
  },
];

const trustItems = [
  {
    icon: <TruckIcon />,
    title: "Envío gratis",
    desc: "En pedidos mayores a $80.000",
  },
  {
    icon: <ShieldIcon />,
    title: "Calidad garantizada",
    desc: "Productos seleccionados y certificados",
  },
  {
    icon: <RefreshIcon />,
    title: "Devoluciones fáciles",
    desc: "30 días sin preguntas",
  },
  {
    icon: <GiftIcon />,
    title: "Empaques premium",
    desc: "Ideal para regalos corporativos",
  },
];

const regions = [
  {
    label: "Accesorios y vitrinas",
    href: "/region/accesorios-y-vitrinas",
    image: "/images/sections/accesorios.webp",
  },
  {
    label: "Cocina Mexicana",
    href: "/region/cocina-mexicana",
    image: "/images/sections/mexico.webp",
  },
  {
    label: "Colmena & café",
    href: "/region/colmena-y-cafe",
    image: "/images/sections/cafe-miel.webp",
  },
  {
    label: "Despensa Gourmet",
    href: "/region/despensa-gourmet",
    image: "/images/sections/gourmet.webp",
  },
  {
    label: "Escencia Nikkei",
    href: "/region/escencia-nikkei",
    image: "/images/sections/nikkei.webp",
  },
  {
    label: "Rincón Italiano",
    href: "/region/rincon-italiano",
    image: "/images/sections/italia.webp",
  },
];

const productCategories = [
  "Abarrotes e Ingredientes",
  "Aceites",
  "Arroces especiales",
  "Asadores y Parrilla",
  "Carnes y Embutidos",
  "Carnicería",
  "Condimentos",
  "Congelados",
  "Conservas",
  "Especias",
  "Harinas",
  "Licores y vinos",
  "Pastas",
  "Productos importados",
  "Salsas",
  "Snacks",
  "Utensilios",
  "Utensilios de Cocina",
];


function formatPrice(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}


function ProductCard({ variant }: { variant: ProductVariant }) {
  const [hovered, setHovered] = useState(false);
  const name = variant.product?.name ?? "";
  const image = variant.primary_image?.url ?? "";
  const badge = variant.has_sale ? "Oferta" : null;
  return (
    <Link href={`/products/${variant.product_id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-square bg-[#0D0D0D] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#111111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
          <div
            className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <button className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer">
              <CartIcon /> Agregar al carrito
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[#F5F0E8] text-sm font-medium leading-snug mb-2 line-clamp-2">
            {name}
          </p>
          <p className="text-[#9A8C7A] text-xs mb-3">{variant.presentation}</p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-[#C9A84C] font-bold text-base"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {formatPrice(variant.final_price)}
            </span>
            {variant.has_sale && variant.price !== variant.final_price && (
              <span className="text-[#9A8C7A] text-xs line-through">
                {formatPrice(variant.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [latestVariants, setLatestVariants] = useState<ProductVariant[]>([]);
  const [featuredVariants, setFeaturedVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((p) => (p + 1) % heroSlides.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch("/api/product-variants")
      .then((r) => r.json())
      .then((res) => setLatestVariants((res.data ?? []).slice(0, 8)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getFeaturedVariants(8).then(setFeaturedVariants).catch(() => {});
  }, []);

  const current = heroSlides[slide];

  return (
    <div
      className="min-h-screen bg-[#080808]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
        <div className="bg-[#111111] border-b border-[#C9A84C]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 h-[72px]">
              <Link href="/" className="flex-shrink-0">
                <img
                  src="/logov2w.webp"
                  alt="Barril Market"
                  className="h-14 w-auto"
                />
              </Link>
              <div className="hidden lg:flex flex-1 mx-8">
                <div className="w-full flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 gap-3 focus-within:border-[#C9A84C]/60 transition-all duration-200">
                  <span className="text-[#C9A84C]/60">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Busca productos artesanales y gourmet..."
                    className="flex-1 bg-transparent text-[#F5F0E8] text-sm placeholder:text-[#555] focus:outline-none"
                  />
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button className="hidden sm:flex text-[#9A8C7A] hover:text-[#C9A84C] text-sm transition-colors duration-200 cursor-pointer px-3 py-2">
                  Ingresar
                </button>
                <button className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer">
                  <CartIcon />
                  <span className="hidden sm:inline">Carrito</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
        <nav className="hidden lg:block bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center">
              {regions.map((cat) => (
                <li key={cat.href} className="relative group">
                  <Link
                    href={cat.href}
                    className="block px-4 py-3.5 text-xs tracking-widest uppercase font-medium text-[#9A8C7A] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer"
                  >
                    {cat.label}
                  </Link>
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-[#080808] overflow-hidden min-h-[620px] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/6 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                {current.badge}
              </span>
              <h1
                className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#F5F0E8] leading-[1.1] mb-6 whitespace-pre-line"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {current.title}
              </h1>
              <p className="text-[#9A8C7A] text-lg leading-relaxed mb-8 max-w-md">
                {current.subtitle}
              </p>
              <div className="flex items-center bg-[#111111] border border-[#C9A84C]/20 rounded-xl px-5 py-3.5 gap-3 mb-8 max-w-md focus-within:border-[#C9A84C]/50 transition-all duration-200">
                <span className="text-[#C9A84C]/60">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="¿Qué estás buscando hoy?"
                  className="flex-1 bg-transparent text-[#F5F0E8] placeholder:text-[#555] focus:outline-none text-sm"
                />
                <button className="bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer">
                  Buscar
                </button>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/region/accesorios-y-vitrinas"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                >
                  {current.cta} <ArrowIcon />
                </Link>
                <button className="text-[#9A8C7A] hover:text-[#C9A84C] text-sm font-medium transition-colors duration-200 cursor-pointer">
                  {current.ctaSecondary}
                </button>
              </div>
              <div className="flex gap-2 mt-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${i === slide ? "w-8 h-2 bg-[#C9A84C]" : "w-2 h-2 bg-[#C9A84C]/25 hover:bg-[#C9A84C]/50"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#C9A84C]/5 rounded-full blur-3xl" />
              <img
                src={current.image}
                alt={current.title}
                className="relative z-10 max-h-[460px] w-auto object-contain drop-shadow-2xl transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-[#C9A84C]/10 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4">
                <span className="text-[#C9A84C] flex-shrink-0">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[#F5F0E8] text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-[#9A8C7A] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured banners ── */}
      <section className="py-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[400px]">
            <div className="lg:col-span-7 bg-[#111111] rounded-2xl border border-[#C9A84C]/15 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-28 h-28 opacity-10 border-t-2 border-l-2 border-[#C9A84C] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-28 h-28 opacity-10 border-b-2 border-r-2 border-[#C9A84C] rounded-br-2xl" />
              <div className="flex flex-col md:flex-row h-full p-8 gap-6 items-center">
                <div className="flex-1">
                  <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase block mb-3">
                    BBQ Profesional
                  </span>
                  <h2
                    className="text-[2.2rem] font-bold text-[#F5F0E8] leading-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Asador & Ahumador
                    <br />
                    Tipo Barril
                  </h2>
                  <p className="text-[#9A8C7A] text-sm mb-6 leading-relaxed">
                    Controla la temperatura y logra el sabor ahumado perfecto.
                  </p>
                  <Link
                    href="/region/accesorios-y-vitrinas"
                    className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-5 py-2.5 rounded-lg font-bold text-sm transition-colors duration-200 cursor-pointer"
                  >
                    Compra ahora <ArrowIcon />
                  </Link>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center md:w-48">
                  <img
                    src="/images/barril.png"
                    alt="Asador"
                    className="max-h-[240px] object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[
                {
                  badge: "20% Off",
                  title: "Carbón Premium para Parrilla",
                  image: "/images/ad-image-1.png",
                  href: "/region/accesorios-y-vitrinas",
                },
                {
                  badge: "15% Off",
                  title: "Delantales para Parrilleros",
                  image: "/images/ad-image-2-2.png",
                  href: "/region/accesorios-y-vitrinas",
                },
              ].map((b) => (
                <Link
                  key={b.badge}
                  href={b.href}
                  className="group relative flex-1 bg-[#111111] rounded-2xl overflow-hidden border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer min-h-[180px]"
                >
                  <div
                    className="absolute inset-0 bg-no-repeat bg-right-bottom opacity-35 group-hover:opacity-50 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url('${b.image}')`,
                      backgroundSize: "42%",
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#111111] via-[#111111]/85 to-transparent" />
                  <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                    <span className="inline-block bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full w-fit">
                      {b.badge}
                    </span>
                    <div>
                      <h3
                        className="text-[1.25rem] font-bold text-[#F5F0E8] mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {b.title}
                      </h3>
                      <span className="flex items-center gap-2 text-[#C9A84C] text-xs font-medium group-hover:gap-3 transition-all duration-200">
                        Comprar <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase block mb-2">
                Nuestras tiendas
              </span>
              <h2
                className="text-[2rem] font-bold text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Explora por región
              </h2>
            </div>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-[#C9A84C] hover:text-[#D4BC6A] text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Ver todas <ArrowIcon />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {regions.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 cursor-pointer transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/50 to-transparent" />
                <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/8 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[#F5F0E8] text-xs font-semibold leading-tight">
                    {cat.label}
                  </p>
                  <span className="text-[#C9A84C] text-[10px] flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Ver tienda <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categorías de productos ── */}
      {/*
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase block mb-2">Catálogo</span>
            <h2 className="text-[2rem] font-bold text-[#F5F0E8]" style={{ fontFamily: "var(--font-playfair)" }}>
              Categorías de productos
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {productCategories.map((name, i) => (
              <Link
                key={name}
                href={`/products/${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`}
                className="group relative bg-[#111111] rounded-xl border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 p-4 flex flex-col gap-3 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#C9A84C]/4 rounded-full group-hover:bg-[#C9A84C]/10 transition-colors duration-300" />
                <span className="text-[#C9A84C]/50 text-xs font-bold tracking-widest group-hover:text-[#C9A84C] transition-colors duration-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#F5F0E8] text-xs font-semibold leading-snug group-hover:text-white transition-colors duration-200 line-clamp-2 pr-2">
                  {name}
                </span>
                <span className="text-[#C9A84C]/0 group-hover:text-[#C9A84C] transition-colors duration-200 mt-auto">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* ── Productos destacados ── */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase block mb-2">
                Selección especial
              </span>
              <h2
                className="text-[2rem] font-bold text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Productos destacados
              </h2>
            </div>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-[#C9A84C] hover:text-[#D4BC6A] text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Ver todos <ArrowIcon />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredVariants.map((v) => (
              <ProductCard key={v.id} variant={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Últimos productos ── */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase block mb-2">
                Recién llegados
              </span>
              <h2
                className="text-[2rem] font-bold text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Últimos productos
              </h2>
            </div>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-[#C9A84C] hover:text-[#D4BC6A] text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Ver todos <ArrowIcon />
            </Link>
          </div>

          {latestVariants.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#111111] rounded-2xl overflow-hidden border border-[#C9A84C]/10 animate-pulse"
                >
                  <div className="aspect-square bg-[#1A1A1A]" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-[#1A1A1A] rounded w-3/4" />
                    <div className="h-3 bg-[#1A1A1A] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestVariants.map((variant) => {
                const img =
                  variant.primary_image?.url ??
                  variant.product?.media?.[0]?.url;
                return (
                  <Link
                    key={variant.id}
                    href={`/products/${variant.product_id}`}
                    className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-square bg-[#0D0D0D] overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={variant.product?.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[#C9A84C]/20 text-5xl font-bold"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {variant.product?.name?.[0] ?? "B"}
                        </div>
                      )}
                      {variant.has_sale && (
                        <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#111111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Oferta
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[#F5F0E8] text-sm font-medium leading-snug mb-1 line-clamp-2">
                        {variant.product?.name}
                      </p>
                      <p className="text-[#9A8C7A] text-xs mb-3">
                        {variant.presentation}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-[#C9A84C] font-bold text-base"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 0,
                          }).format(variant.final_price)}
                        </span>
                        {variant.has_sale &&
                          variant.price !== variant.final_price && (
                            <span className="text-[#9A8C7A] text-xs line-through">
                              {new Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                              }).format(variant.price)}
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

      {/* ── Bottom CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#C9A84C]/8 blur-[100px] rounded-full" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <span className="inline-block w-12 h-px bg-[#C9A84C] mb-6" />
          <h2
            className="text-[2.5rem] font-bold text-[#F5F0E8] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Productos artesanales,
            <br />
            experiencias únicas
          </h2>
          <p className="text-[#9A8C7A] text-base mb-8 leading-relaxed">
            Cada producto en Barril Market es elegido por su calidad, origen y
            sabor. Descubre lo mejor del mercado gourmet colombiano.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
            >
              Explorar tienda completa <ArrowIcon />
            </Link>
            <span className="text-[#9A8C7A] text-sm">
              o llámanos al{" "}
              <span className="text-[#C9A84C]">+57 300 000 0000</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0A0A0A] border-t border-[#C9A84C]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <img
            src="/logov2w.webp"
            alt="Barril Market"
            className="h-10 w-auto"
          />
          <p className="text-[#9A8C7A] text-xs">
            © 2025 Barril Market · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            {["Términos", "Privacidad", "Contacto"].map((l) => (
              <span
                key={l}
                className="text-[#9A8C7A] hover:text-[#C9A84C] text-xs transition-colors duration-200 cursor-pointer"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
