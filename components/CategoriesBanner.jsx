"use client";

import React, { useState, useRef } from "react";

const categories = [
  {
    id: 1,
    title: "Fruits & Veges",
    image: "/images/icon-vegetables-broccoli.png",
  },
  { id: 2, title: "Breads & Sweets", image: "/images/icon-bread-baguette.png" },
  { id: 3, title: "Soft Drinks", image: "/images/icon-soft-drinks-bottle.png" },
  { id: 4, title: "Beverages", image: "/images/icon-wine-glass-bottle.png" },
  {
    id: 5,
    title: "Meat Products",
    image: "/images/icon-animal-products-drumsticks.png",
  },
  { id: 6, title: "Breads", image: "/images/icon-bread-herb-flour.png" },
  {
    id: 7,
    title: "Fruits & Veges",
    image: "/images/icon-vegetables-broccoli.png",
  },
  { id: 8, title: "Breads & Sweets", image: "/images/icon-bread-baguette.png" },
  { id: 9, title: "Soft Drinks", image: "/images/icon-soft-drinks-bottle.png" },
  { id: 10, title: "Beverages", image: "/images/icon-wine-glass-bottle.png" },
  {
    id: 11,
    title: "Meat Products",
    image: "/images/icon-animal-products-drumsticks.png",
  },
  { id: 12, title: "Breads", image: "/images/icon-bread-herb-flour.png" },
];

const Categories = () => {
  const scrollRef = useRef(null);
  const slideWidth = 233.667 + 30; // ancho del slide + margin-right

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="py-[3rem] overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-center mb-[3rem]">
          <h2
            className="text-[2rem] font-bold text-[#222222] leading-[1.2] mb-[0.5rem]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Category
          </h2>

          <div className="flex items-center">
            <a
              href="#"
              className="no-underline font-semibold text-[16px] leading-[22px] text-[#787878] capitalize mr-[30px] hover:text-[#222222] transition-colors"
            >
              View All Categories →
            </a>

            {/* Carousel Buttons */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] text-[#222222] rounded-[10px] border-0 cursor-pointer hover:bg-[#FFC43F] active:bg-[#ec9b22] transition-colors text-lg"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button
                onClick={scrollNext}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] text-[#222222] rounded-[10px] border-0 cursor-pointer hover:bg-[#FFC43F] active:bg-[#ec9b22] transition-colors text-lg"
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* Category Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="no-underline flex-shrink-0"
              style={{ width: "233.667px", marginRight: "30px" }}
            >
              <div className="bg-white border border-[#FBFBFB] rounded-[16px] text-center py-[60px] px-[20px] my-[20px] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img
                  src={category.image}
                  alt="Category Thumbnail"
                  className="max-w-full h-auto mx-auto"
                />
                <h3
                  className="text-[20px] font-semibold leading-[27px] text-[#222222] capitalize mt-[20px] mb-[0.5rem]"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {category.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
