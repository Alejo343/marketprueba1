"use client";

import React, { useState, useEffect } from "react";

const FeaturedBanners = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      category: "100% natural",
      title: "Fresh Smoothie & Summer Juice",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
      image: "/images/barril.png",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      category: "100% natural",
      title: "Fresh Smoothie & Summer Juice",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
      image: "/images/setBBQ.png",
      buttonText: "Shop Collection",
    },
    // {
    //   id: 3,
    //   category: "100% natural",
    //   title: "Heinz Tomato Ketchup",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.",
    //   image: "/images/product-thumb-2.png",
    //   buttonText: "Shop Collection",
    // },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const ArrowRightIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"
      />
    </svg>
  );

  return (
    <section
      className="py-4"
      style={{
        backgroundImage: "url('/images/background-pattern.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="banner-blocks-container">
          {/* Block 1 - Large Carousel */}
          <div className="banner-ad-large bg-[rgb(230,243,250)] rounded-lg overflow-hidden">
            <div className="relative h-full">
              {/* Slides */}
              <div className="relative h-full overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 h-full p-8 md:p-12">
                      <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
                        <div
                          className="text-[37px] text-[#FFC43F] capitalize mb-4"
                          style={{ fontFamily: "Garamond, serif" }}
                        >
                          {slide.category}
                        </div>
                        <h3
                          className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#222222] leading-[1.2] mb-4"
                          style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                          {slide.title}
                        </h3>
                        <p className="text-base md:text-lg mb-6 text-gray-700">
                          {slide.description}
                        </p>
                        <div>
                          <a
                            href="#"
                            className="inline-block px-6 py-3 border-2 border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white uppercase text-base font-medium rounded-[0.25rem] transition-colors"
                          >
                            {slide.buttonText}
                          </a>
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-5 flex items-center justify-center">
                        <img
                          src={slide.image}
                          alt="Product Thumbnail"
                          className="max-w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-[#212529]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Block 2 - Fruits & Vegetables */}
          <div
            className="banner-ad-small bg-[#eef5e5] rounded-lg p-8 md:p-12"
            style={{
              backgroundImage: "url('/images/ad-image-1.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "60%",
            }}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-7">
                <div
                  className="text-[37px] text-[#222222] capitalize mb-4 pb-4"
                  style={{ fontFamily: "Garamond, serif" }}
                >
                  20% off
                </div>
                <h3
                  className="text-[33px] font-bold text-[#222222] leading-[1.2] mb-4"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Fruits & Vegetables
                </h3>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[#555] hover:text-[#111] no-underline transition-colors"
                >
                  Shop Collection <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Block 3 - Baked Products */}
          <div
            className="banner-ad-small bg-[rgb(249,235,231)] rounded-lg p-8 md:p-12"
            style={{
              backgroundImage: "url('/images/ad-image-2-2.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "45%",
            }}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-7">
                <div
                  className="text-[37px] text-[#222222] capitalize mb-4 pb-4"
                  style={{ fontFamily: "Garamond, serif" }}
                >
                  15% off
                </div>
                <h3
                  className="text-[33px] font-bold text-[#222222] leading-[1.2] mb-4"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Baked Products
                </h3>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[#555] hover:text-[#111] no-underline transition-colors"
                >
                  Shop Collection <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-blocks-container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 2rem;
          min-height: 600px;
        }

        .banner-ad-large {
          grid-area: 1 / 1 / 3 / 8;
        }

        .banner-ad-small:nth-child(2) {
          grid-area: 1 / 8 / 2 / 13;
        }

        .banner-ad-small:nth-child(3) {
          grid-area: 2 / 8 / 3 / 13;
        }

        @media screen and (max-width: 1140px) {
          .banner-blocks-container {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
          }

          .banner-ad-large {
            grid-area: 1 / 1 / 3 / 2;
          }

          .banner-ad-small:nth-child(2) {
            grid-area: 3 / 1 / 4 / 2;
          }

          .banner-ad-small:nth-child(3) {
            grid-area: 4 / 1 / 5 / 2;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedBanners;
