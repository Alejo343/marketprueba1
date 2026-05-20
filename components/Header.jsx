"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTheme } from "@/components/ThemeProvider";

const SunIcon = () => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const navCategories = [
  {
    label: "Vaca Santa Carnes Premium",
    href: "/region/vaca-santa",
    items: [
      { label: "Wagyu", href: "#" },
      { label: "Angus", href: "#" },
      { label: "Cerdo y chorizos", href: "#" },
      { label: "Nuestros cortes", href: "#" },
    ],
  },
  {
    label: "Barril Market",
    href: "/region/barril-market",
    items: [
      { label: "Barilles", href: "/region/barriles" },
      { label: "Accesorios", href: "/region/barril-market" },
    ],
  },
  {
    label: "Licores & Bebidas",
    href: "/region/licores",
    items: [
      { label: "Cava & licores", href: "/region/cava-y-licores" },
      { label: "Bebidas", href: "/region/bebidas" },
      { label: "Sangrias & mojito The Market", href: "/region/sangrias-y-mojito-the-market" },
    ],
  },
  {
    label: "Nuestros Productos",
    href: "/region/nuestros-productos",
    items: [
      { label: "Market Signature", href: "/region/the-market-signature" },
      { label: "Casa de especias", href: "/region/casa-de-especias" },
      { label: "Cocina Mexicana", href: "/region/cocina-mexicana" },
      { label: "Colmena & Cafe", href: "/region/colmena-y-cafe" },
      { label: "Despensa Gourmet", href: "/region/despensa-gourmet" },
      { label: "Escencia nikkei", href: "/region/escencia-nikkei" },
      { label: "Rincon italiano", href: "/region/rincon-italiano" },
      { label: "Sabores del mundo", href: "/region/sabores-del-mundo" },
    ],
  },
  {
    label: "Recomnedados",
    href: "/region/nuestros-productos",
  },
  {
    label: "Boxes & Regalos",
    href: "/region/nuestros-productos",
  },
];

const mainNav = [
  { label: "Productos", href: "/", hasDropdown: true },
  { label: "Quienes somos", href: "/quienes-somos" },
  { label: "Contáctanos", href: "/contactanos" },
];

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

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, totalItems } = useCartStore();
  const mounted = useIsMounted();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const [productsHover, setProductsHover] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const hoverTimeout = useRef(null);
  const searchInputRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  const itemCount = mounted ? totalItems() : 0;

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
        setProductsHover(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const openProducts = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setProductsHover(true);
  };

  const closeProducts = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setProductsHover(false), 120);
  };

  const isRegionActive = pathname?.startsWith("/region/");

  return (
    <header className="w-full fixed top-0 z-30">
      {/* Main bar */}
      <div className="bg-(--color-bg) relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-18">
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
                src="/logov2w.webp"
                alt="Barril Market"
                className="h-14 w-auto"
              />
            </Link>

            {/* Nav inline - Desktop */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative min-w-0">
              {/* Nav links */}
              <nav
                className="flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                  maxWidth: searchOpen ? "0px" : "800px",
                  opacity: searchOpen ? 0 : 1,
                  pointerEvents: searchOpen ? "none" : "auto",
                }}
              >
                <ul className="flex items-center gap-2 whitespace-nowrap">
                  {mainNav.map((link) => {
                    if (link.hasDropdown) {
                      const showUnderline = productsHover || isRegionActive;
                      return (
                        <li
                          key={link.href}
                          className="relative"
                          onMouseEnter={openProducts}
                          onMouseLeave={closeProducts}
                        >
                          <Link
                            href={link.href}
                            className={`flex items-center gap-1.5 px-5 py-3 text-xs tracking-widest uppercase font-medium transition-colors duration-200 cursor-pointer ${
                              showUnderline
                                ? "text-(--color-primary)"
                                : "text-(--color-nav-text) hover:text-(--color-primary)"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {link.label}
                            <span
                              className={`transition-transform duration-200 ${
                                productsHover ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDown />
                            </span>
                          </Link>
                          <span
                            className={`absolute bottom-0 left-5 right-5 h-px bg-(--color-primary) transition-transform duration-200 origin-center ${
                              showUnderline ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </li>
                      );
                    }

                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href} className="relative group">
                        <Link
                          href={link.href}
                          className={`block px-5 py-3 text-xs tracking-widest uppercase font-medium transition-colors duration-200 cursor-pointer ${
                            isActive
                              ? "text-(--color-primary)"
                              : "text-(--color-nav-text) hover:text-(--color-primary)"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {link.label}
                        </Link>
                        <span
                          className={`absolute bottom-0 left-5 right-5 h-px bg-(--color-primary) transition-transform duration-200 origin-center ${
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

              {/* Search bar expandable */}
              <div
                className="absolute inset-0 flex items-center px-4 transition-all duration-300 ease-in-out"
                style={{
                  opacity: searchOpen ? 1 : 0,
                  pointerEvents: searchOpen ? "auto" : "none",
                  transform: searchOpen ? "scaleX(1)" : "scaleX(0.9)",
                  transformOrigin: "center",
                }}
              >
                <div className="flex items-center w-full max-w-lg mx-auto border border-(--color-primary)/40 rounded-lg bg-(--color-nav) px-3 gap-2.5 transition-all duration-300">
                  <span className="text-(--color-primary)/70 shrink-0">
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchInputRef}
                    type="search"
                    autoComplete="off"
                    placeholder="Buscar productos, marcas, categorías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const q = e.currentTarget.value.trim();
                        if (q) {
                          router.push(`/search?q=${encodeURIComponent(q)}`);
                          closeSearch();
                        }
                      }
                    }}
                    className="flex-1 bg-transparent py-2.5 text-sm text-(--color-nav-text) placeholder:text-(--color-nav-text)/40 outline-none [&::-webkit-search-cancel-button]:hidden"
                    style={{ fontFamily: "var(--font-inter)" }}
                    tabIndex={searchOpen ? 0 : -1}
                    aria-hidden={!searchOpen}
                  />
                  <button
                    onClick={closeSearch}
                    className="shrink-0 flex items-center justify-center w-6 h-6 rounded text-(--color-nav-text)/50 hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                    aria-label="Cerrar búsqueda"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Search toggle - desktop only */}
              <button
                onClick={() =>
                  searchOpen ? closeSearch() : setSearchOpen(true)
                }
                className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 cursor-pointer ${
                  searchOpen
                    ? "text-(--color-primary) bg-(--color-primary)/10"
                    : "text-(--color-nav-text) hover:text-(--color-primary) hover:bg-(--color-nav-text)/10"
                }`}
                aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
              >
                {searchOpen ? <CloseIcon /> : <SearchIcon />}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-(--color-nav-text) hover:text-(--color-primary) hover:bg-(--color-nav-text)/10 transition-colors duration-200 cursor-pointer"
                aria-label={
                  mounted && theme === "dark"
                    ? "Activar tema claro"
                    : "Activar tema oscuro"
                }
                title={
                  mounted && theme === "dark" ? "Tema claro" : "Tema oscuro"
                }
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

        {/* Productos dropdown (desktop) */}
        <div
          onMouseEnter={openProducts}
          onMouseLeave={closeProducts}
          className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-200 ${
            productsHover
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-(--color-bg) border-t border-(--color-nav-text)/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center">
                {navCategories.map((cat) => {
                  const catActive = pathname?.startsWith(cat.href);
                  return (
                    <div key={cat.label} className="relative group">
                      <Link
                        href={cat.href ?? "#"}
                        className={`block px-6 py-3.5 text-xs tracking-widest uppercase font-semibold transition-colors duration-200 cursor-pointer ${
                          catActive
                            ? "text-(--color-primary)"
                            : "text-(--color-nav-text) hover:text-(--color-primary)"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cat.label}
                      </Link>
                      {cat.items?.length > 0 && (
                        <div className="absolute left-0 top-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-10">
                          <div className="bg-(--color-bg) border border-t-0 border-(--color-nav-text)/15 shadow-xl rounded-b-lg py-2 min-w-44">
                            {cat.items.map((item) => {
                              const itemActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className={`block px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                                    itemActive
                                      ? "text-(--color-primary)"
                                      : "text-(--color-nav-text) hover:text-(--color-primary) hover:bg-(--color-primary)/5"
                                  }`}
                                  style={{ fontFamily: "var(--font-inter)" }}
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-(--color-bg) border-b border-(--color-nav-text)/10">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="flex flex-col">
              {mainNav.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <li
                      key={link.href}
                      className="border-b border-(--color-nav-text)/10"
                    >
                      <button
                        onClick={() => {
                          setMobileProductsOpen(!mobileProductsOpen);
                          setMobileOpenCategory(null);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200 cursor-pointer tracking-wide"
                      >
                        <span>{link.label}</span>
                        <span
                          className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                        >
                          <ChevronDown />
                        </span>
                      </button>
                      {mobileProductsOpen && (
                        <div className="pb-2">
                          {navCategories.map((cat) => (
                            <div
                              key={cat.href}
                              className="border-t border-(--color-nav-text)/5"
                            >
                              <button
                                onClick={() =>
                                  setMobileOpenCategory(
                                    mobileOpenCategory === cat.href
                                      ? null
                                      : cat.href,
                                  )
                                }
                                className="w-full flex items-center justify-between px-6 py-2.5 text-xs tracking-widest uppercase font-semibold text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                              >
                                <span>{cat.label}</span>
                                <span
                                  className={`transition-transform duration-200 ${mobileOpenCategory === cat.href ? "rotate-180" : ""}`}
                                >
                                  <ChevronDown />
                                </span>
                              </button>
                              {mobileOpenCategory === cat.href && (
                                <ul className="pb-1 pl-4">
                                  {cat.items.map((item) => (
                                    <li key={item.label}>
                                      <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-sm text-(--color-nav-text)/70 hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

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
