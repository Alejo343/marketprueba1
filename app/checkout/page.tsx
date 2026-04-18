"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { useCartStore } from "@/store/cartStore";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

function generateReference() {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BARRIL-${Date.now()}-${rand}`;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ─── Wompi logo inline ────────────────────────────────────────────────────────

const WompiLogo = () => (
  <svg width="56" height="18" viewBox="0 0 100 32" fill="none">
    <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#00D4AA">wompi</text>
  </svg>
);

// ─── Cart item row ────────────────────────────────────────────────────────────

function CheckoutItem({ item }: { item: ReturnType<typeof useCartStore.getState>["items"][0] }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-5 border-b border-[#1E1E1E] last:border-0">
      <div className="shrink-0 rounded-xl overflow-hidden bg-[#0D0D0D] border border-[#C9A84C]/10 flex items-center justify-center" style={{ width: 72, height: 72 }}>
        {item.image ? (
          <Image src={item.image} alt={item.name} width={72} height={72}
            className="w-full h-full object-cover" unoptimized />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.3">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[#F5F0E8] text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
        <p className="text-[#9A8C7A] text-xs mt-0.5">{item.presentation}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center bg-[#0D0D0D] border border-[#1E1E1E] rounded-lg overflow-hidden">
            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#9A8C7A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-150 cursor-pointer text-base font-light">−</button>
            <span className="w-8 text-center text-[#F5F0E8] text-sm font-semibold">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#9A8C7A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-150 cursor-pointer text-base font-light">+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#C9A84C] font-bold text-sm" style={{ fontFamily: "var(--font-playfair)" }}>
              {fmt(item.price * item.quantity)}
            </span>
            <button onClick={() => removeItem(item.variantId)}
              className="text-[#9A8C7A]/50 hover:text-red-400 transition-colors duration-150 cursor-pointer p-1" title="Eliminar">
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Form helpers ─────────────────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#9A8C7A] text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full bg-[#0D0D0D] border rounded-xl px-4 py-3 text-[#F5F0E8] text-sm placeholder:text-[#555]",
    "focus:outline-none transition-all duration-200",
    hasError ? "border-red-500/50 focus:border-red-500" : "border-[#1E1E1E] focus:border-[#C9A84C]/50",
  ].join(" ");
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const subtotal = totalPrice();
  const total = subtotal;

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Nombre requerido";
    if (!form.phone.trim()) errs.phone = "Teléfono requerido";
    if (!form.email.trim()) errs.email = "Email requerido";
    if (!form.city.trim()) errs.city = "Ciudad requerida";
    if (!form.address.trim()) errs.address = "Dirección requerida";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const reference = generateReference();
      const amountInCents = total * 100;

      // Get integrity signature from server
      const res = await fetch("/api/checkout/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, amountInCents }),
      });

      if (!res.ok) throw new Error("No se pudo generar la firma de pago");
      const { signature } = await res.json();

      // Save pending order to localStorage so result page can display it
      localStorage.setItem("barril-pending-order", JSON.stringify({
        reference,
        items,
        total,
        customer: form,
        createdAt: new Date().toISOString(),
      }));

      // Build Wompi checkout URL
      const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const redirectUrl = `${siteUrl}/checkout/result`;

      const params = new URLSearchParams({
        "public-key": publicKey,
        currency: "COP",
        "amount-in-cents": String(amountInCents),
        reference,
        "signature:integrity": signature,
        "redirect-url": redirectUrl,
        "customer-data:email": form.email,
        "customer-data:full-name": form.name,
        "customer-data:phone-number": form.phone,
        "customer-data:legal-id": form.phone,
        "customer-data:legal-id-type": "CC",
      });

      // Clear cart before redirect (Wompi handles the payment UI)
      clearCart();
      window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Error inesperado");
      setLoading(false);
    }
  };

  // ── Empty cart ──────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4" style={{ fontFamily: "var(--font-inter)" }}>
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 rounded-full bg-[#111111] border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-[#F5F0E8] text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Tu carrito está vacío</h2>
            <p className="text-[#9A8C7A] text-sm mb-8">Agrega productos para continuar con tu pedido.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973D] text-[#111111] font-bold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer text-sm">
              Explorar productos
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#080808] pt-8 pb-20" style={{ fontFamily: "var(--font-inter)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-[#9A8C7A] hover:text-[#C9A84C] text-sm mb-8 transition-colors duration-200 cursor-pointer">
            <ChevronLeft /> Seguir comprando
          </Link>

          {/* Title */}
          <div className="mb-10">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-1">Finalizar compra</p>
            <h1 className="text-3xl font-bold text-[#F5F0E8]" style={{ fontFamily: "var(--font-playfair)" }}>
              Resumen del pedido
            </h1>
          </div>

          <form id="checkout-form" onSubmit={handlePay} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

              {/* ── Left ─────────────────────────────────────────────────── */}
              <div className="space-y-6">

                {/* Items */}
                <div className="bg-[#111111] rounded-2xl border border-[#C9A84C]/10 p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[#F5F0E8] font-semibold text-base">
                      Productos ({items.reduce((s, i) => s + i.quantity, 0)})
                    </h2>
                    <button type="button" onClick={() => clearCart()}
                      className="text-[#9A8C7A]/60 hover:text-red-400 text-xs transition-colors duration-150 cursor-pointer flex items-center gap-1.5">
                      <TrashIcon /> Vaciar
                    </button>
                  </div>
                  <div className="h-px bg-[#1E1E1E] mb-1" />
                  {items.map((item) => <CheckoutItem key={item.variantId} item={item} />)}
                </div>

                {/* Datos de entrega */}
                <div className="bg-[#111111] rounded-2xl border border-[#C9A84C]/10 p-6">
                  <h2 className="text-[#F5F0E8] font-semibold text-base mb-5">Datos de entrega</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nombre completo *" error={errors.name}>
                        <input type="text" value={form.name} onChange={update("name")} placeholder="Tu nombre"
                          className={inputCls(!!errors.name)} />
                      </Field>
                      <Field label="Teléfono / WhatsApp *" error={errors.phone}>
                        <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+57 300 000 0000"
                          className={inputCls(!!errors.phone)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Email *" error={errors.email}>
                        <input type="email" value={form.email} onChange={update("email")} placeholder="tu@email.com"
                          className={inputCls(!!errors.email)} />
                      </Field>
                      <Field label="Ciudad / Municipio *" error={errors.city}>
                        <input type="text" value={form.city} onChange={update("city")} placeholder="Bogotá"
                          className={inputCls(!!errors.city)} />
                      </Field>
                    </div>
                    <Field label="Dirección de entrega *" error={errors.address}>
                      <input type="text" value={form.address} onChange={update("address")} placeholder="Calle, número, barrio"
                        className={inputCls(!!errors.address)} />
                    </Field>
                    <Field label="Notas adicionales" error={errors.notes}>
                      <textarea value={form.notes} onChange={update("notes")} placeholder="Instrucciones especiales..."
                        rows={3} className={inputCls(false) + " resize-none"} />
                    </Field>
                  </div>
                </div>
              </div>

              {/* ── Right (sticky) ───────────────────────────────────────── */}
              <div className="sticky top-28 space-y-4">

                {/* Summary */}
                <div className="bg-[#111111] rounded-2xl border border-[#C9A84C]/10 p-6">
                  <h2 className="text-[#F5F0E8] font-semibold text-base mb-5">Resumen</h2>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9A8C7A]">Subtotal</span>
                      <span className="text-[#F5F0E8]">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9A8C7A]">Envío</span>
                      <span className="text-[#C9A84C] text-xs font-medium">A coordinar</span>
                    </div>
                  </div>

                  <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-5" />

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[#F5F0E8] font-semibold">Total</span>
                    <span className="text-[#C9A84C] text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                      {fmt(total)}
                    </span>
                  </div>

                  {/* Error */}
                  {apiError && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
                      <p className="text-red-400 text-xs">{apiError}</p>
                    </div>
                  )}

                  {/* Pay button */}
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#B8973D] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-[#111111] font-bold py-4 rounded-xl transition-all duration-200 cursor-pointer text-sm shadow-lg shadow-[#C9A84C]/10">
                    {loading ? <><SpinnerIcon /> Procesando...</> : <><LockIcon /> Pagar con Wompi</>}
                  </button>

                  {/* Wompi branding */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="text-[#9A8C7A] text-[11px]">Procesado por</span>
                    <WompiLogo />
                  </div>
                  <p className="text-[#9A8C7A] text-[11px] text-center mt-1">
                    Pago seguro con tarjeta, PSE, Nequi o Bancolombia
                  </p>
                </div>

                {/* Trust badges */}
                <div className="bg-[#111111] rounded-2xl border border-[#C9A84C]/10 p-5">
                  <div className="space-y-3">
                    {[
                      { icon: <LockIcon />,   text: "Pago encriptado SSL" },
                      { icon: <ShieldIcon />, text: "Transacción 100% segura" },
                      { icon: <TruckIcon />,  text: "Envíos a todo Colombia" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-xs text-[#9A8C7A]">
                        <span className="text-[#C9A84C]/70">{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
