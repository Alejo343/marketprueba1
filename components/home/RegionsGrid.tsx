"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowIcon } from "./icons";

const regions = [
  {
    label: "Accesorios y vitrinas",
    href: "/region/accesorios-y-vitrinas",
    image: "/images/sections/accesorios.webp",
  },
  {
    label: "Barril Market",
    href: "/region/barril-market",
    image: "/images/sections/market.webp",
  },
  {
    label: "The Market Signature",
    href: "/region/rincon-italiano",
    image: "/images/sections/italia.webp",
  },
  {
    label: "Casa de especias",
    href: "/region/casa-de-especias",
    image: "/images/sections/especias.webp",
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
  {
    label: "Sabores del mundo",
    href: "/region/rincon-italiano",
    image: "/images/sections/italia.webp",
  },
];

export default function RegionsGrid() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, containScroll: false },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <>
      <style>{`
        @keyframes card-sheen {
          0%   { transform: translateX(-100%) skewX(-18deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(260%) skewX(-18deg); opacity: 0; }
        }
        .region-card:hover .region-sheen {
          animation: card-sheen 0.7s ease-out forwards;
        }
      `}</style>

      <section className="py-20 bg-[#080808] overflow-hidden">
        {/* ── Header ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-start gap-5">
              {/* Vertical gold accent bar */}
              <div
                className="shrink-0 w-px mt-1"
                style={{
                  height: "4.5rem",
                  background:
                    "linear-gradient(to bottom, #C9A84C, transparent)",
                }}
              />
              <div>
                <span className="text-[#C9A84C] text-[0.6rem] font-bold tracking-[0.4em] uppercase block mb-3">
                  Nuestras tiendas
                </span>
                <h2
                  className="text-[2rem] md:text-[2.75rem] font-bold leading-none text-[#F5F0E8]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Explora por <span className="text-[#C9A84C]">región</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Flechas de navegación — solo desktop */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={scrollPrev}
                  aria-label="Anterior"
                  className="group w-9 h-9 rounded-full border border-[#C9A84C]/25 hover:border-[#C9A84C]/70 bg-[#111111] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-[#9A8C7A] group-hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    <path
                      d="M9 2L4 7L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Siguiente"
                  className="group w-9 h-9 rounded-full border border-[#C9A84C]/25 hover:border-[#C9A84C]/70 bg-[#111111] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-[#9A8C7A] group-hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    <path
                      d="M5 2L10 7L5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-3 text-[#9A8C7A] hover:text-[#C9A84C] text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group pb-1"
              ></Link>
            </div>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          className="relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div className="overflow-hidden px-4 sm:px-6 lg:px-8" ref={emblaRef}>
            <div className="flex gap-3 md:gap-4">
              {regions.map((region, i) => (
                <div
                  key={`${region.href}-${i}`}
                  className="shrink-0 basis-[175px] sm:basis-[205px] md:basis-[225px]"
                >
                  <Link
                    href={region.href}
                    aria-label={region.label}
                    className="region-card group relative block aspect-[3/4] rounded-xl overflow-hidden"
                  >
                    {/* Image */}
                    <img
                      src={region.image}
                      alt={region.label}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/35 to-black/5 group-hover:from-black/85 transition-all duration-500" />

                    {/* Top border reveal */}
                    <div
                      className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, #C9A84C, transparent)",
                      }}
                    />

                    {/* Gold index number */}
                    <span className="absolute top-3.5 right-4 text-[10px] font-bold tabular-nums text-[#C9A84C]/45 group-hover:text-[#C9A84C]/90 transition-colors duration-300 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Shimmer sheen */}
                    <div
                      className="region-sheen absolute inset-0 w-2/5 pointer-events-none -translate-x-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)",
                      }}
                    />

                    {/* Bottom content */}
                    <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-8">
                      {/* Expanding gold underline */}
                      <div className="h-px w-full bg-[#C9A84C] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out mb-3" />

                      <p
                        className="text-[#F5F0E8] text-[0.85rem] font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {region.label}
                      </p>

                      {/* Slide-up CTA */}
                      <div className="flex items-center gap-1.5 mt-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        <span className="text-[#C9A84C] text-[9px] font-bold tracking-[0.2em] uppercase">
                          Explorar
                        </span>
                        <span className="text-[#C9A84C]">
                          <ArrowIcon />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              {/* Separador visual del loop — margen negativo para cancelar el gap doble */}
              <div className="shrink-0 flex items-center self-stretch px-3">
                <div
                  className="w-px h-16 self-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, #C9A84C55, transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
