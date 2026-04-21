"use client";

import { useState } from "react";
import { Media } from "@/types";

interface ProductGalleryProps {
  images: Media[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => (a.pivot?.order ?? 0) - (b.pivot?.order ?? 0));
  const [selected, setSelected] = useState<Media | null>(sorted[0] ?? null);

  if (sorted.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-[var(--color-surface)] border border-[var(--color-primary)]/10 flex items-center justify-center">
        <span className="text-[var(--color-primary)]/20 text-8xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>B</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-28">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-subtle-bg)] border border-[var(--color-primary)]/10">
        {selected ? (
          <img
            src={selected.url}
            alt={selected.alt || productName}
            className="w-full h-full object-contain p-6"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[var(--color-primary)]/20 text-8xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>B</span>
          </div>
        )}

        {/* Counter badge */}
        {sorted.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-[var(--color-surface)]/80 backdrop-blur-sm border border-[var(--color-primary)]/20 rounded-lg px-2.5 py-1 text-[10px] text-[var(--color-muted)] font-medium">
            {sorted.indexOf(selected!) + 1} / {sorted.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {sorted.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                selected?.id === img.id
                  ? "border-[var(--color-primary)] shadow-[0_0_14px_rgba(201,168,76,0.3)]"
                  : "border-[var(--color-divider)] hover:border-[var(--color-primary)]/40 bg-[var(--color-subtle-bg)]"
              }`}
            >
              <img src={img.url} alt={img.alt || productName} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
