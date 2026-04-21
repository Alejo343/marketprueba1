"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ArrowRightIcon = () => (
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

const slides = [
  {
    id: 1,
    category: "BBQ Profesional",
    title: "Asador & Ahumador Tipo Barril",
    description:
      "Controla la temperatura y logra el sabor ahumado perfecto para carnes, costillas, pollo y más.",
    image: "/images/barril.png",
    buttonText: "Compra ahora",
    href: "/region/accesorios-y-vitrinas",
  },
  {
    id: 2,
    category: "Todo para tu Parrilla",
    title: "Accesorios para asados perfectos",
    description:
      "Espátulas, pinzas y herramientas de acero diseñadas para que disfrutes cada parrillada como un experto.",
    image: "/images/garra.png",
    buttonText: "Ver colección",
    href: "/region/accesorios-y-vitrinas",
  },
];

const smallBanners = [
  {
    id: 1,
    badge: "20% Off",
    title: "Carbón Premium para Parrilla",
    href: "/region/accesorios-y-vitrinas",
    image: "/images/ad-image-1.png",
    cta: "Comprar",
  },
  {
    id: 2,
    badge: "15% Off",
    title: "Delantales para Parrilleros",
    href: "/region/accesorios-y-vitrinas",
    image: "/images/ad-image-2-2.png",
    cta: "Comprar colección",
  },
];

export default function FeaturedBanners() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-(--color-nav) py-8">
      {/* Gold entry line */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-(--color-primary)/40 to-transparent mb-8" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[560px]">

          {/* Large carousel */}
          <div className="lg:col-span-7 relative bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-primary)/15">
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
              <div className="w-full h-full border-t-2 border-l-2 border-(--color-primary) rounded-tl-2xl" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
              <div className="w-full h-full border-b-2 border-r-2 border-(--color-primary) rounded-br-2xl" />
            </div>

            {/* Slides */}
            <div className="relative h-full min-h-[500px]">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col md:flex-row h-full p-8 md:p-12 gap-6">
                    {/* Text */}
                    <div className="flex-1 flex flex-col justify-center">
                      <span
                        className="text-(--color-primary) text-sm font-medium tracking-widest uppercase mb-4 block"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {slide.category}
                      </span>
                      <h2
                        className="text-[2.4rem] md:text-[3rem] font-bold text-(--color-text) leading-[1.15] mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="text-(--color-muted) text-base leading-relaxed mb-8 max-w-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {slide.description}
                      </p>
                      <div>
                        <Link
                          href={slide.href}
                          className="inline-flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) px-6 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {slide.buttonText}
                          <ArrowRightIcon />
                        </Link>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex items-center justify-center md:w-[45%] shrink-0">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="max-h-[320px] w-auto object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-12 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === current
                      ? "w-6 h-2 bg-(--color-primary)"
                      : "w-2 h-2 bg-(--color-primary)/30 hover:bg-(--color-primary)/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Small banners */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {smallBanners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative flex-1 bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-primary)/15 hover:border-(--color-primary)/40 transition-all duration-300 cursor-pointer min-h-[200px]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-right-bottom opacity-40 group-hover:opacity-55 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('${banner.image}')`,
                    backgroundSize: "45%",
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-(--color-surface) via-(--color-surface)/80 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <span
                      className="inline-block bg-(--color-primary)/15 text-(--color-primary) text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border border-(--color-primary)/30"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {banner.badge}
                    </span>
                    <h3
                      className="text-[1.5rem] font-bold text-(--color-text) leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {banner.title}
                    </h3>
                  </div>

                  <div
                    className="flex items-center gap-2 text-(--color-primary) text-sm font-medium mt-4 group-hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {banner.cta}
                    <ArrowRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
