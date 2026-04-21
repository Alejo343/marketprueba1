"use client";

import Image from "next/image";
import { CartItem as CartItemType, useCartStore } from "@/store/cartStore";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 py-4 border-b border-(--color-divider)">
      {/* Imagen */}
      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-(--color-subtle-bg) border border-(--color-divider)">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-contain p-1"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-(--color-border)">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight truncate text-(--color-text)">
          {item.name}
        </p>
        <p className="text-xs mt-0.5 text-(--color-muted)">
          {item.presentation}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Qty control */}
          <div className="flex items-center rounded-lg overflow-hidden border border-(--color-input-border)">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-base transition-colors bg-(--color-subtle-bg) text-(--color-text) hover:bg-(--color-border) cursor-pointer"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium text-(--color-text)">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-base transition-colors bg-(--color-subtle-bg) text-(--color-text) hover:bg-(--color-border) cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Precio */}
          <span className="text-sm font-medium text-(--color-text)">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Eliminar */}
      <button
        onClick={() => removeItem(item.variantId)}
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-(--color-muted)/60 hover:text-red-500 cursor-pointer"
        title="Eliminar"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
