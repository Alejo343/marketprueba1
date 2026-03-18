"use client";

import Link from "next/link";

const sections = [
  {
    title: "Italia",
    desc: "Pastas • Aceites • Quesos",
    image: "/images/sections/italia.webp",
    href: "/region/italia",
  },
  {
    title: "México",
    desc: "Salsas • Chiles • Maíz",
    image: "/images/sections/mexico.webp",
    href: "/region/mexico",
  },
  {
    title: "Nikkei",
    desc: "Soja • Algas • Ramen",
    image: "/images/sections/nikkei.webp",
    href: "/region/nikkei", // nombre en API: "Nikei"
  },
  {
    title: "Delish",
    desc: "Gourmet • Exclusivos",
    image: "/images/sections/delish.webp",
    href: "/region/delish-y-sabores-del-mundo",
  },
  {
    title: "Market",
    desc: "Marca propia",
    image: "/images/sections/market.png",
    href: "/region/market",
  },
  {
    title: "Café & Mieles",
    desc: "Origen • Naturales",
    image: "/images/sections/cafe-miel.webp",
    href: "/region/colmena-y-cafe",
  },
];

const FeaturedSections = () => {
  return (
    <section className="py-[3rem]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center mb-[3rem]">
          <h2
            className="text-[2rem] font-bold text-[#222222] leading-[1.2]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Secciones destacadas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {sections.map((section, index) => (
            <Link
              href={section.href}
              key={index}
              className="relative h-[260px] rounded-[16px] overflow-hidden shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${section.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="relative z-10 h-full flex flex-col justify-end p-[24px]">
                <h3
                  className="text-[20px] font-semibold text-white"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {section.title}
                </h3>
                <p className="text-[14px] text-white/90 mt-[4px]">
                  {section.desc}
                </p>
                <span className="mt-[8px] text-[14px] font-semibold text-[#FFC43F]">
                  Explorar →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* TARJETA GRANDE */}
        <div className="mt-[30px]">
          <Link
            href="/region/delish-y-sabores-del-mundo"
            className="relative block h-[300px] rounded-[16px] overflow-hidden shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url(/images/sections/mundo.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            <div className="relative z-10 h-full flex flex-col justify-end p-[30px]">
              <h3
                className="text-[28px] font-bold text-white"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                🌎 Sabores del Mundo
              </h3>
              <p className="text-[14px] text-white/90 mt-[6px]">
                Italia • México • Japón • Francia • España
              </p>
              <span className="mt-[10px] text-[14px] font-semibold text-[#FFC43F]">
                Explorar →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
