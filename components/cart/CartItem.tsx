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
    <div
      className="flex gap-3 py-4"
      style={{ borderBottom: "1px solid #f0f0f0" }}
    >
      {/* Imagen */}
      <div
        className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden"
        style={{ background: "#f5f5f5", border: "1px solid #e5e5e5" }}
      >
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
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ccc"
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
        <p
          className="text-sm font-medium leading-tight truncate"
          style={{ color: "#1a1a1a" }}
        >
          {item.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#888" }}>
          {item.presentation}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Qty control */}
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid #ddd" }}
          >
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-base transition-colors"
              style={{ background: "#f5f5f5", color: "#1a1a1a" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ebebeb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
            >
              −
            </button>
            <span
              className="w-8 text-center text-sm font-medium"
              style={{ color: "#1a1a1a" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-base transition-colors"
              style={{ background: "#f5f5f5", color: "#1a1a1a" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ebebeb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
            >
              +
            </button>
          </div>

          {/* Precio */}
          <span className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Eliminar */}
      <button
        onClick={() => removeItem(item.variantId)}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
        style={{ color: "#aaa" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e24b4a")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
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
