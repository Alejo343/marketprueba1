"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import CartItem from "./CartItem";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, clearCart } =
    useCartStore();

  const mounted = useIsMounted();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  if (!mounted) return null;

  const count = totalItems();
  const total = totalPrice();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-105 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out bg-(--color-surface) text-(--color-text) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-divider)">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-(--color-text)">
              Tu carrito
            </h2>
            {count > 0 && (
              <span className="bg-(--color-primary) text-(--color-on-primary) text-xs font-medium px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-(--color-muted) hover:bg-(--color-subtle-bg) cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-(--color-border)"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <div>
                <p className="text-sm font-medium text-(--color-text)">
                  Tu carrito está vacío
                </p>
                <p className="text-xs mt-1 text-(--color-muted)">
                  Agrega productos para comenzar
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-sm text-(--color-primary) hover:underline cursor-pointer"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItem key={item.variantId} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 flex flex-col gap-3 border-t border-(--color-divider)">
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--color-muted)">Total</span>
              <span className="text-xl font-medium text-(--color-text)">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full h-11 bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
            >
              Ir a pagar
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-xs text-(--color-muted)/60 hover:text-red-500 transition-colors cursor-pointer"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
