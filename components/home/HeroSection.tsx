"use client";

import { useState, useRef, useEffect } from "react";
import s from "./HeroSection.module.css";

const PASTELS = ["#f5dfc0", "#c0d5f5", "#c0f5dc", "#f5c0d5", "#f5f0c0"];

interface FranjaItem {
  label: string;
  href: string;
}

function OvalFranjas({ items }: { items: FranjaItem[] }) {
  return (
    <div className={s.oval}>
      {items.map(({ label, href }, i) => (
        <a
          key={label}
          href={href}
          className={s.franja}
          style={{ background: PASTELS[i % PASTELS.length] }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

const cards = [
  {
    img: "/images/hero-tipo3/elemento1.png",
    logo: "/images/hero-tipo3/elemento1-logo.png",
    titulo: "/images/hero-tipo3/elemento1-titulo.png",
    franjas: [
      { label: "G.R USDA CHOICE",    href: "#" },
      { label: "Wagyu",              href: "#" },
      { label: "C.H.B UPPER CHOICE", href: "#" },
      { label: "Wagyu Puro",         href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento2.png",
    logo: "/images/hero-tipo3/elemento2-logo.png",
    titulo: "/images/hero-tipo3/elemento2-titulo.png",
    franjas: [
      { label: "Utensilios", href: "#" },
      { label: "Accesorios", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento3.png",
    logo: "/images/hero-tipo3/elemento3-logo.png",
    titulo: "/images/hero-tipo3/elemento3-titulo.png",
    franjas: [
      { label: "Licores",      href: "#" },
      { label: "Agua",         href: "#" },
      { label: "Energizantes", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento4.png",
    logo: "/images/hero-tipo3/elemento4-logo.png",
    titulo: "/images/hero-tipo3/elemento4-titulo.png",
    franjas: [
      { label: "Especias", href: "#" },
      { label: "Salsas",   href: "#" },
    ],
  },
];

export default function HeroSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);
  const didScroll = useRef(false);
  const elementosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeCard) return;
    const close = (e: TouchEvent | MouseEvent) => {
      if (elementosRef.current && !elementosRef.current.contains(e.target as Node)) {
        setActiveCard(null);
      }
    };
    document.addEventListener("touchstart", close);
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("touchstart", close);
      document.removeEventListener("mousedown", close);
    };
  }, [activeCard]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchOrigin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    didScroll.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchOrigin.current) return;
    const dy = Math.abs(e.touches[0].clientY - touchOrigin.current.y);
    if (dy > 8) didScroll.current = true;
  };

  const onTouchEnd = (img: string) => (e: React.TouchEvent) => {
    if (!touchOrigin.current || didScroll.current) {
      touchOrigin.current = null;
      return;
    }
    const dx = Math.abs(e.changedTouches[0].clientX - touchOrigin.current.x);
    const dy = Math.abs(e.changedTouches[0].clientY - touchOrigin.current.y);
    touchOrigin.current = null;
    if (dx < 15 && dy < 15) {
      e.preventDefault();
      setActiveCard((prev) => (prev === img ? null : img));
    }
  };

  return (
    <section className={s.section}>
      <div
        className={s.heroBg}
        style={{ backgroundImage: 'url("/images/hero-fondo.png")' }}
      />
      <div className={s.content}>
        <img
          src="/logov2w.webp"
          alt="Barril Market"
          className={s.titleImg}
        />
        <p className={s.sub}>
          Productos selectos para los verdaderos apasionados
          <br />
          del buen sabor
        </p>
        <div className={s.elementos} ref={elementosRef}>
          {cards.map((card) => {
            const isActive = activeCard === card.img;
            return (
              <div
                key={card.img}
                className={`${s.card}${isActive ? ` ${s.cardActive}` : ""}`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd(card.img)}
              >
                <div className={s.circuloWrap}>
                  <div
                    className={s.circulo}
                    style={{ backgroundImage: `url("${card.img}")` }}
                  />
                  <OvalFranjas items={card.franjas} />
                  {/* Indicador de tap — sólo en móvil */}
                  <div className={s.tapHint}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 11, height: 11 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8z" />
                      <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none" />
                    </svg>
                    <span>ver</span>
                  </div>
                </div>
                <img src={card.logo}   className={s.cardLogo}   alt="" />
                <img src={card.titulo} className={s.cardTitulo} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
