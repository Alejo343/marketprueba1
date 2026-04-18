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
      <p className="text-[#9A8C7A] text-xs font-semibold uppercase tracking-widest mb-3">
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
                  ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] font-semibold"
                  : isOutOfStock
                  ? "border-[#1E1E1E] text-[#444] line-through cursor-not-allowed"
                  : "border-[#1E1E1E] bg-[#111111] text-[#9A8C7A] hover:border-[#C9A84C]/40 hover:text-[#F5F0E8]"
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
