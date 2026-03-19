"use client";

import { ProductVariant } from "@/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant;
  onChange: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selected,
  onChange,
}: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div>
      <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
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
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                isActive
                  ? "border-[#E07B2A] bg-[#FFF4EC] text-[#E07B2A] border-2"
                  : isOutOfStock
                    ? "border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)] line-through cursor-not-allowed opacity-50"
                    : "border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] hover:border-[var(--color-border-secondary)] cursor-pointer"
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
