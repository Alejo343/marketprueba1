"use client";

import React, { useRef } from "react";

const brands = [
  {
    id: 1,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-11.jpg",
  },
  {
    id: 2,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-12.jpg",
  },
  {
    id: 3,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-13.jpg",
  },
  {
    id: 4,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-14.jpg",
  },
  {
    id: 5,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-11.jpg",
  },
  {
    id: 6,
    subtitle: "Amber Jar",
    title: "Honey best nectar you wish to get",
    image: "/images/product-thumb-12.jpg",
  },
];

const NewlyArrivedBrands = () => {
  const scrollRef = useRef(null);
  const slideWidth = 365.5 + 30; // ancho del slide + margin-right

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
            Newly Arrived Brands
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

        {/* Brand Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0"
              style={{ width: "365.5px", marginRight: "30px" }}
            >
              {/* Card */}
              <div className="bg-white border-0 rounded-[1rem] p-[1rem] mb-[1rem] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)]">
                <div className="flex gap-0">
                  {/* Imagen */}
                  <div className="w-4/12 flex-shrink-0">
                    <img
                      src={brand.image}
                      alt="Card title"
                      className="w-full h-full object-cover rounded-[0.375rem]"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="w-8/12 px-[1rem] py-0">
                    <p className="text-[rgba(33,37,41,0.75)] text-[1rem] mb-0">
                      {brand.subtitle}
                    </p>
                    <h5
                      className="text-[1.25rem] font-bold text-[#222222] leading-[1.2] mt-0 mb-[0.5rem]"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {brand.title}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewlyArrivedBrands;
