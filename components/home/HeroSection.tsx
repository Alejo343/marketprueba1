"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchIcon, ArrowIcon } from "./icons";

const heroSlides = [
  {
    id: 1,
    badge: "Nuevo · Temporada 2026",
    title: "El Sabor que\nMerece tu Mesa",
    subtitle: "Productos artesanales y gourmet seleccionados de los mejores productores.",
    image: "/images/barril.png",
    cta: "Explorar tienda",
    ctaSecondary: "Ver categorías",
  },
  {
    id: 2,
    badge: "BBQ Profesional",
    title: "Domina el Arte\ndel Asado",
    subtitle: "Herramientas, carbón premium y accesorios para parrilleros exigentes.",
    image: "/images/SetBBq.png",
    cta: "Ver colección",
    ctaSecondary: "Saber más",
  },
];

export default function HeroSection() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = heroSlides[slide];

  return (
    <section className="relative bg-[var(--color-bg)] overflow-hidden min-h-[620px] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/6 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              {current.badge}
            </span>
            <h1
              className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[var(--color-text)] leading-[1.1] mb-6 whitespace-pre-line"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {current.title}
            </h1>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-8 max-w-md">
              {current.subtitle}
            </p>
            <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-xl px-5 py-3.5 gap-3 mb-8 max-w-md focus-within:border-[var(--color-primary)]/50 transition-all duration-200">
              <span className="text-[var(--color-primary)]/60">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="¿Qué estás buscando hoy?"
                className="flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-placeholder)] focus:outline-none text-sm"
              />
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer">
                Buscar
              </button>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/region/accesorios-y-vitrinas"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                {current.cta} <ArrowIcon />
              </Link>
              <button className="text-[var(--color-muted)] hover:text-[var(--color-primary)] text-sm font-medium transition-colors duration-200 cursor-pointer">
                {current.ctaSecondary}
              </button>
            </div>
            <div className="flex gap-2 mt-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${i === slide ? "w-8 h-2 bg-[var(--color-primary)]" : "w-2 h-2 bg-[var(--color-primary)]/25 hover:bg-[var(--color-primary)]/50"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
            <img
              src={current.image}
              alt={current.title}
              className="relative z-10 max-h-[460px] w-auto object-contain drop-shadow-2xl transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
