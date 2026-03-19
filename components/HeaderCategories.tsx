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
  { label: "Italia", href: "/region/italia" },
  { label: "México", href: "/region/mexico" },
  { label: "Nikkei", href: "/region/nikkei" },
  { label: "Delish", href: "/region/delish" },
  { label: "Market", href: "/region/market" },
  { label: "Café & Mieles", href: "/region/colmena-y-cafe" },
];

export default function Header() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const mounted = useIsMounted();
  const itemCount = mounted ? totalItems() : 0;

  return (
    <header
      className={`pt-10 px-24 xl:px-6 pb-5 transition duration-300 xs:text-sm sm:pt-6 bg-theme text-theme ${plusJakarta.className}`}
    >
      <div className="flex items-center justify-between relative mb-14">
        <Link href="/auth" className="flex items-center gap-1" />

        <Link
          href="/"
          className="text-[27px] relative -translate-x-8 xs:translate-y-5"
        >
          <span className="font-extrabold">Light</span>
          <span className="font-normal drop-shadow-logo">house</span>
          <div className="absolute -top-0.75 right-7.75 -z-10 h-10 w-10">
            <Image
              src="/images/sun.png"
              alt="the sun"
              width={192}
              height={192}
              className="w-full h-full"
              priority
            />
          </div>
        </Link>

        <button
          onClick={toggleCart}
          className="relative text-theme p-1"
          aria-label="Abrir carrito"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-2xl xs:text-lg"
            height="1em"
            width="1em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E07B2A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </button>
      </div>

      <nav>
        <ul className="flex gap-8 justify-center lg:gap-5 lg:text-sm xs:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label} className="relative group transition p-1">
                <Link
                  href={link.href}
                  className={`text-base leading-none transition-colors ${
                    isActive
                      ? "font-bold text-theme"
                      : "font-normal text-muted-theme hover:text-theme"
                  }`}
                >
                  {link.label}
                </Link>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.75 bg-primary-theme origin-center transition-transform duration-300 ${
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
