"use client";

import { useState, useRef } from "react";
import { ProductVariant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useAddToCartAnimation } from "@/hooks/useAddToCartAnimation";
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

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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

const DISCLAIMER =
  "Prohíbase el expendio de bebidas embriagantes a menores de edad (Ley 124 de 1994). El exceso de alcohol es perjudicial para la salud (Ley 30 de 1986). Los productos con nicotina contienen sustancias altamente adictivas y su venta está restringida exclusivamente a mayores de 18 años. Al navegar en este sitio web usted acepta nuestros Términos y Condiciones y confirma que es mayor de edad.";

interface ProductInfoProps {
  variants: ProductVariant[];
  showDisclaimer?: boolean;
}

export default function ProductInfo({ variants, showDisclaimer }: ProductInfoProps) {
  const [selected, setSelected] = useState<ProductVariant>(variants[0]);
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, updateQuantity, openCart } = useCartStore();
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const triggerAnimation = useAddToCartAnimation();

  const product = selected.product;
  const discount =
    selected.has_sale && selected.sale_price
      ? Math.round((1 - selected.sale_price / selected.price) * 100)
      : null;
  const isWhatsAppOnly = selected.sku?.startsWith("VS") ?? false;

  function handleVariantChange(variant: ProductVariant) {
    setSelected(variant);
    setQty(1);
  }

  function handleAddToCart() {
    triggerAnimation(addBtnRef.current);
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
            <span className="text-(--color-primary) text-[10px] font-bold uppercase tracking-widest">
              {product.brand.name}
            </span>
            <span className="w-px h-3 bg-(--color-primary)/20" />
          </>
        ) : null}
        <span className="text-(--color-muted) text-[10px] uppercase tracking-wider">
          {product.sale_type_label}
        </span>
      </div>

      {/* Product name */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-(--color-text) leading-tight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {product.name}
      </h1>

      {/* Gold divider */}
      <div className="h-px bg-linear-to-r from-(--color-primary)/40 via-(--color-primary)/10 to-transparent" />

      {/* Price */}
      {isWhatsAppOnly ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="text-4xl font-bold text-(--color-primary)"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {fmt(selected.final_price)}
            </span>
            <span className="text-(--color-muted) text-sm">/ gramo</span>
          </div>
          <span className="text-(--color-muted) text-xs">
            Precio por gramo, el valor final depende del corte y peso
          </span>
        </div>
      ) : (
        <div className="flex items-baseline gap-3 flex-wrap">
          <span
            className="text-4xl font-bold text-(--color-primary)"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {fmt(selected.final_price)}
          </span>
          {selected.has_sale && selected.sale_price && (
            <>
              <span className="text-(--color-muted) text-lg line-through">{fmt(selected.price)}</span>
              {discount && (
                <span className="bg-(--color-primary) text-(--color-on-primary) text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>
      )}

      {/* Description */}
      {product.description && (
        <p className="text-(--color-muted) text-sm leading-relaxed">{product.description}</p>
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
      {isWhatsAppOnly ? (
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/573155927944?text=${encodeURIComponent(`Hola, estoy interesado en *${product.name}*. ¿Qué cortes tienen disponibles actualmente y cuáles son sus precios?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_28px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon /> Consultar por WhatsApp
          </a>
          <p className="text-(--color-muted) text-xs text-center">
            Este producto requiere consulta previa con la tienda
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <QtyControl value={qty} onChange={setQty} min={1} max={selected.stock} />
          <button
            ref={addBtnRef}
            onClick={handleAddToCart}
            disabled={!selected.in_stock}
            className={`flex-1 h-12 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
              !selected.in_stock
                ? "bg-(--color-subtle-bg) text-(--color-placeholder) cursor-not-allowed"
                : added
                ? "bg-emerald-700 text-white"
                : "bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-on-primary) shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_28px_rgba(201,168,76,0.35)]"
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
                ? "border-(--color-primary) bg-(--color-primary)/10 text-(--color-primary)"
                : "border-(--color-divider) bg-(--color-on-primary) text-(--color-muted) hover:border-(--color-primary)/40 hover:text-(--color-primary)"
            }`}
            aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <HeartIcon filled={isFav} />
          </button>
        </div>
      )}

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          { icon: <ShieldIcon />, label: "Pago seguro" },
          { icon: <TruckIcon />, label: "Envío rápido" },
          { icon: <RefreshIcon />, label: "Devoluciones" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1.5 bg-(--color-surface) border border-(--color-divider) rounded-xl py-3"
          >
            <span className="text-(--color-primary)/60">{item.icon}</span>
            <span className="text-(--color-muted) text-[10px] font-medium text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* SKU */}
      {selected.sku && (
        <p className="text-(--color-placeholder) text-xs">SKU: {selected.sku}</p>
      )}

      {/* Disclaimer legal */}
      {showDisclaimer && (
        <div
          className="rounded-xl px-4 py-3.5 flex gap-3 items-start"
          style={{
            background: "rgba(201,168,76,0.04)",
            border: "1px solid rgba(201,168,76,0.18)",
          }}
        >
          <svg
            className="shrink-0 mt-0.5"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[10px] leading-relaxed" style={{ color: "rgba(154,140,122,0.85)" }}>
            {DISCLAIMER}
          </p>
        </div>
      )}
    </div>
  );
}
