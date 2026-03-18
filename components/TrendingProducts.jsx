"use client";

import React, { useState, useEffect } from "react";
import { getProductVariants } from "@/lib/api";

const tabs = [
  { id: "all", label: "All" },
  { id: "fruits", label: "Fruits & Veges" },
  { id: "juices", label: "Juices" },
];

// Iconos SVG
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19 13H5v-2h14v2z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
    />
  </svg>
);

const formatPrice = (price) => {
  if (price == null) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ variant }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const productName = variant.product?.name ?? "Producto";
  const image = variant.primary_image?.url ?? "/images/placeholder.png";
  const imageAlt = variant.primary_image?.alt ?? productName;

  return (
    <div className="relative bg-white border border-[#FBFBFB] rounded-[16px] p-[16px] mb-[30px] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col">
      {/* Badge */}
      {variant.has_sale && (
        <span className="absolute top-[12px] left-[12px] z-10 bg-[rgba(163,190,76,1)] text-white text-xs font-semibold px-2 py-1 rounded">
          Oferta
        </span>
      )}
      {!variant.in_stock && (
        <span className="absolute top-[12px] left-[12px] z-10 bg-[#dc3545] text-white text-xs font-semibold px-2 py-1 rounded">
          Agotado
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setIsWishlist(!isWishlist)}
        className={`absolute top-[20px] right-[20px] w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white border transition-all duration-300 z-10 ${
          isWishlist
            ? "border-[#FFC43F] text-[#FFC43F]"
            : "border-[#d8d8d8] hover:border-[#FFC43F] hover:text-[#FFC43F]"
        }`}
      >
        <HeartIcon />
      </button>

      {/* Imagen */}
      <figure
        className="bg-[#F9F9F9] rounded-[12px] text-center m-0 mb-[1rem] flex-shrink-0"
        style={{ aspectRatio: "1" }}
      >
        <a
          href="#"
          title={productName}
          className="flex items-center justify-center h-full"
        >
          <img
            src={image}
            alt={imageAlt}
            className="max-w-full max-h-full h-auto object-contain p-4"
          />
        </a>
      </figure>

      {/* Info */}
      <div className="flex flex-col mt-auto">
        <h3
          className="block w-full font-semibold text-[18px] leading-[25px] capitalize text-[#333333] m-0 mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {productName}
        </h3>

        <div className="flex justify-between items-center mb-1">
          <span
            className="font-normal text-[13px] leading-[18px] uppercase text-[#9D9D9D]"
            style={{ letterSpacing: "0.02em" }}
          >
            {variant.presentation}
          </span>
          <span className="flex items-center gap-1 font-semibold text-[13px] leading-[18px] text-[#222222]">
            <span className="text-[#1d9bf0]">
              <StarIcon />
            </span>
            5.0
          </span>
        </div>

        <div className="mb-3">
          <span className="block w-full font-semibold text-[22px] leading-[30px] text-[#222222]">
            {formatPrice(variant.final_price)}
          </span>
          {variant.has_sale && (
            <span className="text-[13px] text-[#9D9D9D] line-through">
              {formatPrice(variant.price)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ width: "85px" }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex items-center justify-center bg-white border border-[#E2E2E2] rounded-[6px] text-[#222] hover:bg-[#dc3545] hover:text-white hover:border-[#dc3545] transition-colors"
              style={{ width: "26px", height: "26px", padding: 0 }}
            >
              <MinusIcon />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="text-center border-0 focus:outline-none text-sm"
              style={{ width: "28px", margin: 0, padding: 0 }}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={!variant.in_stock}
              className="flex items-center justify-center bg-white border border-[#E2E2E2] rounded-[6px] text-[#222] hover:bg-[#198754] hover:text-white hover:border-[#198754] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ width: "26px", height: "26px", padding: 0 }}
            >
              <PlusIcon />
            </button>
          </div>

          <a
            href="#"
            className={`flex items-center gap-1 no-underline transition-colors text-sm ${
              variant.in_stock
                ? "text-[#555] hover:text-[#111]"
                : "text-[#aaa] pointer-events-none"
            }`}
          >
            Add to Cart <CartIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="bg-white border border-[#FBFBFB] rounded-[16px] p-[16px] mb-[30px] animate-pulse">
    <div
      className="bg-[#F0F0F0] rounded-[12px] mb-4"
      style={{ aspectRatio: "1" }}
    />
    <div className="h-4 bg-[#F0F0F0] rounded mb-2 w-3/4" />
    <div className="h-3 bg-[#F0F0F0] rounded mb-3 w-1/2" />
    <div className="h-6 bg-[#F0F0F0] rounded mb-4 w-1/3" />
    <div className="h-8 bg-[#F0F0F0] rounded" />
  </div>
);

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductVariants()
      .then((res) => {
        setVariants(res.data.slice(0, 10)); /* solo los primeros 10 */
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-[3rem]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center border-b border-[rgb(247,247,247)] my-[3rem]">
          <h3
            className="text-[1.75rem] font-bold text-[#222222] leading-[1.2] mb-[0.5rem]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Trending Products
          </h3>
          <nav>
            <div className="flex justify-end">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`uppercase text-[1rem] px-4 py-2 border-0 bg-transparent cursor-pointer transition-colors ${
                    activeTab === tab.id
                      ? "text-[#000] border-b-[3px] border-[#FFC43F]"
                      : "text-[#555] border-b-[3px] border-transparent hover:text-[#111]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {error && (
          <div className="py-12 text-center text-red-500">
            Error al cargar productos: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : variants.map((variant) => (
                <ProductCard key={variant.id} variant={variant} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
