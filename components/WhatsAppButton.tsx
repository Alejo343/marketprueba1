"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "573155927944";
const WHATSAPP_MESSAGE =
  "Hola, tengo una pregunta sobre un producto de Market Gourmet";
const INSTAGRAM_URL = "https://www.instagram.com/themarketgourmet.cali/";

export default function WhatsAppButton() {
  const [hoveredIg, setHoveredIg] = useState(false);
  const [hoveredWa, setHoveredWa] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const active = hoveredIg || hoveredWa;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111111",
        border: `1px solid ${active ? "#C9A84C" : "rgba(201,168,76,0.25)"}`,
        borderRadius: "50px",
        boxShadow: active
          ? "0 0 0 1px #C9A84C40, 0 8px 32px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.5)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar Instagram"
        onMouseEnter={() => setHoveredIg(true)}
        onMouseLeave={() => setHoveredIg(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: hoveredIg ? "12px 20px 12px 14px" : "14px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "padding 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <span
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(214,36,159,0.4)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </span>
        <span
          style={{
            maxWidth: hoveredIg ? "180px" : "0px",
            opacity: hoveredIg ? 1 : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition:
              "max-width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            fontFamily: "var(--font-inter, Inter, sans-serif)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#C9A84C", display: "block", fontSize: "11px", marginBottom: "3px", fontWeight: 600 }}>
            Síguenos
          </span>
          <span style={{ color: "#F5F0E8" }}>Instagram</span>
        </span>
      </a>

      {/* Divisor */}
      <div style={{ height: "1px", backgroundColor: "rgba(201,168,76,0.2)", margin: "0 14px" }} />

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setHoveredWa(true)}
        onMouseLeave={() => setHoveredWa(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: hoveredWa ? "12px 20px 12px 14px" : "14px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "padding 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <span
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(37,211,102,0.35)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span
          style={{
            maxWidth: hoveredWa ? "180px" : "0px",
            opacity: hoveredWa ? 1 : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition:
              "max-width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            fontFamily: "var(--font-inter, Inter, sans-serif)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#C9A84C", display: "block", fontSize: "11px", marginBottom: "3px", fontWeight: 600 }}>
            ¿Tienes preguntas?
          </span>
          <span style={{ color: "#F5F0E8" }}>Escríbenos</span>
        </span>
      </a>
    </div>
  );
}
