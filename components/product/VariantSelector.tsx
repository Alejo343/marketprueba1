"use client";

import { ProductVariant } from "@/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant;
  onChange: (variant: ProductVariant) => void;
}

export default function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div>
      <p className="text-[var(--color-muted)] text-xs font-semibold uppercase tracking-widest mb-3">
        Presentación
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isActive = variant.id === selected.id;
          const isOutOfStock = !variant.in_stock;
          return (
            <button
              key={variant.id}
              onClick={() => !isOutOfStock && onChange(variant)}
              disabled={isOutOfStock}
              className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                  : isOutOfStock
                  ? "border-[var(--color-divider)] text-[var(--color-placeholder)] line-through cursor-not-allowed"
                  : "border-[var(--color-divider)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-text)]"
              }`}
            >
              {variant.presentation}
            </button>
          );
        })}
      </div>
    </div>
  );
}
