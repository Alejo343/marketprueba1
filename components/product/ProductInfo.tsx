"use client";

import { useState } from "react";
import { ProductVariant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import VariantSelector from "./VariantSelector";
import QtyControl from "./QtyControl";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface ProductInfoProps {
  variants: ProductVariant[];
}

export default function ProductInfo({ variants }: ProductInfoProps) {
  const [selected, setSelected] = useState<ProductVariant>(variants[0]);
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);

  const { addItem, openCart } = useCartStore();

  const product = selected.product;
  const discount =
    selected.has_sale && selected.sale_price
      ? Math.round((1 - selected.sale_price / selected.price) * 100)
      : null;

  function handleVariantChange(variant: ProductVariant) {
    setSelected(variant);
    setQty(1);
  }

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem({
        variantId: selected.id,
        productId: selected.product_id,
        name: product.name,
        presentation: selected.presentation,
        price: selected.final_price,
        image: selected.primary_image?.url ?? null,
      });
    }
    openCart();
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Nombre */}
      <h1 className="text-2xl font-medium text-[var(--color-text-primary)] leading-snug">
        {product.name}
      </h1>

      {/* Marca + tipo de venta */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.brand ? (
          <span className="inline-flex items-center gap-1.5 bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] rounded-full px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[#E07B2A]" />
            {product.brand.name}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] rounded-full px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-border-secondary)]" />
            Sin marca
          </span>
        )}
        <span className="inline-flex items-center bg-[var(--color-background-info)] text-[var(--color-text-info)] rounded-full px-3 py-1 text-xs">
          {product.sale_type_label}
        </span>
      </div>

      {/* Descripción */}
      {product.description && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="h-px bg-[var(--color-border-tertiary)]" />

      {/* Selector de variantes */}
      <VariantSelector
        variants={variants}
        selected={selected}
        onChange={handleVariantChange}
      />

      {/* Precio */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl font-medium text-[var(--color-text-primary)]">
          {formatPrice(selected.final_price)}
        </span>
        {selected.has_sale && selected.sale_price && (
          <>
            <span className="text-base text-[var(--color-text-tertiary)] line-through">
              {formatPrice(selected.price)}
            </span>
            {discount && (
              <span className="text-xs bg-[#FFF4EC] text-[#E07B2A] px-2 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Cantidad */}
      <div>
        <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Cantidad
        </p>
        <QtyControl
          value={qty}
          onChange={setQty}
          min={1}
          max={selected.stock}
        />
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            !selected.in_stock
              ? "bg-[#A32D2D]"
              : selected.low_stock
                ? "bg-[#BA7517]"
                : "bg-[#3B6D11]"
          }`}
        />
        {!selected.in_stock
          ? "Sin stock"
          : selected.low_stock
            ? `Poco stock — quedan ${selected.stock} unidades`
            : `En stock (${selected.stock} disponibles)`}
      </div>

      {/* Botones */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setIsFav(!isFav)}
          className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-background-primary)] hover:border-[#E07B2A] transition-colors"
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFav ? "#E07B2A" : "none"}
            stroke={isFav ? "#E07B2A" : "var(--color-text-secondary)"}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button
          onClick={handleAddToCart}
          disabled={!selected.in_stock}
          className={`flex-1 h-11 rounded-lg text-sm font-medium transition-all ${
            !selected.in_stock
              ? "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] cursor-not-allowed"
              : "bg-[#E07B2A] hover:bg-[#C96A1A] text-white"
          }`}
        >
          {!selected.in_stock ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
