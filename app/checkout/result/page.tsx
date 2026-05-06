"use client";

import { useEffect, useState, type ReactElement, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useCartStore } from "@/store/cartStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING" | null;

interface PendingOrder {
  reference: string;
  items: {
    variantId: number;
    name: string;
    presentation: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    identification: string;
    city: string;
    address: string;
  };
  createdAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-primary)"
    strokeWidth="1.5"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f87171"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#facc15"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-primary)"
    strokeWidth="2"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  NonNullable<TxStatus>,
  {
    icon: ReactElement;
    title: string;
    subtitle: string;
    color: string;
    bg: string;
  }
> = {
  APPROVED: {
    icon: <CheckIcon />,
    title: "¡Pago aprobado!",
    subtitle: "Tu pedido fue procesado exitosamente.",
    color: "var(--color-primary)",
    bg: "bg-(--color-primary)/10 border-(--color-primary)/30",
  },
  DECLINED: {
    icon: <XIcon />,
    title: "Pago rechazado",
    subtitle:
      "Tu pago no fue aprobado. Por favor intenta con otro método de pago.",
    color: "#f87171",
    bg: "bg-red-900/20 border-red-500/30",
  },
  VOIDED: {
    icon: <XIcon />,
    title: "Pago anulado",
    subtitle: "La transacción fue anulada.",
    color: "#f87171",
    bg: "bg-red-900/20 border-red-500/30",
  },
  ERROR: {
    icon: <XIcon />,
    title: "Error en el pago",
    subtitle:
      "Ocurrió un error al procesar el pago. Por favor intenta de nuevo.",
    color: "#f87171",
    bg: "bg-red-900/20 border-red-500/30",
  },
  PENDING: {
    icon: <ClockIcon />,
    title: "Pago en proceso",
    subtitle:
      "Tu pago está siendo verificado. Te notificaremos cuando se confirme.",
    color: "#facc15",
    bg: "bg-yellow-900/20 border-yellow-500/30",
  },
};

// ─── Main ────────────────────────────────────────────────────────────────────

function CheckoutResultContent() {
  const searchParams = useSearchParams();
  const reference = searchParams?.get("reference") ?? null;

  const [status, setStatus] = useState<TxStatus>(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    // Load saved order
    let savedRef: string | null = null;
    const raw = localStorage.getItem("barril-pending-order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setOrder(parsed);
        savedRef = parsed.reference ?? null;
      } catch {
        /* ignore */
      }
    }

    const ref = reference ?? savedRef;

    if (!ref) {
      clearCart();
      setLoading(false);
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

    // PSE is async — poll until a final status or timeout (2 min)
    let attempts = 0;
    const MAX_ATTEMPTS = 24; // 24 × 5s = 2 min

    const verify = async () => {
      try {
        const res = await fetch(`${apiUrl}/checkout/orders/${ref}/status`);
        if (!res.ok) throw new Error();
        const { status: txStatus } = await res.json();

        const finalStatuses = ["APPROVED", "DECLINED", "VOIDED", "ERROR"];
        if (finalStatuses.includes(txStatus)) {
          if (txStatus === "APPROVED") {
            const raw = localStorage.getItem("barril-pending-order");
            if (raw) {
              try {
                const o: PendingOrder = JSON.parse(raw);
                fetch("/api/sales", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    channel: "online",
                    items: o.items.map((i) => ({ type: "variant", id: i.variantId, quantity: i.quantity })),
                    customer: {
                      identification: o.customer.identification,
                      name: o.customer.name,
                      email: o.customer.email,
                    },
                  }),
                }).catch(() => { /* no bloquear la UX si falla */ });
              } catch { /* ignorar */ }
            }
            clearCart();
            localStorage.removeItem("barril-pending-order");
          }
          setStatus(txStatus);
          setLoading(false);
          return;
        }

        // Still PENDING — keep polling if under limit
        attempts++;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(verify, 5000);
        } else {
          setStatus("PENDING");
          setLoading(false);
        }
      } catch {
        setStatus("PENDING");
        setLoading(false);
      }
    };

    verify();
  }, [reference, clearCart]);

  const config = status ? STATUS_CONFIG[status] : null;

  return (
    <div
      className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="w-full max-w-lg">
        {/* Status card */}
        <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-8 text-center mb-6">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <SpinnerIcon />
              <p className="text-(--color-muted) text-sm">
                Verificando tu pago...
              </p>
            </div>
          ) : config ? (
            <>
              <div
                className={`w-20 h-20 rounded-full ${config.bg} border flex items-center justify-center mx-auto mb-5`}
              >
                {config.icon}
              </div>
              <h1
                className="text-(--color-text) text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {config.title}
              </h1>
              <p className="text-(--color-muted) text-sm leading-relaxed mb-2">
                {config.subtitle}
              </p>
              {reference && (
                <p className="text-(--color-muted) text-xs mt-3">
                  Referencia:{" "}
                  <span className="text-(--color-text) font-mono">
                    {reference}
                  </span>
                </p>
              )}
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-(--color-primary)/10 border border-(--color-primary)/30 flex items-center justify-center mx-auto mb-5">
                <CheckIcon />
              </div>
              <h1
                className="text-(--color-text) text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Pedido recibido
              </h1>
              <p className="text-(--color-muted) text-sm">
                Pronto recibirás confirmación de tu pedido.
              </p>
            </>
          )}
        </div>

        {/* Order summary */}
        {order && (
          <div className="bg-(--color-surface) rounded-2xl border border-(--color-primary)/10 p-6 mb-6">
            <h2 className="text-(--color-text) font-semibold text-sm mb-4 flex items-center justify-between">
              Detalle del pedido
              <span className="text-(--color-muted) font-normal text-xs font-mono">
                {order.reference}
              </span>
            </h2>

            <div className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-(--color-muted) line-clamp-1 flex-1 pr-4">
                    {item.name}{" "}
                    <span className="text-(--color-placeholder)">
                      ×{item.quantity}
                    </span>
                  </span>
                  <span className="text-(--color-text) shrink-0">
                    {fmt(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-(--color-divider) mb-4" />

            <div className="flex justify-between items-baseline">
              <span className="text-(--color-muted) text-sm">Total pagado</span>
              <span
                className="text-(--color-primary) text-xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {fmt(order.total)}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-(--color-divider) text-xs text-(--color-muted) space-y-1">
              <p>
                <span className="text-(--color-text)/50">Cliente:</span>{" "}
                {order.customer.name}
              </p>
              <p>
                <span className="text-(--color-text)/50">Email:</span>{" "}
                {order.customer.email}
              </p>
              <p>
                <span className="text-(--color-text)/50">Entrega:</span>{" "}
                {order.customer.address}, {order.customer.city}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          {status === "DECLINED" || status === "ERROR" ? (
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) font-bold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer text-sm"
            >
              Intentar de nuevo
            </Link>
          ) : null}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-(--color-surface) border border-(--color-primary)/30 hover:border-(--color-primary)/60 text-(--color-text) px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutResultPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen bg-(--color-bg) flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        }
      >
        <CheckoutResultContent />
      </Suspense>
    </>
  );
}
