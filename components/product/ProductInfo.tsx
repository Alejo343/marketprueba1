"use client";

import { useState } from "react";
import { ProductVariant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import VariantSelector from "./VariantSelector";
import QtyControl from "./QtyControl";

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill={filled ? "var(--color-primary)" : "none"}
    stroke={filled ? "var(--color-primary)" : "currentColor"}
    strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10" />
    <polyline points="23 20 23 14 17 14" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

interface ProductInfoProps {
  variants: ProductVariant[];
}

export default function ProductInfo({ variants }: ProductInfoProps) {
  const [selected, setSelected] = useState<ProductVariant>(variants[0]);
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, updateQuantity, openCart } = useCartStore();

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
    addItem({
      variantId: selected.id,
      productId: selected.product_id,
      name: product.name,
      presentation: selected.presentation,
      price: selected.final_price,
      image: selected.primary_image?.url ?? null,
    });
    if (qty > 1) updateQuantity(selected.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  }

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Brand + type */}
      <div className="flex items-center gap-2">
        {product.brand ? (
          <>
            <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest">
              {product.brand.name}
            </span>
            <span className="w-px h-3 bg-[var(--color-primary)]/20" />
          </>
        ) : null}
        <span className="text-[var(--color-muted)] text-[10px] uppercase tracking-wider">
          {product.sale_type_label}
        </span>
      </div>

      {/* Product name */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {product.name}
      </h1>

      {/* Gold divider */}
      <div className="h-px bg-linear-to-r from-[var(--color-primary)]/40 via-[var(--color-primary)]/10 to-transparent" />

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className="text-4xl font-bold text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {fmt(selected.final_price)}
        </span>
        {selected.has_sale && selected.sale_price && (
          <>
            <span className="text-[var(--color-muted)] text-lg line-through">{fmt(selected.price)}</span>
            {discount && (
              <span className="bg-[var(--color-primary)] text-[var(--color-on-primary)] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-[var(--color-muted)] text-sm leading-relaxed">{product.description}</p>
      )}

      {/* Variant selector */}
      <VariantSelector variants={variants} selected={selected} onChange={handleVariantChange} />

      {/* Stock indicator */}
      <div className="flex items-center gap-2 text-xs">
        <span className={`w-2 h-2 rounded-full shrink-0 ${
          !selected.in_stock ? "bg-red-500" : selected.low_stock ? "bg-amber-400" : "bg-emerald-400"
        }`} />
        <span className={
          !selected.in_stock ? "text-red-400" : selected.low_stock ? "text-amber-400" : "text-emerald-400"
        }>
          {!selected.in_stock
            ? "Sin stock"
            : selected.low_stock
            ? `Últimas unidades — ${selected.stock} disponibles`
            : `En stock (${selected.stock} disponibles)`}
        </span>
      </div>

      {/* Qty + CTA */}
      <div className="flex items-center gap-3">
        <QtyControl value={qty} onChange={setQty} min={1} max={selected.stock} />
        <button
          onClick={handleAddToCart}
          disabled={!selected.in_stock}
          className={`flex-1 h-12 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            !selected.in_stock
              ? "bg-[var(--color-subtle-bg)] text-[var(--color-placeholder)] cursor-not-allowed"
              : added
              ? "bg-emerald-700 text-white"
              : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_28px_rgba(201,168,76,0.35)]"
          }`}
        >
          {added ? (
            <><CheckIcon /> ¡Agregado!</>
          ) : (
            <><CartIcon /> {!selected.in_stock ? "Sin stock" : "Agregar al carrito"}</>
          )}
        </button>
        <button
          onClick={() => setIsFav(!isFav)}
          className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
            isFav
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "border-[var(--color-divider)] bg-[var(--color-on-primary)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
          }`}
          aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          { icon: <ShieldIcon />, label: "Pago seguro" },
          { icon: <TruckIcon />, label: "Envío rápido" },
          { icon: <RefreshIcon />, label: "Devoluciones" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1.5 bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-xl py-3"
          >
            <span className="text-[var(--color-primary)]/60">{item.icon}</span>
            <span className="text-[var(--color-muted)] text-[10px] font-medium text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* SKU */}
      {selected.sku && (
        <p className="text-[var(--color-placeholder)] text-xs">SKU: {selected.sku}</p>
      )}
    </div>
  );
}
