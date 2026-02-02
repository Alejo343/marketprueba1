"use client";

import Link from "next/link";
import React, { useState } from "react";

// Iconos SVG como componentes
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z"
    />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
    />
  </svg>
);

const Header = ({ cartTotal = "$1290.00" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Aquí puedes agregar la lógica de búsqueda
  };

  return (
    <header className="w-full">
      {/* Container fluid - ocupa todo el ancho */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center py-4 border-b pb-6 border-[rgb(247,247,247)]">
          {/* Logo */}
          <div className="w-full sm:w-4/12 lg:w-3/12 text-center sm:text-left">
            <div className="main-logo">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="FoodMart - Grocery Store"
                  className="max-w-full h-auto inline-block"
                />
              </Link>
            </div>
          </div>

          {/* Search Bar - Desktop only */}
          <div className="hidden lg:block w-full lg:w-5/12">
            <div className="flex items-center bg-[rgb(248,248,248)] p-2 my-2 rounded-[1rem]">
              <div className="flex-1">
                <form onSubmit={handleSearch} className="text-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-0 bg-transparent focus:outline-none text-base"
                    placeholder="Search for more than 20,000 products"
                  />
                </form>
              </div>
              <div className="ml-2">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full sm:w-8/12 lg:w-4/12 flex justify-end gap-[3rem] items-center mt-4 sm:mt-0 justify-center sm:justify-end">
            {/* Icon Actions */}
            <ul className="flex justify-end list-none m-0 gap-1">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-full bg-[rgb(248,248,248)] p-2"
                >
                  <HeartIcon />
                </a>
              </li>

              {/* Cart Icon - Mobile only */}
              <li className="lg:hidden">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center justify-center rounded-full bg-[rgb(248,248,248)] p-2"
                >
                  <CartIcon />
                </button>
              </li>

              {/* Search Icon - Mobile only */}
              <li className="lg:hidden">
                <button
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                  className="flex items-center justify-center rounded-full bg-[rgb(248,248,248)] p-2"
                >
                  <SearchIcon />
                </button>
              </li>
            </ul>

            {/* Cart Info - Desktop only */}
            <div className="hidden lg:block text-right">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="border-0 bg-transparent flex flex-col gap-2 leading-none"
              >
                <span className="text-[1rem] text-[rgba(33,37,41,0.75)]">
                  Your Cart
                </span>
                <span className="text-[1.25rem] font-bold">{cartTotal}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded"
                placeholder="Search for more than 20,000 products"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
