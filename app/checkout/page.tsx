"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { useCartStore } from "@/store/cartStore";

const MapPickerModal = dynamic(() => import("@/components/checkout/MapPickerModal"), {
  ssr: false,
  loading: () => null,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
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
    <div className="flex gap-4 py-5 border-b border-(--color-divider) last:border-0">
      <div className="shrink-0 rounded-xl overflow-hidden bg-(--color-subtle-bg) border border-(--color-border) flex items-center justify-center" style={{ width: 72, height: 72 }}>
        {item.image ? (
          <Image src={item.image} alt={item.name} width={72} height={72}
            className="w-full h-full object-cover" unoptimized />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-(--color-text) text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
        <p className="text-(--color-muted) text-xs mt-0.5">{item.presentation}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center bg-(--color-subtle-bg) border border-(--color-border) rounded-lg overflow-hidden">
            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-(--color-muted) hover:text-(--color-primary) hover:bg-(--color-primary)/10 transition-all duration-150 cursor-pointer text-base font-light">−</button>
            <span className="w-8 text-center text-(--color-text) text-sm font-semibold">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-(--color-muted) hover:text-(--color-primary) hover:bg-(--color-primary)/10 transition-all duration-150 cursor-pointer text-base font-light">+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-(--color-primary) font-bold text-sm" style={{ fontFamily: "var(--font-playfair)" }}>
              {fmt(item.price * item.quantity)}
            </span>
            <button onClick={() => removeItem(item.variantId)}
              className="text-(--color-muted)/50 hover:text-red-400 transition-colors duration-150 cursor-pointer p-1" title="Eliminar">
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
      <label className="block text-(--color-muted) text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full bg-(--color-input-bg) border rounded-xl px-4 py-3 text-(--color-text) text-sm placeholder:text-(--color-placeholder)",
    "focus:outline-none transition-all duration-200",
    hasError ? "border-red-500/50 focus:border-red-500" : "border-(--color-input-border) focus:border-(--color-primary)/50",
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

interface DeliveryZone {
  id: number;
  name: string;
  price_cents: number;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [mapError, setMapError] = useState("");

  // Nequi state
  const [payMethod, setPayMethod] = useState<"card" | "nequi" | "pse">("card");
  const [nequiPhone, setNequiPhone] = useState("");
  const [nequiPhoneError, setNequiPhoneError] = useState("");
  const [nequiLoading, setNequiLoading] = useState(false);
  const [nequiStep, setNequiStep] = useState<"idle" | "waiting" | "approved" | "declined">("idle");
  const [nequiError, setNequiError] = useState("");
  const [nequiTxRef, setNequiTxRef] = useState<{ id: string; reference: string } | null>(null);

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardInstallments, setCardInstallments] = useState("1");
  const [cardErrors, setCardErrors] = useState<{ number?: string; holder?: string; exp?: string; cvc?: string }>({});
  const [cardLoading, setCardLoading] = useState(false);
  const [cardStep, setCardStep] = useState<"idle" | "waiting" | "approved" | "declined">("idle");
  const [cardError, setCardError] = useState("");
  const [cardTxRef, setCardTxRef] = useState<{ id: string; reference: string } | null>(null);

  // Wompi terms of acceptance (Habeas Data)
  const [terms, setTerms] = useState<{ endUserPolicy: string; personalDataAuth: string } | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [acceptedData, setAcceptedData] = useState(false);
  const [termsError, setTermsError] = useState("");
  const termsAccepted = acceptedPolicy && acceptedData;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    fetch(`${apiUrl}/checkout/acceptance`)
      .then((r) => r.json())
      .then((d) => {
        if (d.endUserPolicy && d.personalDataAuth) setTerms(d);
      })
      .catch(() => { /* ignore */ });
  }, []);

  // PSE state
  const [pseInstitutions, setPseInstitutions] = useState<{ code: string; name: string }[]>([]);
  const [pseBank, setPseBank] = useState("");
  const [pseUserType, setPseUserType] = useState<"0" | "1">("0");
  const [pseIdType, setPseIdType] = useState<"CC" | "CE" | "NIT" | "PP">("CC");
  const [pseId, setPseId] = useState("");
  const [pseErrors, setPseErrors] = useState<{ bank?: string; id?: string }>({});
  const [pseLoading, setPseLoading] = useState(false);
  const [pseError, setPseError] = useState("");

  useEffect(() => {
    if (payMethod !== "pse" || pseInstitutions.length > 0) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    fetch(`${apiUrl}/checkout/pse/institutions`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d.institutions)) setPseInstitutions(d.institutions); })
      .catch(() => { /* ignore */ });
  }, [payMethod, pseInstitutions.length]);

  // Map state
  const [mapCoords, setMapCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Delivery zone state
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null);
  const [deliveryCostCents, setDeliveryCostCents] = useState<number | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  const detectDeliveryZone = async (coords?: { lat: number; lng: number }) => {
    const effectiveCoords = coords ?? mapCoords;
    if (!effectiveCoords && (!form.address.trim() || !form.city.trim())) return;
    setDeliveryLoading(true);
    setDeliveryError("");
    try {
      const body = effectiveCoords
        ? { lat: effectiveCoords.lat, lng: effectiveCoords.lng }
        : { address: `${form.address}, ${form.city}` };
      const res = await fetch("/api/checkout/delivery-zone/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo calcular el envío");
      setDeliveryZone(data.zone);
      const cost = Number(data.delivery_cost_cents ?? data.zone?.price_cents);
      setDeliveryCostCents(isNaN(cost) ? null : cost);
    } catch (err) {
      setDeliveryError(err instanceof Error ? err.message : "Error calculando envío");
      setDeliveryZone(null);
      setDeliveryCostCents(null);
    } finally {
      setDeliveryLoading(false);
    }
  };

  const subtotal = totalPrice();
  const deliveryCost = deliveryCostCents !== null ? deliveryCostCents / 100 : 0;
  const total = subtotal + deliveryCost;

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "address" || field === "city") {
      setMapCoords(null);
      setDeliveryZone(null);
      setDeliveryCostCents(null);
      setDeliveryError("");
      setMapError("");
    }
  };

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Nombre requerido";
    if (!form.phone.trim()) errs.phone = "Teléfono requerido";
    if (!form.email.trim()) errs.email = "Email requerido";
    if (!form.city.trim()) errs.city = "Ciudad requerida";
    if (!form.address.trim()) errs.address = "Dirección requerida";
    setErrors(errs);
    if (!mapCoords) {
      setMapError("Debes confirmar tu ubicación en el mapa para calcular el envío");
      return false;
    }
    setMapError("");
    return Object.keys(errs).length === 0;
  };

  const requireTerms = () => {
    if (!termsAccepted) {
      setTermsError("Debes aceptar ambos términos para continuar");
      return false;
    }
    setTermsError("");
    return true;
  };

  const handleNequiPay = async () => {
    if (!validate()) return;
    if (!requireTerms()) return;

    const cleaned = nequiPhone.replace(/\s|-/g, "");
    if (!/^3\d{9}$/.test(cleaned)) {
      setNequiPhoneError("Número inválido — ej: 3001234567");
      return;
    }

    setNequiLoading(true);
    setNequiError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const res = await fetch(`${apiUrl}/checkout/nequi/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleaned,
          amountInCents: total * 100,
          customerEmail: form.email,
          customerName: form.name,
          customerPhone: form.phone,
          customerAddress: form.address,
          customerCity: form.city,
          notes: form.notes,
          items,
          deliveryZoneId: deliveryZone?.id ?? null,
          deliveryCostCents: deliveryCostCents ?? 0,
          deliveryCoords: mapCoords ?? null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar pago Nequi");

      localStorage.setItem("barril-pending-order", JSON.stringify({
        reference: data.reference,
        items,
        total,
        customer: form,
        createdAt: new Date().toISOString(),
      }));

      setNequiTxRef({ id: data.transactionId, reference: data.reference });
      setNequiStep("waiting");
    } catch (err) {
      setNequiError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setNequiLoading(false);
    }
  };

  // Poll Nequi transaction status
  useEffect(() => {
    if (nequiStep !== "waiting" || !nequiTxRef) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`${apiUrl}/checkout/orders/${nequiTxRef.reference}/status`);
        const { status } = await res.json();

        if (status === "APPROVED") {
          clearInterval(poll);
          setNequiStep("approved");
          setTimeout(() => {
            window.location.href = `/checkout/result?reference=${nequiTxRef.reference}`;
          }, 2000);
        } else if (status === "DECLINED" || status === "ERROR" || status === "VOIDED") {
          clearInterval(poll);
          setNequiStep("declined");
          setNequiError("El pago fue rechazado por Nequi. Verifica tu saldo e intenta de nuevo.");
        }
      } catch { /* keep polling on transient errors */ }
    }, 5000);

    return () => clearInterval(poll);
  }, [nequiStep, nequiTxRef]);

  const handleCardPay = async () => {
    if (!validate()) return;
    if (!requireTerms()) return;

    const errs: typeof cardErrors = {};
    const cleanedNumber = cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(cleanedNumber)) errs.number = "Número de tarjeta inválido";
    if (cardHolder.trim().length < 5) errs.holder = "Nombre muy corto (mín. 5)";
    const expMatch = cardExp.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!expMatch) errs.exp = "Formato MM/AA";
    if (!/^\d{3,4}$/.test(cardCvc)) errs.cvc = "CVC inválido";
    setCardErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCardLoading(true);
    setCardError("");

    try {
      const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!;
      const wompiApi = process.env.NEXT_PUBLIC_WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

      // 1) Tokenize card directly against Wompi (card data never touches our server)
      const tokRes = await fetch(`${wompiApi}/tokens/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicKey}`,
        },
        body: JSON.stringify({
          number: cleanedNumber,
          exp_month: expMatch![1],
          exp_year: expMatch![2],
          cvc: cardCvc,
          card_holder: cardHolder.trim(),
        }),
      });

      const tokData = await tokRes.json();
      if (!tokRes.ok || tokData.status !== "CREATED") {
        throw new Error(tokData?.error?.messages?.number?.[0] ?? tokData?.error?.reason ?? "No se pudo validar la tarjeta");
      }

      // 2) Create transaction on our server
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const payRes = await fetch(`${apiUrl}/checkout/card/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardToken: tokData.data.id,
          amountInCents: total * 100,
          customerEmail: form.email,
          customerName: form.name,
          customerPhone: form.phone,
          customerAddress: form.address,
          customerCity: form.city,
          notes: form.notes,
          items,
          installments: Number(cardInstallments) || 1,
          deliveryZoneId: deliveryZone?.id ?? null,
          deliveryCostCents: deliveryCostCents ?? 0,
          deliveryCoords: mapCoords ?? null,
        }),
      });

      const data = await payRes.json();
      if (!payRes.ok) throw new Error(data.error || "Error al procesar el pago");

      localStorage.setItem("barril-pending-order", JSON.stringify({
        reference: data.reference,
        items,
        total,
        customer: form,
        createdAt: new Date().toISOString(),
      }));

      setCardTxRef({ id: data.transactionId, reference: data.reference });
      setCardStep("waiting");
    } catch (err) {
      setCardError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setCardLoading(false);
    }
  };

  // Poll card transaction status
  useEffect(() => {
    if (cardStep !== "waiting" || !cardTxRef) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`${apiUrl}/checkout/orders/${cardTxRef.reference}/status`);
        const { status, statusMessage } = await res.json();

        if (status === "APPROVED") {
          clearInterval(poll);
          setCardStep("approved");
          setTimeout(() => {
            window.location.href = `/checkout/result?reference=${cardTxRef.reference}`;
          }, 2000);
        } else if (status === "DECLINED" || status === "ERROR" || status === "VOIDED") {
          clearInterval(poll);
          setCardStep("declined");
          setCardError(statusMessage || "El pago fue rechazado. Verifica los datos de tu tarjeta e intenta de nuevo.");
        }
      } catch { /* keep polling on transient errors */ }
    }, 3000);

    return () => clearInterval(poll);
  }, [cardStep, cardTxRef]);

  const handlePsePay = async () => {
    if (!validate()) return;
    if (!requireTerms()) return;

    const errs: typeof pseErrors = {};
    if (!pseBank) errs.bank = "Selecciona tu banco";
    const cleanedId = pseId.replace(/\D/g, "");
    if (cleanedId.length < 5) errs.id = "Número de documento inválido";
    setPseErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPseLoading(true);
    setPseError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

      const res = await fetch(`${apiUrl}/checkout/pse/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInCents: total * 100,
          customerEmail: form.email,
          fullName: form.name,
          phone: form.phone.replace(/\s|-/g, ""),
          customerAddress: form.address,
          customerCity: form.city,
          notes: form.notes,
          userType: pseUserType,
          userLegalIdType: pseIdType,
          userLegalId: cleanedId,
          financialInstitutionCode: pseBank,
          items,
          paymentDescription: "Pago en Barril Market".slice(0, 64),
          redirectUrl: `${siteUrl}/checkout/result`,
          deliveryZoneId: deliveryZone?.id ?? null,
          deliveryCostCents: deliveryCostCents ?? 0,
          deliveryCoords: mapCoords ?? null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar pago PSE");

      localStorage.setItem("barril-pending-order", JSON.stringify({
        reference: data.reference,
        items,
        total,
        customer: form,
        createdAt: new Date().toISOString(),
      }));

      clearCart();
      window.location.href = data.asyncPaymentUrl;
    } catch (err) {
      setPseError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setPseLoading(false);
    }
  };

  // ── Empty cart ──────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4" style={{ fontFamily: "var(--font-inter)" }}>
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 rounded-full bg-(--color-surface) border border-(--color-primary)/20 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-(--color-text) text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Tu carrito está vacío</h2>
            <p className="text-(--color-muted) text-sm mb-8">Agrega productos para continuar con tu pedido.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) font-bold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer text-sm">
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
      <div className="min-h-screen bg-(--color-bg) pt-8 pb-20" style={{ fontFamily: "var(--font-inter)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-(--color-muted) hover:text-(--color-primary) text-sm mb-8 transition-colors duration-200 cursor-pointer">
            <ChevronLeft /> Seguir comprando
          </Link>

          {/* Title */}
          <div className="mb-10">
            <p className="text-(--color-primary) text-xs font-semibold tracking-widest uppercase mb-1">Finalizar compra</p>
            <h1 className="text-3xl font-bold text-(--color-text)" style={{ fontFamily: "var(--font-playfair)" }}>
              Resumen del pedido
            </h1>
          </div>

          <form id="checkout-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

              {/* ── Left ─────────────────────────────────────────────────── */}
              <div className="space-y-6">

                {/* Items */}
                <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-(--color-text) font-semibold text-base">
                      Productos ({items.reduce((s, i) => s + i.quantity, 0)})
                    </h2>
                    <button type="button" onClick={() => clearCart()}
                      className="text-(--color-muted)/60 hover:text-red-400 text-xs transition-colors duration-150 cursor-pointer flex items-center gap-1.5">
                      <TrashIcon /> Vaciar
                    </button>
                  </div>
                  <div className="h-px bg-(--color-divider) mb-1" />
                  {items.map((item) => <CheckoutItem key={item.variantId} item={item} />)}
                </div>

                {/* Datos de entrega */}
                <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-6">
                  <h2 className="text-(--color-text) font-semibold text-base mb-5">Datos de entrega</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nombre completo *" error={errors.name}>
                        <input type="text" value={form.name} onChange={update("name")} placeholder="Tu nombre"
                          className={inputCls(!!errors.name)} />
                      </Field>
                      <Field label="Teléfono / WhatsApp *" error={errors.phone}>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-(--color-muted) text-sm pointer-events-none select-none">+57</span>
                          <input
                            type="tel"
                            inputMode="numeric"
                            value={form.phone.startsWith("57") ? form.phone.slice(2) : form.phone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setForm((prev) => ({ ...prev, phone: "57" + digits }));
                              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                            }}
                            placeholder="3001234567"
                            className={inputCls(!!errors.phone) + " pl-14"}
                          />
                        </div>
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

                    {/* Map confirmation — required */}
                    <div>
                      <label className="block text-(--color-muted) text-xs font-medium mb-1.5 uppercase tracking-wide">
                        Confirmar ubicación en mapa <span className="text-red-400">*</span>
                      </label>
                      {mapCoords ? (
                        <div className="flex items-center justify-between bg-green-900/20 border border-green-500/30 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            <div>
                              <p className="text-green-400 text-xs font-medium">Ubicación confirmada</p>
                              <p className="text-(--color-muted) text-[11px] font-mono mt-0.5">
                                {mapCoords.lat.toFixed(5)}, {mapCoords.lng.toFixed(5)}
                              </p>
                            </div>
                          </div>
                          <button type="button" onClick={() => setShowMapPicker(true)}
                            className="text-(--color-muted) text-xs hover:text-(--color-primary) transition-colors cursor-pointer">
                            Editar
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => { setShowMapPicker(true); setMapError(""); }}
                          className={[
                            "w-full flex items-center justify-center gap-2 text-sm py-3 rounded-xl transition-all duration-200 cursor-pointer",
                            mapError
                              ? "border border-red-500/50 text-red-400 bg-red-900/10 hover:bg-red-900/20"
                              : "border border-(--color-primary)/40 hover:border-(--color-primary)/70 text-(--color-primary) bg-(--color-primary)/5 hover:bg-(--color-primary)/10",
                          ].join(" ")}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          Abrir mapa y confirmar dirección
                        </button>
                      )}
                      {mapError && <p className="text-red-400 text-xs mt-1">{mapError}</p>}
                    </div>

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
                <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-6">
                  <h2 className="text-(--color-text) font-semibold text-base mb-5">Resumen</h2>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-(--color-muted)">Subtotal</span>
                      <span className="text-(--color-text)">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-(--color-muted)">Envío</span>
                      <div className="text-right">
                        {deliveryLoading ? (
                          <span className="flex items-center gap-1.5 text-(--color-muted) text-xs">
                            <SpinnerIcon /> Calculando...
                          </span>
                        ) : deliveryZone ? (
                          <div>
                            <span className="text-(--color-primary) font-semibold text-sm">{fmt(deliveryCostCents! / 100)}</span>
                            <p className="text-(--color-muted) text-[11px] mt-0.5">{deliveryZone.name}</p>
                          </div>
                        ) : deliveryError ? (
                          <div className="text-right">
                            <span className="text-(--color-muted) text-xs">No disponible</span>
                            <button type="button" onClick={() => detectDeliveryZone()}
                              className="block text-(--color-primary) text-[11px] hover:underline cursor-pointer mt-0.5">
                              Reintentar
                            </button>
                          </div>
                        ) : mapCoords && !deliveryZone ? (
                          <span className="text-amber-400 text-xs font-medium">Por confirmar</span>
                        ) : (
                          <span className="text-(--color-muted) text-xs">Confirma tu ubicación</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {mapCoords && !deliveryZone && !deliveryLoading && !deliveryError && (
                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl px-4 py-3 mb-5">
                      <p className="text-amber-300 text-xs leading-relaxed">
                        Una vez procesado tu pedido, te enviaremos por WhatsApp el valor del envío a tu zona.
                      </p>
                    </div>
                  )}

                  <div className="h-px bg-linear-to-r from-transparent via-(--color-primary)/30 to-transparent mb-5" />

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-(--color-text) font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-(--color-primary) text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                        {fmt(total)}
                      </span>
                      {mapCoords && !deliveryZone && !deliveryLoading && (
                        <p className="text-(--color-muted) text-[11px] mt-0.5">+ envío por confirmar</p>
                      )}
                    </div>
                  </div>

                  {/* Dynamic payment section */}
                  {cardStep === "waiting" ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center animate-pulse bg-(--color-primary)/20 border border-(--color-primary)/40">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-(--color-text) font-semibold text-sm">Procesando tu tarjeta</p>
                        <p className="text-(--color-muted) text-xs mt-1">
                          Autorizando cobro de <span className="text-(--color-text)">{fmt(total)}</span>
                        </p>
                      </div>
                      <div className="flex justify-center"><SpinnerIcon /></div>
                      <p className="text-[#9A8C7A] text-[11px]">No cierres esta ventana</p>
                    </div>

                  ) : cardStep === "approved" ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-green-400 font-semibold text-sm">¡Pago aprobado!</p>
                      <p className="text-(--color-muted) text-xs">Redirigiendo a tu confirmación...</p>
                    </div>

                  ) : cardStep === "declined" ? (
                    <div className="space-y-3">
                      <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                        <p className="text-red-400 text-xs">{cardError}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button"
                          onClick={() => { setCardStep("idle"); setPayMethod("card"); setCardError(""); }}
                          className="py-2.5 rounded-xl text-sm font-semibold text-(--color-on-primary) bg-(--color-primary) hover:bg-(--color-primary-hover) cursor-pointer">
                          Reintentar
                        </button>
                        <button type="button"
                          onClick={() => { setCardStep("idle"); setPayMethod("nequi"); setCardError(""); }}
                          className="py-2.5 rounded-xl text-sm font-semibold text-(--color-text) bg-(--color-subtle-bg) border border-(--color-border) cursor-pointer">
                          Otra forma
                        </button>
                      </div>
                    </div>

                  ) : nequiStep === "waiting" ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center animate-pulse"
                        style={{ background: "linear-gradient(135deg, #DA0081 0%, #B5006C 100%)" }}>
                        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="shrink-0">
                          <path d="M10 29V11l13 13.5V11h6v18L16 15.5V29H10Z" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-(--color-text) font-semibold text-sm">Aprueba el pago en Nequi</p>
                        <p className="text-(--color-muted) text-xs mt-1">
                          Abre tu app y acepta la solicitud de <span className="text-(--color-text)">{fmt(total)}</span>
                        </p>
                      </div>
                      <div className="flex justify-center"><SpinnerIcon /></div>
                      <p className="text-[#9A8C7A] text-[11px]">Esta pantalla se actualizará automáticamente</p>
                    </div>

                  ) : nequiStep === "approved" ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-green-400 font-semibold text-sm">¡Pago aprobado!</p>
                      <p className="text-(--color-muted) text-xs">Redirigiendo a tu confirmación...</p>
                    </div>

                  ) : nequiStep === "declined" ? (
                    <div className="space-y-3">
                      <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                        <p className="text-red-400 text-xs">{nequiError}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button"
                          onClick={() => { setNequiStep("idle"); setPayMethod("nequi"); setNequiError(""); }}
                          className="py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                          style={{ background: "linear-gradient(135deg, #DA0081 0%, #B5006C 100%)" }}>
                          Reintentar
                        </button>
                        <button type="button"
                          onClick={() => { setNequiStep("idle"); setPayMethod("card"); setNequiError(""); }}
                          className="py-2.5 rounded-xl text-sm font-semibold text-(--color-text) bg-(--color-subtle-bg) border border-(--color-border) cursor-pointer">
                          Otra forma
                        </button>
                      </div>
                    </div>

                  ) : (
                    <>
                      {/* Method selector — tabs */}
                      <div className="mb-5">
                        <p className="text-(--color-muted) text-[11px] font-semibold uppercase tracking-wider mb-2.5">Método de pago</p>
                        <div className="grid grid-cols-3 gap-2">
                          {([
                            {
                              id: "card" as const,
                              label: "Tarjeta",
                              icon: (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                                  <rect x="2" y="5" width="20" height="14" rx="2" />
                                  <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                              ),
                            },
                            {
                              id: "nequi" as const,
                              label: "Nequi",
                              icon: (
                                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className="shrink-0">
                                  <path d="M10 29V11l13 13.5V11h6v18L16 15.5V29H10Z" fill="currentColor" />
                                </svg>
                              ),
                            },
                            {
                              id: "pse" as const,
                              label: "PSE",
                              icon: (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                                  <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />
                                </svg>
                              ),
                            },
                          ]).map(({ id, label, icon }) => {
                            const active = payMethod === id;
                            return (
                              <button
                                key={id}
                                type="button"
                                onClick={() => setPayMethod(id)}
                                className={[
                                  "flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border",
                                  active
                                    ? "bg-(--color-primary)/10 border-(--color-primary) text-(--color-primary) shadow-sm shadow-(--color-primary)/20"
                                    : "bg-(--color-subtle-bg) border-(--color-border) text-(--color-muted) hover:text-(--color-text) hover:border-(--color-primary)/30",
                                ].join(" ")}
                                aria-pressed={active}
                              >
                                {icon}
                                <span className="tracking-wide">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Habeas Data — acceptance required by Wompi */}
                      <div className="mb-4 space-y-2.5 bg-(--color-subtle-bg) border border-(--color-border) rounded-xl p-3.5">
                        <label className="flex items-start gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={acceptedPolicy}
                            onChange={(e) => { setAcceptedPolicy(e.target.checked); if (e.target.checked) setTermsError(""); }}
                            className="mt-0.5 w-4 h-4 shrink-0 accent-(--color-primary) cursor-pointer"
                          />
                          <span className="text-(--color-muted) text-[11px] leading-snug">
                            Acepto los{" "}
                            {terms ? (
                              <a href={terms.endUserPolicy} target="_blank" rel="noopener noreferrer"
                                className="text-(--color-primary) hover:underline">
                                Términos y Condiciones de Uso
                              </a>
                            ) : (
                              <span className="text-(--color-primary)/60">Términos y Condiciones de Uso</span>
                            )}
                            {" "}de Wompi.
                          </span>
                        </label>
                        <label className="flex items-start gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={acceptedData}
                            onChange={(e) => { setAcceptedData(e.target.checked); if (e.target.checked) setTermsError(""); }}
                            className="mt-0.5 w-4 h-4 shrink-0 accent-(--color-primary) cursor-pointer"
                          />
                          <span className="text-(--color-muted) text-[11px] leading-snug">
                            Autorizo el{" "}
                            {terms ? (
                              <a href={terms.personalDataAuth} target="_blank" rel="noopener noreferrer"
                                className="text-(--color-primary) hover:underline">
                                tratamiento de mis datos personales
                              </a>
                            ) : (
                              <span className="text-(--color-primary)/60">tratamiento de mis datos personales</span>
                            )}
                            {" "}conforme a la Ley de Habeas Data.
                          </span>
                        </label>
                        {termsError && (
                          <p className="text-red-400 text-[11px] pt-0.5">{termsError}</p>
                        )}
                      </div>

                      {/* Card form */}
                      {payMethod === "card" && (
                        <div className="space-y-3">
                          <Field label="Número de tarjeta" error={cardErrors.number}>
                            <input
                              type="text"
                              inputMode="numeric"
                              autoComplete="cc-number"
                              value={cardNumber}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                                const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
                                setCardNumber(grouped);
                                setCardErrors((p) => ({ ...p, number: "" }));
                              }}
                              placeholder="4242 4242 4242 4242"
                              className={inputCls(!!cardErrors.number)}
                              autoFocus
                            />
                          </Field>
                          <Field label="Titular de la tarjeta" error={cardErrors.holder}>
                            <input
                              type="text"
                              autoComplete="cc-name"
                              value={cardHolder}
                              onChange={(e) => { setCardHolder(e.target.value); setCardErrors((p) => ({ ...p, holder: "" })); }}
                              placeholder="Como aparece en la tarjeta"
                              className={inputCls(!!cardErrors.holder)}
                            />
                          </Field>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Vencimiento" error={cardErrors.exp}>
                              <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-exp"
                                value={cardExp}
                                onChange={(e) => {
                                  const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  const formatted = d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
                                  setCardExp(formatted);
                                  setCardErrors((p) => ({ ...p, exp: "" }));
                                }}
                                placeholder="MM/AA"
                                className={inputCls(!!cardErrors.exp)}
                              />
                            </Field>
                            <Field label="CVC" error={cardErrors.cvc}>
                              <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                value={cardCvc}
                                onChange={(e) => { setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4)); setCardErrors((p) => ({ ...p, cvc: "" })); }}
                                placeholder="123"
                                className={inputCls(!!cardErrors.cvc)}
                              />
                            </Field>
                          </div>
                          <Field label="Cuotas">
                            <select
                              value={cardInstallments}
                              onChange={(e) => setCardInstallments(e.target.value)}
                              className={inputCls(false) + " cursor-pointer"}
                            >
                              {[1, 2, 3, 6, 9, 12, 18, 24, 36].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "cuota" : "cuotas"}</option>
                              ))}
                            </select>
                          </Field>

                          {cardError && (
                            <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                              <p className="text-red-400 text-xs">{cardError}</p>
                            </div>
                          )}

                          <button type="button" onClick={handleCardPay} disabled={cardLoading}
                            className="w-full flex items-center justify-center gap-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-(--color-on-primary) font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-sm shadow-lg shadow-(--color-primary)/10">
                            {cardLoading ? (
                              <><SpinnerIcon /> Procesando...</>
                            ) : (
                              <><LockIcon /> Pagar {fmt(total)}</>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Nequi form */}
                      {payMethod === "nequi" && (
                        <div className="space-y-3">
                          <Field label="Número Nequi" error={nequiPhoneError}>
                            <input
                              type="tel"
                              value={nequiPhone}
                              onChange={(e) => { setNequiPhone(e.target.value); setNequiPhoneError(""); }}
                              placeholder="3001234567"
                              className={inputCls(!!nequiPhoneError)}
                              autoFocus
                            />
                          </Field>
                          <button type="button" onClick={handleNequiPay} disabled={nequiLoading}
                            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-pink-900/20"
                            style={{ background: "linear-gradient(135deg, #DA0081 0%, #B5006C 100%)" }}>
                            {nequiLoading ? (
                              <><SpinnerIcon /> Procesando...</>
                            ) : (
                              <>
                                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className="shrink-0">
                                  <path d="M10 29V11l13 13.5V11h6v18L16 15.5V29H10Z" fill="white" />
                                </svg>
                                Pagar {fmt(total)} con Nequi
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* PSE form */}
                      {payMethod === "pse" && (
                        <div className="space-y-3">
                          <Field label="Banco" error={pseErrors.bank}>
                            <select
                              value={pseBank}
                              onChange={(e) => { setPseBank(e.target.value); setPseErrors((p) => ({ ...p, bank: "" })); }}
                              className={inputCls(!!pseErrors.bank) + " cursor-pointer"}
                              autoFocus
                            >
                              <option value="">{pseInstitutions.length === 0 ? "Cargando bancos..." : "Selecciona tu banco"}</option>
                              {pseInstitutions.map((i) => (
                                <option key={i.code} value={i.code}>{i.name}</option>
                              ))}
                            </select>
                          </Field>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Tipo de persona">
                              <select
                                value={pseUserType}
                                onChange={(e) => setPseUserType(e.target.value as "0" | "1")}
                                className={inputCls(false) + " cursor-pointer"}
                              >
                                <option value="0">Natural</option>
                                <option value="1">Jurídica</option>
                              </select>
                            </Field>
                            <Field label="Tipo doc.">
                              <select
                                value={pseIdType}
                                onChange={(e) => setPseIdType(e.target.value as "CC" | "CE" | "NIT" | "PP")}
                                className={inputCls(false) + " cursor-pointer"}
                              >
                                <option value="CC">CC</option>
                                <option value="CE">CE</option>
                                <option value="NIT">NIT</option>
                                <option value="PP">PP</option>
                              </select>
                            </Field>
                          </div>
                          <Field label="Número de documento" error={pseErrors.id}>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={pseId}
                              onChange={(e) => { setPseId(e.target.value.replace(/\D/g, "").slice(0, 20)); setPseErrors((p) => ({ ...p, id: "" })); }}
                              placeholder="1234567890"
                              className={inputCls(!!pseErrors.id)}
                            />
                          </Field>

                          {pseError && (
                            <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                              <p className="text-red-400 text-xs">{pseError}</p>
                            </div>
                          )}

                          <button type="button" onClick={handlePsePay} disabled={pseLoading}
                            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                            style={{ background: "linear-gradient(135deg, #0057A6 0%, #003C73 100%)" }}>
                            {pseLoading ? (
                              <><SpinnerIcon /> Redirigiendo a tu banco...</>
                            ) : (
                              <><LockIcon /> Pagar {fmt(total)} con PSE</>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Wompi branding */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="text-(--color-muted) text-[11px]">Procesado por</span>
                    <WompiLogo />
                  </div>
                  <p className="text-(--color-muted) text-[11px] text-center mt-1">
                    Pago seguro con tarjeta, PSE, Nequi o Bancolombia
                  </p>
                </div>

                {/* Trust badges */}
                <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-5">
                  <div className="space-y-3">
                    {[
                      { icon: <LockIcon />,   text: "Pago encriptado SSL" },
                      { icon: <ShieldIcon />, text: "Transacción 100% segura" },
                      { icon: <TruckIcon />,  text: "Envíos a todo Colombia" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-xs text-(--color-muted)">
                        <span className="text-(--color-primary)/70">{icon}</span>
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

      {showMapPicker && (
        <MapPickerModal
          address={form.address}
          city={form.city}
          initialCoords={mapCoords}
          onConfirm={(coords) => { setMapCoords(coords); setMapError(""); setShowMapPicker(false); detectDeliveryZone(coords); }}
          onClose={() => setShowMapPicker(false)}
        />
      )}
    </>
  );
}
