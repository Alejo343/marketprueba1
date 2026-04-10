"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useCartStore } from "@/store/cartStore";
import { useIsMounted } from "@/hooks/useIsMounted";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Accesorios y vitrinas", href: "/region/accesorios-y-vitrinas" },
  { label: "Cocina Mexicana", href: "/region/cocina-mexicana" },
  { label: "Colmena & café", href: "/region/colmena-y-cafe" },
  { label: "Despensa Gourmet", href: "/region/despensa-gourmet" },
  { label: "Escencia Nikkei", href: "/region/escencia-nikkei" },
  { label: "Rincón Italiano", href: "/region/rincon-italiano" },
];

export default function Header() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const mounted = useIsMounted();
  const itemCount = mounted ? totalItems() : 0;

  return (
    <header className={`bg-[#0e0e0e] ${plusJakarta.className}`}>
      {/* Barra principal: logo + carrito */}
      <div className="flex items-center justify-between px-24 xl:px-8 sm:px-4 py-4 border-b border-white/10">
        {/* Placeholder izquierdo para centrar el logo */}
        <div className="w-10" />

        <Link href="/" className="flex items-center">
          <div className="w-[180px] h-[60px]">
            <Image
              src="/logov2w.webp"
              alt="The Market Gourmet"
              width={600}
              height={200}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </Link>

        <button
          onClick={toggleCart}
          className="relative text-white/70 hover:text-white p-1 transition-colors"
          aria-label="Abrir carrito"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-[1.4rem]"
            height="1em"
            width="1em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Barra de navegación */}
      <nav className="px-24 xl:px-8 sm:px-4 py-3">
        <ul className="flex gap-8 justify-center lg:gap-6 sm:gap-3 sm:text-xs flex-wrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide leading-none transition-colors pb-3 block ${
                    isActive
                      ? "font-semibold text-[#C9A84C]"
                      : "font-normal text-white/55 hover:text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
                <div
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A84C] origin-center transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
