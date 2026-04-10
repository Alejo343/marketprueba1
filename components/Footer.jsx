"use client";

import React, { useState } from "react";

// Íconos SVG inline para no depender de librerías externas
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconLinktree = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h2.107v4.638c0 .566-.447 1.052-1.052 1.052-.566 0-1.052-.446-1.052-1.052v-2.531H7.873c-.08 0-.162 0-.242-.08-.89-.162-1.457-1.052-1.295-1.983zm8.094 0l.972 2.449c.162.404.08.89-.242 1.214-.324.323-.81.404-1.214.242l-2.449-.972v2.046c0 .566-.446 1.052-1.052 1.052-.565 0-1.052-.446-1.052-1.052v-4.638h2.108c.524 0 .971-.38 1.052-.897 0-.162 0-.323-.08-.486zm-4.019-5.851l3.259-3.259c.404-.404 1.052-.404 1.456 0 .404.404.404 1.052 0 1.456l-1.78 1.78h1.78c.566 0 1.052.447 1.052 1.052 0 .566-.446 1.052-1.052 1.052h-3.259V9.215zm-1.052 2.081H7.717c-.566 0-1.052-.446-1.052-1.052 0-.565.446-1.052 1.052-1.052h1.78l-1.78-1.78c-.404-.404-.404-1.052 0-1.456.404-.404 1.052-.404 1.456 0l3.259 3.259v2.081z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // TODO: conectar con API de newsletter
  };

  return (
    <footer className="py-[3rem] border-t border-gray-100">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo + Redes Sociales */}
          <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-6">
            {/*
              Contenedor de logo con tamaño fijo.
              Usa object-contain para que cualquier imagen
              (horizontal, cuadrada, vertical) se adapte sin romperse.
              Solo cambia el src="/logo.png" cuando tengas el logo nuevo.
            */}
            <div className="w-[140px] h-[70px]">
              <img
                src="/logov2b.webp"
                alt="The Market"
                className="w-full h-full object-contain object-left"
              />
            </div>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/barrilmarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#E1306C] hover:border-[#E1306C] transition-colors duration-200"
              >
                <IconInstagram />
              </a>
              <a
                href="https://linktr.ee/barrilmarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linktree"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#39E09B] hover:border-[#39E09B] transition-colors duration-200"
              >
                <IconLinktree />
              </a>
            </div>
          </div>

          {/* Menú de links */}
          <div className="lg:col-span-2 md:col-span-1">
            <h5
              className="text-[1.25rem] font-bold text-[#222222] mb-[0.5rem]"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              The Market
            </h5>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {/* Agrega aquí los links cuando los tengas definidos */}
              {[
                { label: "Quiénes somos", href: "#" },
                { label: "Política de envíos", href: "#" },
                { label: "Términos y condiciones", href: "#" },
                { label: "Preguntas frecuentes", href: "#" },
                { label: "Contacto", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#555] hover:text-[#111] no-underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 md:col-span-2">
            <h5
              className="text-[1.25rem] font-bold text-[#222222] mb-[0.5rem]"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Suscríbete
            </h5>
            <p className="text-[#555] mb-[1rem]">
              Recibe novedades, ofertas exclusivas y lo mejor de nuestras
              secciones directo en tu correo.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#f8f8f8] border-0 rounded-l-[6px] focus:outline-none focus:ring-2 focus:ring-[#212529]"
                placeholder="Tu correo electrónico"
                aria-label="Correo electrónico"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#212529] text-white border-0 rounded-r-[6px] hover:bg-[#424649] active:bg-[#4d5154] transition-colors font-medium whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>

          {/* Espacio en desktop */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>

        {/* Footer bottom */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#aaa] text-[0.8rem]">
            © {new Date().getFullYear()} The Market. Todos los derechos
            reservados.
          </p>
          <p className="text-[#aaa] text-[0.8rem]">Hecho con ♥ en Colombia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
