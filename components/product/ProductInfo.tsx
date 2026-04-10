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
    <div className="flex flex-col gap-6">
      {/* Nombre */}
      <h1 className="text-[2rem] font-bold text-[#171717] leading-tight uppercase tracking-wide">
        {product.name}
      </h1>

      {/* Marca + tipo de venta */}
      <div className="flex items-center gap-3 flex-wrap">
        {product.brand ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E07B2A">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {product.brand.name}
          </span>
        ) : (
          <span className="text-sm text-[#64748b]">Sin marca</span>
        )}
        <span className="text-sm text-[#64748b]">
          {product.sale_type_label}
        </span>
      </div>

      {/* Descripción */}
      {product.description && (
        <p className="text-sm text-[#64748b] leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="h-px bg-[#e5e7eb]" />

      {/* Selector de variantes */}
      <VariantSelector
        variants={variants}
        selected={selected}
        onChange={handleVariantChange}
      />

      {/* Cantidad */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-[#171717] uppercase tracking-wider">
          Qty:
        </span>
        <span className="text-sm font-bold text-[#171717] w-4">{qty}</span>
        <QtyControl
          value={qty}
          onChange={setQty}
          min={1}
          max={selected.stock}
        />
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2 text-xs text-[#64748b]">
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

      {/* Precio */}
      <div className="flex items-baseline justify-end gap-3 flex-wrap pt-2">
        {selected.has_sale && selected.sale_price && (
          <>
            <span className="text-sm text-[#9ca3af] line-through">
              {formatPrice(selected.price)}
            </span>
            {discount && (
              <span className="text-xs bg-[#FFF4EC] text-[#E07B2A] px-2 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </>
        )}
        <span className="text-[2.2rem] font-bold text-[#171717]">
          {formatPrice(selected.final_price)}
        </span>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => setIsFav(!isFav)}
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white hover:border-[#E07B2A] transition-colors"
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFav ? "#E07B2A" : "none"}
            stroke={isFav ? "#E07B2A" : "#64748b"}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button
          onClick={handleAddToCart}
          disabled={!selected.in_stock}
          className={`flex-1 h-12 rounded-lg text-sm font-bold tracking-widest uppercase transition-all ${
            !selected.in_stock
              ? "bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed"
              : "bg-[#E07B2A] hover:bg-[#C96A1A] text-white"
          }`}
        >
          {!selected.in_stock ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
