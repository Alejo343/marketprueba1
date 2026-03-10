"use client";

import React, { useRef } from "react";
import {
  Beef,
  Snowflake,
  Wine,
  Martini,
  Flame,
  ShoppingBasket,
  Refrigerator,
  Candy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Carnes",
    slug: "carnes-y-embutidos",
    icon: Beef,
    color: "text-red-600",
  },
  {
    id: 2,
    title: "Congelados",
    slug: "congelados",
    icon: Snowflake,
    color: "text-sky-500",
  },
  { id: 3, title: "Vinos", slug: "vinos", icon: Wine, color: "text-rose-700" },
  {
    id: 4,
    title: "Licores",
    slug: "licores",
    icon: Martini,
    color: "text-amber-600",
  },
  {
    id: 5,
    title: "Asadores y Parrilla",
    slug: "asadores-parrilla",
    icon: Flame,
    color: "text-orange-600",
  },
  {
    id: 6,
    title: "Abarrotes e Ingredientes",
    slug: "abarrotes-ingredientes",
    icon: ShoppingBasket,
    color: "text-green-600",
  },
  {
    id: 7,
    title: "Refrigerados",
    slug: "refrigerados",
    icon: Refrigerator,
    color: "text-cyan-500",
  },
  {
    id: 8,
    title: "Snacks y Complementos",
    slug: "snacks-complementos",
    icon: Candy,
    color: "text-violet-600",
  },
];

const Categories = () => {
  const scrollRef = useRef(null);
  const slideWidth = 233.667 + 30;

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  return (
    <section className="py-[3rem] overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-[3rem]">
          <h2
            className="text-[2rem] font-bold text-[#222222] leading-[1.2] mb-[0.5rem]"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Categorías
          </h2>

          <div className="flex items-center">
            <a
              href="#"
              className="font-semibold text-[16px] text-[#787878] capitalize mr-[30px] hover:text-[#222222] transition-colors"
            >
              Ver todas →
            </a>

            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] rounded-[10px] hover:bg-[#FFC43F] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#F1F1F1] rounded-[10px] hover:bg-[#FFC43F] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/products/${category.slug}`}
                key={category.id}
                className="flex-shrink-0"
                style={{ width: "233.667px", marginRight: "30px" }}
              >
                <div className="bg-white border border-[#FBFBFB] rounded-[16px] text-center py-[60px] px-[20px] my-[20px] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <Icon
                    size={52}
                    className={`mx-auto ${category.color} transition-transform duration-300 group-hover:scale-110`}
                  />

                  <h3
                    className="text-[20px] font-semibold text-[#222222] capitalize mt-[20px]"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
