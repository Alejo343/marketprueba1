"use client";

import React, { useRef, useState, useEffect } from "react";
import { getProducts } from "@/lib/api";

const NewlyArrivedBrands = () => {
  const scrollRef = useRef(null);
  const slideWidth = 365.5 + 30;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        // Ordenar por created_at descendente y tomar los últimos 6
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setProducts(sorted.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
            Nuevos productos
          </h2>

          <div className="flex items-center">
            <a
              href="#"
              className="no-underline font-semibold text-[16px] leading-[22px] text-[#787878] capitalize mr-[30px] hover:text-[#222222] transition-colors"
            >
              Ver todos →
            </a>

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

        {/* Skeleton */}
        {loading && (
          <div className="flex gap-[30px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 animate-pulse"
                style={{ width: "365.5px" }}
              >
                <div className="bg-white rounded-[1rem] p-[1rem] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)]">
                  <div className="flex gap-3">
                    <div
                      className="w-4/12 bg-[#F0F0F0] rounded-[0.375rem]"
                      style={{ aspectRatio: "1" }}
                    />
                    <div className="w-8/12 flex flex-col gap-2 py-2">
                      <div className="h-3 bg-[#F0F0F0] rounded w-1/2" />
                      <div className="h-4 bg-[#F0F0F0] rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && (
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: "365.5px", marginRight: "30px" }}
              >
                <div className="bg-white border-0 rounded-[1rem] p-[1rem] mb-[1rem] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)]">
                  <div className="flex gap-0">
                    {/* Imagen */}
                    <div className="w-4/12 flex-shrink-0">
                      <img
                        src={
                          product.primary_image?.url ??
                          "/images/placeholder.png"
                        }
                        alt={product.primary_image?.alt ?? product.name}
                        className="w-full h-full object-cover rounded-[0.375rem]"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="w-8/12 px-[1rem] py-0">
                      <p className="text-[rgba(33,37,41,0.75)] text-[1rem] mb-0">
                        {product.sale_type_label}
                      </p>
                      <h5
                        className="text-[1.25rem] font-bold text-[#222222] leading-[1.2] mt-0 mb-[0.5rem] capitalize"
                        style={{ fontFamily: "Nunito, sans-serif" }}
                      >
                        {product.name}
                      </h5>
                      {product.description && (
                        <p className="text-[0.875rem] text-[#787878] m-0 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewlyArrivedBrands;
