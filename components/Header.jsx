"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTheme } from "@/components/ThemeProvider";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

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

  const { theme, toggleTheme } = useTheme();
  const itemCount = mounted ? totalItems() : 0;
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header className={`w-full fixed top-0 z-30 transition-transform duration-300 ease-in-out ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Main bar */}
      <div className="bg-(--color-bg)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-[72px]">

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded text-(--color-nav-text) hover:bg-(--color-nav-text)/10 transition-colors duration-200 cursor-pointer"
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <img
                src={theme === "dark" ? "/logov2w.webp" : "/logov2b.webp"}
                alt="Barril Market"
                className="h-14 w-auto"
              />
            </Link>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex items-center bg-(--color-input-bg) border border-(--color-input-border) rounded-lg px-4 py-2.5 gap-3 focus-within:border-(--color-primary)/70 transition-all duration-200">
                  <span className="text-(--color-nav-text)/50 shrink-0">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busca productos artesanales y gourmet..."
                    className="flex-1 bg-transparent text-(--color-nav-text) text-sm placeholder:text-(--color-placeholder) focus:outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded text-(--color-nav-text) hover:bg-(--color-nav-text)/10 transition-colors duration-200 cursor-pointer"
                aria-label="Buscar"
              >
                <SearchIcon />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-(--color-nav-text) hover:text-(--color-primary) hover:bg-(--color-nav-text)/10 transition-colors duration-200 cursor-pointer"
                aria-label={mounted && theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
                title={mounted && theme === "dark" ? "Tema claro" : "Tema oscuro"}
              >
                {mounted && theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
                aria-label="Abrir carrito"
              >
                <CartIcon />
                <span className="hidden sm:inline tracking-wide">Carrito</span>
                {itemCount > 0 && (
                  <span className="bg-(--color-nav) text-(--color-primary) text-[10px] font-bold min-w-4.5 h-4.5 rounded-full flex items-center justify-center px-1 leading-none">
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
              <div className="flex items-center bg-(--color-input-bg) border border-(--color-input-border) rounded-lg px-4 py-2.5 gap-3 focus-within:border-(--color-primary)/70 transition-all duration-200">
                <span className="text-(--color-nav-text)/50 shrink-0">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="flex-1 bg-transparent text-(--color-nav-text) text-sm placeholder:text-(--color-placeholder) focus:outline-none"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Nav bar - Desktop */}
      <nav className="hidden lg:block bg-(--color-bg) border-t border-(--color-nav-text)/10">
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
                        ? "text-(--color-primary)"
                        : "text-(--color-nav-text) hover:text-(--color-primary)"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                  {/* Gold underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-px bg-(--color-primary) transition-transform duration-200 origin-center ${
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
        <div className="lg:hidden bg-(--color-bg) border-b border-(--color-nav-text)/10">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 text-sm border-b border-(--color-nav-text)/10 transition-colors duration-200 cursor-pointer tracking-wide ${
                        isActive
                          ? "text-(--color-primary) font-semibold"
                          : "text-(--color-nav-text) hover:text-(--color-primary)"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-(--color-primary)" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="h-6 bg-linear-to-b from-(--color-bg) to-transparent pointer-events-none" />
    </header>
  );
}
