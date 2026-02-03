"use client";

import React, { useState, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-bananas.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: "-30%",
  },
  {
    id: 2,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-biscuits.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: "-30%",
  },
  {
    id: 3,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-cucumber.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
  {
    id: 4,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-milk.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
  {
    id: 5,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-bananas.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
  {
    id: 6,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-biscuits.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
  {
    id: 7,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-cucumber.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
  {
    id: 8,
    name: "Sunstar Fresh Melon Juice",
    image: "/images/thumb-milk.png",
    price: "$18.00",
    qty: "1 Unit",
    rating: 4.5,
    discount: null,
  },
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

// ProductCard exacta de TrendingProducts
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="relative bg-white border border-[#FBFBFB] rounded-[16px] p-[16px] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col h-full">
      {/* Badge Descuento */}
      {product.discount && (
        <span className="absolute top-[12px] left-[12px] z-10 bg-[rgba(163,190,76,1)] text-white text-xs font-semibold px-2 py-1 rounded">
          {product.discount}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlist(!isWishlist)}
        className="absolute top-[20px] right-[20px] w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white border border-[#d8d8d8] hover:border-[#FFC43F] hover:text-[#FFC43F] transition-all duration-300 z-10"
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
          title="Product Title"
          className="flex items-center justify-center h-full"
        >
          <img
            src={product.image}
            alt="Product Thumbnail"
            className="max-w-full max-h-full h-auto object-contain p-4"
          />
        </a>
      </figure>

      {/* Info abajo */}
      <div className="flex flex-col mt-auto">
        <h3
          className="block w-full font-semibold text-[18px] leading-[25px] capitalize text-[#333333] m-0 mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {product.name}
        </h3>

        <div className="flex justify-between items-center mb-1">
          <span
            className="font-normal text-[13px] leading-[18px] uppercase text-[#9D9D9D]"
            style={{ letterSpacing: "0.02em" }}
          >
            {product.qty}
          </span>
          <span className="flex items-center gap-1 font-semibold text-[13px] leading-[18px] text-[#222222]">
            <span className="text-[#1d9bf0]">
              <StarIcon />
            </span>
            {product.rating}
          </span>
        </div>

        <span className="block w-full font-semibold text-[22px] leading-[30px] text-[#222222] mb-3">
          {product.price}
        </span>

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
              style={{ width: "28px", height: "auto", margin: 0, padding: 0 }}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex items-center justify-center bg-white border border-[#E2E2E2] rounded-[6px] text-[#222] hover:bg-[#198754] hover:text-white hover:border-[#198754] transition-colors"
              style={{ width: "26px", height: "26px", padding: 0 }}
            >
              <PlusIcon />
            </button>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 text-[#555] hover:text-[#111] no-underline transition-colors text-sm"
          >
            Add to Cart <CartIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal del carousel
const ProductCarousel = ({ title = "Featured Products" }) => {
  const scrollRef = useRef(null);
  const SLIDE_WIDTH = 230;
  const GAP = 30;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction * (SLIDE_WIDTH + GAP),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-[3rem] overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header exacto de Categories */}
        <div className="flex flex-wrap justify-between items-center mb-[3rem]">
          <h2
            className="text-[2rem] font-bold text-[#222222] leading-[1.2] mb-[0.5rem]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {title}
          </h2>

          <div className="flex items-center">
            <a
              href="#"
              className="no-underline font-semibold text-[16px] leading-[22px] text-[#787878] capitalize mr-[30px] hover:text-[#222222] transition-colors"
            >
              View All Categories →
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] text-[#222222] rounded-[10px] border-0 cursor-pointer hover:bg-[#FFC43F] active:bg-[#ec9b22] transition-colors text-lg"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] text-[#222222] rounded-[10px] border-0 cursor-pointer hover:bg-[#FFC43F] active:bg-[#ec9b22] transition-colors text-lg"
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* Carousel de ProductCards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `${SLIDE_WIDTH}px`, marginRight: `${GAP}px` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
