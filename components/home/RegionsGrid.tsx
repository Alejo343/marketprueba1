"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowIcon } from "./icons";

const regions = [
  { label: "Accesorios y vitrinas", href: "/region/accesorios-y-vitrinas", image: "/images/sections/accesorios.webp" },
  { label: "Barril Market", href: "/region/barril-market", image: "/images/sections/market.webp" },
  { label: "Casa de especias", href: "/region/casa-de-especias", image: "/images/sections/especias.webp" },
  { label: "Cocina Mexicana", href: "/region/cocina-mexicana", image: "/images/sections/mexico.webp" },
  { label: "Colmena & café", href: "/region/colmena-y-cafe", image: "/images/sections/cafe-miel.webp" },
  { label: "Despensa Gourmet", href: "/region/despensa-gourmet", image: "/images/sections/gourmet.webp" },
  { label: "Escencia Nikkei", href: "/region/escencia-nikkei", image: "/images/sections/nikkei.webp" },
  { label: "Rincón Italiano", href: "/region/rincon-italiano", image: "/images/sections/italia.webp" },
];

export default function RegionsGrid() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, containScroll: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  return (
    <section className="py-16 bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-[var(--color-primary)] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              Nuestras tiendas
            </span>
            <h2
              className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--color-text)] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Explora por región
            </h2>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-sm font-medium transition-colors duration-200 cursor-pointer border-b border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] pb-1"
          >
            Ver todas <ArrowIcon />
          </Link>
        </div>
      </div>

      <div
        className="relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden px-4 sm:px-6 lg:px-8" ref={emblaRef}>
          <div className="flex gap-4">
            {regions.map((cat) => (
              <div
                key={cat.href}
                className="shrink-0 basis-[200px] sm:basis-[220px]"
              >
                <Link
                  href={cat.href}
                  aria-label={cat.label}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/60 transition-all duration-300"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-lg bg-[var(--color-bg)]/85 backdrop-blur-md border border-[var(--color-primary)]/20 px-3 py-2">
                    <p
                      className="text-[var(--color-text)] text-xs font-semibold leading-tight truncate"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {cat.label}
                    </p>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors duration-300">
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
