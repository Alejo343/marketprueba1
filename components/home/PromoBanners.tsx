import Link from "next/link";
import { ArrowIcon } from "./icons";

const sideBanners = [
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
];

export default function PromoBanners() {
  return (
    <section className="py-10 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[400px]">
          {/* Main banner */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-primary)]/15 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-28 h-28 opacity-10 border-t-2 border-l-2 border-[var(--color-primary)] rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-28 h-28 opacity-10 border-b-2 border-r-2 border-[var(--color-primary)] rounded-br-2xl" />
            <div className="flex flex-col md:flex-row h-full p-8 gap-6 items-center">
              <div className="flex-1">
                <span className="text-[var(--color-primary)] text-xs font-semibold tracking-widest uppercase block mb-3">
                  BBQ Profesional
                </span>
                <h2
                  className="text-[2.2rem] font-bold text-[var(--color-text)] leading-tight mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Asador & Ahumador
                  <br />
                  Tipo Barril
                </h2>
                <p className="text-[var(--color-muted)] text-sm mb-6 leading-relaxed">
                  Controla la temperatura y logra el sabor ahumado perfecto.
                </p>
                <Link
                  href="/region/barriles"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-5 py-2.5 rounded-lg font-bold text-sm transition-colors duration-200 cursor-pointer"
                >
                  Compra ahora <ArrowIcon />
                </Link>
              </div>
              <div className="shrink-0 flex items-center justify-center md:w-48">
                <img
                  src="/images/barril.png"
                  alt="Asador"
                  className="max-h-[240px] object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Side banners */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideBanners.map((b) => (
              <Link
                key={b.badge}
                href={b.href}
                className="group relative flex-1 bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/40 transition-all duration-300 cursor-pointer min-h-[180px]"
              >
                <div
                  className="absolute inset-0 bg-no-repeat bg-right-bottom opacity-35 group-hover:opacity-50 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('${b.image}')`,
                    backgroundSize: "42%",
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-[var(--color-surface)] via-[var(--color-surface)]/85 to-transparent" />
                <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                  <span className="inline-block bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full w-fit">
                    {b.badge}
                  </span>
                  <div>
                    <h3
                      className="text-[1.25rem] font-bold text-[var(--color-text)] mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {b.title}
                    </h3>
                    <span className="flex items-center gap-2 text-[var(--color-primary)] text-xs font-medium group-hover:gap-3 transition-all duration-200">
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
  );
}
