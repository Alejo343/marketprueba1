"use client";

import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // Aquí puedes agregar la lógica de suscripción
  };

  return (
    <footer className="py-[3rem]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Logo Section */}
          <div className="lg:col-span-3 md:col-span-1">
            <div className="footer-menu">
              <img
                src="/logo.png"
                alt="FoodMart - Grocery Store"
                className="max-w-full h-auto"
              />
              <div className="social-links mt-[3rem]">
                {/* Aquí puedes agregar íconos de redes sociales */}
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="lg:col-span-2 md:col-span-1">
            <div className="footer-menu">
              <h5 className="text-[1.25rem] font-bold text-[#222222] mb-[0.5rem]">
                Ultras
              </h5>
              <ul className="list-none m-0 p-0">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    Conditions
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    Our Journals
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    Affiliate Programme
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    Ultras Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="lg:col-span-3 md:col-span-2">
            <div className="footer-menu">
              <h5 className="text-[1.25rem] font-bold text-[#222222] mb-[0.5rem]">
                Subscribe Us
              </h5>
              <p className="text-[#555] mb-[1rem]">
                Subscribe to our newsletter to get updates about our grand
                offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex mt-[1rem] gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[rgb(248,248,248)] border-0 rounded-l-[6px] focus:outline-none focus:ring-2 focus:ring-[#212529]"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#212529] text-white border-0 rounded-r-[6px] hover:bg-[#424649] active:bg-[#4d5154] transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Columnas vacías para mantener el espaciado en lg */}
          <div className="hidden lg:block lg:col-span-4"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
