"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";

// Secciones actualizadas según la API (id + name)
// Los slugs se generan desde el name, igual que antes
// Las imágenes deben existir en /public/images/sections/
const sections = [
  {
    title: "Accesorios y vitrinas",
    desc: "Exhibidores • Utensilios • Vitrinas",
    image: "/images/sections/accesorios.webp",
    href: "/region/accesorios-y-vitrinas",
  },
  {
    title: "Cocina Mexicana",
    desc: "Salsas • Chiles • Maíz",
    image: "/images/sections/mexico.webp",
    href: "/region/cocina-mexicana",
  },
  {
    title: "Colmena & café",
    desc: "Origen • Naturales • Mieles",
    image: "/images/sections/cafe-miel.webp",
    href: "/region/colmena-y-cafe",
  },
  {
    title: "Despensa Gourmet",
    desc: "Gourmet • Exclusivos • Selectos",
    image: "/images/sections/gourmet.webp",
    href: "/region/despensa-gourmet",
  },
  {
    title: "Escencia Nikkei",
    desc: "Soja • Algas • Ramen",
    image: "/images/sections/nikkei.webp",
    href: "/region/escencia-nikkei",
  },
  {
    title: "Rincón Italiano",
    desc: "Pastas • Aceites • Quesos",
    image: "/images/sections/italia.webp",
    href: "/region/rincon-italiano",
  },
];

const CLONES = 2;
const N = sections.length;

// Build slide array: [last 2 clones] + [original] + [first 2 clones]
const slides = [
  ...sections.slice(-CLONES),
  ...sections,
  ...sections.slice(0, CLONES),
];

const FeaturedSections = () => {
  // current index within the original array (0 to N-1)
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  // Translate to a given real index (accounts for clones offset)
  const applyTransform = useCallback((idx: number, animated: boolean) => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const totalIdx = idx + CLONES;
    const cardEl = track.children[0] as HTMLElement;
    if (!cardEl) return;

    const cardWidth = cardEl.offsetWidth + 20; // 20 = gap
    const containerWidth = wrap.offsetWidth;
    const offset = totalIdx * cardWidth - containerWidth / 2 + cardWidth / 2;

    track.style.transition = animated
      ? "transform 0.5s cubic-bezier(0.77, 0, 0.18, 1)"
      : "none";
    track.style.transform = `translateX(-${offset}px)`;
  }, []);

  // On mount and resize, reposition without animation
  useEffect(() => {
    applyTransform(current, false);
    const onResize = () => applyTransform(current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current, applyTransform]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const next = current + direction;
      setCurrent(next);
      applyTransform(next, true);
    },
    [current, isAnimating, applyTransform],
  );

  const goToDot = useCallback(
    (idx: number) => {
      if (isAnimating || idx === current) return;
      setIsAnimating(true);
      setCurrent(idx);
      applyTransform(idx, true);
    },
    [current, isAnimating, applyTransform],
  );

  // After transition ends: if we're on a clone, silently jump to real slide
  const handleTransitionEnd = useCallback(() => {
    let corrected = current;
    if (current >= N) corrected = current - N;
    else if (current < 0) corrected = N + current;

    if (corrected !== current) {
      setCurrent(corrected);
      applyTransform(corrected, false);
    }
    setIsAnimating(false);
  }, [current, applyTransform]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
  };

  // Real current dot index (always 0..N-1)
  const dotIndex = ((current % N) + N) % N;

  return (
    <section className="py-[3rem]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-[2rem] font-bold text-[#222222] leading-[1.2]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Por estaciones
          </h2>

          {/* Navigation arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={wrapRef}
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: "20px" }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((section, i) => {
              const realIdx = (i - CLONES + N * 10) % N;
              const isActive = realIdx === dotIndex;

              return (
                <Link
                  key={i}
                  href={section.href}
                  // 70% width so adjacent cards peek from both sides
                  className="relative flex-none rounded-[20px] overflow-hidden group"
                  style={{
                    width: "70%",
                    height: "280px",
                    transition: "filter 0.4s ease, transform 0.4s ease",
                    filter: isActive ? "brightness(1)" : "brightness(0.6)",
                    transform: isActive ? "scale(1)" : "scale(0.97)",
                  }}
                  // Prevent Link navigation while dragging / on non-active cards
                  onClick={(e) => {
                    if (!isActive) e.preventDefault();
                  }}
                  tabIndex={isActive ? 0 : -1}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${section.image})` }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <h3
                      className="text-[20px] font-semibold text-white"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-[14px] text-white/90 mt-1">
                      {section.desc}
                    </p>
                    <span className="mt-2 text-[14px] font-bold text-[#FFC43F]">
                      Explorar →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Ir a sección ${i + 1}`}
              className="h-[6px] rounded-full transition-all duration-300"
              style={{
                width: i === dotIndex ? "20px" : "6px",
                background: i === dotIndex ? "#FFC43F" : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
