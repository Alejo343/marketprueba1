"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useIsMounted } from "@/hooks/useIsMounted";

const navLinks = [
  { label: "Accesorios y vitrinas", href: "/region/accesorios-y-vitrinas" },
  { label: "Cocina Mexicana", href: "/region/cocina-mexicana" },
  { label: "Colmena & café", href: "/region/colmena-y-cafe" },
  { label: "Despensa Gourmet", href: "/region/despensa-gourmet" },
  { label: "Escencia Nikkei", href: "/region/escencia-nikkei" },
  { label: "Rincón Italiano", href: "/region/rincon-italiano" },
];

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
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

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const mounted = useIsMounted();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const itemCount = mounted ? totalItems() : 0;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header className="w-full sticky top-0 z-30 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Main bar */}
      <div className="bg-[#111111] border-b border-[#C9A84C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-[72px]">

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors duration-200 cursor-pointer"
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/logov2w.webp"
                alt="Barril Market"
                className="h-14 w-auto"
              />
            </Link>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 gap-3 focus-within:border-[#C9A84C]/60 focus-within:bg-[#1C1C1C] transition-all duration-200">
                  <span className="text-[#C9A84C]/60 flex-shrink-0">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busca productos artesanales y gourmet..."
                    className="flex-1 bg-transparent text-[#F5F0E8] text-sm placeholder:text-[#666] focus:outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors duration-200 cursor-pointer"
                aria-label="Buscar"
              >
                <SearchIcon />
              </button>

              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
                aria-label="Abrir carrito"
              >
                <CartIcon />
                <span className="hidden sm:inline tracking-wide">Carrito</span>
                {itemCount > 0 && (
                  <span className="bg-[#111111] text-[#C9A84C] text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 leading-none">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 gap-3 focus-within:border-[#C9A84C]/60 transition-all duration-200">
                <span className="text-[#C9A84C]/60 flex-shrink-0">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="flex-1 bg-transparent text-[#F5F0E8] text-sm placeholder:text-[#666] focus:outline-none"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Gold separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Nav bar - Desktop */}
      <nav className="hidden lg:block bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`block px-4 py-3.5 text-xs tracking-widest uppercase font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#C9A84C]"
                        : "text-[#9A8C7A] hover:text-[#C9A84C]"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                  {/* Gold underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-px bg-[#C9A84C] transition-transform duration-200 origin-center ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-b border-[#C9A84C]/20">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 text-sm border-b border-[#1A1A1A] transition-colors duration-200 cursor-pointer tracking-wide ${
                        isActive
                          ? "text-[#C9A84C] font-semibold"
                          : "text-[#9A8C7A] hover:text-[#C9A84C]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
