"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "./HeroSection.module.css";

const PASTELS = [
  "rgba(201,168,76,0.07)",
  "rgba(201,168,76,0.03)",
  "rgba(201,168,76,0.07)",
  "rgba(201,168,76,0.03)",
  "rgba(201,168,76,0.07)",
];

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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
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
      { label: "Wagyu", href: "#" },
      { label: "Angus", href: "#" },
      { label: "Cerdo y chorizos", href: "#" },
      { label: "Nuestros cortes", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento2.png",
    logo: "/images/hero-tipo3/elemento2-logo.png",
    titulo: "/images/hero-tipo3/elemento2-titulo.png",
    franjas: [
      { label: "Barilles", href: "#" },
      { label: "Accesorios", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento3.png",
    logo: "/images/hero-tipo3/elemento3-logo.png",
    titulo: "/images/hero-tipo3/elemento3-titulo.png",
    franjas: [
      { label: "Cava & licores", href: "#" },
      { label: "Bebidas", href: "#" },
      { label: "Sangrias & mojito The Market", href: "#" },
    ],
  },
  {
    img: "/images/hero-tipo3/elemento4.png",
    logo: "/images/hero-tipo3/elemento4-logo.png",
    titulo: "/images/hero-tipo3/elemento4-titulo.png",
    franjas: [
      { label: "Market Signature", href: "#" },
      { label: "Casa de especias", href: "#" },
      { label: "Cocina Mexicana", href: "#" },
      { label: "Colmena & Cafe", href: "#" },
      { label: "Despensa Gourmet", href: "#" },
      { label: "Escencia nikkei", href: "#" },
      { label: "Rincon italiano", href: "#" },
      { label: "Sabores del mundo", href: "#" },
    ],
  },
];

export default function HeroSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState<{ left: number; width: number } | null>(null);

  const touchOrigin = useRef<{ x: number; y: number } | null>(null);
  const didScroll = useRef(false);
  const elementosRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!activeCard) return;
    const close = (e: TouchEvent | MouseEvent) => {
      if (
        elementosRef.current &&
        !elementosRef.current.contains(e.target as Node)
      ) {
        setActiveCard(null);
        setOverlayPos(null);
      }
    };
    document.addEventListener("touchstart", close);
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("touchstart", close);
      document.removeEventListener("mousedown", close);
    };
  }, [activeCard]);

  const scheduleHide = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setActiveCard(null);
      setOverlayPos(null);
    }, 80);
  }, []);

  const cancelHide = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((img: string, idx: number) => {
    cancelHide();
    const section = sectionRef.current;
    const card = cardRefs.current[idx];
    if (!section || !card) return;
    const sR = section.getBoundingClientRect();
    const cR = card.getBoundingClientRect();
    setOverlayPos({ left: cR.left - sR.left, width: cR.width });
    setActiveCard(img);
  }, [cancelHide]);

  // Cuando el cursor sale de la tarjeta, sólo ocultar si NO fue al overlay
  const handleCardMouseLeave = useCallback((e: React.MouseEvent) => {
    const to = e.relatedTarget as Node | null;
    if (to && overlayRef.current && overlayRef.current.contains(to)) return;
    scheduleHide();
  }, [scheduleHide]);

  // El overlay cancela el hide cuando recibe el cursor
  const handleOverlayMouseEnter = useCallback(() => {
    cancelHide();
  }, [cancelHide]);

  // El overlay oculta si el cursor sale y NO va a una tarjeta
  const handleOverlayMouseLeave = useCallback((e: React.MouseEvent) => {
    const to = e.relatedTarget as Node | null;
    const toCard = cardRefs.current.some(r => r && (r === to || r.contains(to)));
    if (toCard) return;
    scheduleHide();
  }, [scheduleHide]);

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

  const activeCardData = activeCard
    ? cards.find((c) => c.img === activeCard) ?? null
    : null;

  return (
    <section className={s.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div
        className={s.heroBg}
        style={{ backgroundImage: 'url("/images/hero-fondo.png")' }}
      />

      {/* Desktop: overlay de columna completa, altura = 100% de la sección */}
      <div
        ref={overlayRef}
        className={`${s.sectionOverlay}${activeCardData && overlayPos ? ` ${s.sectionOverlayActive}` : ""}`}
        style={overlayPos ? { left: overlayPos.left, width: overlayPos.width } : {}}
        onMouseEnter={handleOverlayMouseEnter}
        onMouseLeave={handleOverlayMouseLeave}
      >
        {activeCardData?.franjas.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            className={s.franja}
            style={{ background: PASTELS[i % PASTELS.length] }}
            onClick={(e) => e.preventDefault()}
          >
            {label}
          </a>
        ))}
      </div>

      <div className={s.content}>
        <img src="/logov2w.webp" alt="Barril Market" className={s.titleImg} />
        <p className={s.sub}>
          Productos selectos para los verdaderos apasionados
          <br />
          del buen sabor
        </p>
        <div className={s.elementos} ref={elementosRef}>
          {cards.map((card, index) => {
            const isActive = activeCard === card.img;
            return (
              <div
                key={card.img}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`${s.card}${isActive ? ` ${s.cardActive}` : ""}`}
                onMouseEnter={() => handleMouseEnter(card.img, index)}
                onMouseLeave={handleCardMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd(card.img)}
              >
                <div className={s.circuloWrap}>
                  <div
                    className={s.circulo}
                    style={{ backgroundImage: `url("${card.img}")` }}
                  />
                  {/* OvalFranjas sólo activo en móvil */}
                  <OvalFranjas items={card.franjas} />
                  <div className={s.tapHint}>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      style={{ width: 11, height: 11 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8z"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="1.6"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                    <span>ver</span>
                  </div>
                </div>
                <img src={card.logo} className={s.cardLogo} alt="" />
                <img src={card.titulo} className={s.cardTitulo} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
