"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RESTRICTED_REGIONS } from "@/lib/restrictedRegions";

const STORAGE_KEY = "barril-age-verified";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

interface AgeGateProps {
  regionSlug?: string;
  forceShow?: boolean;
}

export default function AgeGate({ regionSlug, forceShow }: AgeGateProps) {
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const isRestricted = forceShow || (regionSlug ? RESTRICTED_REGIONS.includes(regionSlug) : false);
    if (!isRestricted) {
      setVisible(false);
      return;
    }
    try {
      const verified = sessionStorage.getItem(STORAGE_KEY);
      if (!verified) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [regionSlug, forceShow]);

  if (!visible) return null;

  const handleVerify = () => {
    setError("");
    if (!day || !month || !year) {
      setError("Por favor completa tu fecha de nacimiento.");
      return;
    }

    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    const birth = new Date(y, m - 1, d);

    // Verifica que la fecha sea válida
    if (
      birth.getFullYear() !== y ||
      birth.getMonth() !== m - 1 ||
      birth.getDate() !== d
    ) {
      setError("La fecha ingresada no es válida.");
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const diffMonth = today.getMonth() - birth.getMonth();
    if (diffMonth < 0 || (diffMonth === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 18) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // sessionStorage no disponible
      }
      setVisible(false);
    } else {
      setDenied(true);
    }
  };

  const selectClass =
    "w-full bg-[#0D0D0D] border border-[#C9A84C]/30 rounded-lg px-3 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/50 appearance-none cursor-pointer transition-colors";

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: "rgba(8,8,8,0.92)" }}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #161616 0%, #111111 100%)",
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 0 60px rgba(201,168,76,0.08), 0 24px 64px rgba(0,0,0,0.8)",
        }}
      >
        {/* Línea dorada superior */}
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />

        <div className="px-8 py-10 flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logov2w.webp"
              alt="Barril Market"
              width={140}
              height={48}
              className="object-contain"
              unoptimized
            />
            <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
          </div>

          {!denied ? (
            <>
              {/* Títulos */}
              <div className="text-center">
                <h2
                  className="text-2xl font-semibold text-[#F5F0E8] mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Verificación de edad
                </h2>
                <p className="text-[#9A8C7A] text-sm leading-relaxed">
                  Este contenido está disponible únicamente para mayores de{" "}
                  <span className="text-[#C9A84C] font-semibold">18 años</span>.
                  <br />
                  Ingresa tu fecha de nacimiento para continuar.
                </p>
              </div>

              {/* Selectores */}
              <div className="w-full flex flex-col gap-3">
                <label className="text-[#9A8C7A] text-xs font-medium tracking-widest uppercase">
                  Fecha de nacimiento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Día */}
                  <div className="relative">
                    <select
                      value={day}
                      onChange={(e) => { setDay(e.target.value); setError(""); }}
                      className={selectClass}
                      aria-label="Día"
                    >
                      <option value="">Día</option>
                      {DAYS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>

                  {/* Mes */}
                  <div className="relative">
                    <select
                      value={month}
                      onChange={(e) => { setMonth(e.target.value); setError(""); }}
                      className={selectClass}
                      aria-label="Mes"
                    >
                      <option value="">Mes</option>
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>

                  {/* Año */}
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => { setYear(e.target.value); setError(""); }}
                      className={selectClass}
                      aria-label="Año"
                    >
                      <option value="">Año</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-xs text-center mt-1 animate-pulse">{error}</p>
                )}
              </div>

              {/* Botón verificar */}
              <button
                onClick={handleVerify}
                className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #B8973D)",
                  color: "#080808",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #D4B55A, #C9A84C)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(201,168,76,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #C9A84C, #B8973D)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.25)";
                }}
              >
                Soy mayor de 18 años
              </button>

              {/* Link menor */}
              <button
                onClick={() => window.history.back()}
                className="text-[#9A8C7A] text-xs hover:text-[#C9A84C] transition-colors underline underline-offset-2 cursor-pointer"
              >
                Soy menor de edad — salir
              </button>

              {/* Disclaimer */}
              <p className="text-[#9A8C7A]/50 text-[10px] text-center leading-relaxed max-w-xs">
                Al continuar, confirmas que tienes 18 años o más y aceptas nuestras políticas de acceso a contenido regulado.
              </p>
            </>
          ) : (
            /* Estado: acceso denegado */
            <div className="flex flex-col items-center gap-5 py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ border: "2px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.05)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <div className="text-center">
                <h2
                  className="text-xl font-semibold text-[#F5F0E8] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Acceso restringido
                </h2>
                <p className="text-[#9A8C7A] text-sm leading-relaxed">
                  Debes ser mayor de{" "}
                  <span className="text-[#C9A84C] font-semibold">18 años</span>{" "}
                  para acceder a este contenido.
                </p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #B8973D)",
                  color: "#080808",
                }}
              >
                Volver atrás
              </button>
            </div>
          )}
        </div>

        {/* Línea dorada inferior */}
        <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)" }} />
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
