"use client";

import { useState } from "react";
import Image from "next/image";
import { Media } from "@/types";

interface ProductGalleryProps {
  images: Media[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const sorted = [...images].sort(
    (a, b) => (a.pivot?.order ?? 0) - (b.pivot?.order ?? 0),
  );

  const [selected, setSelected] = useState<Media | null>(sorted[0] ?? null);

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-square rounded-2xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)]">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-border-secondary)"
          strokeWidth="1"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnails verticales */}
      {sorted.length > 1 && (
        <div className="flex flex-col gap-2 w-[70px] flex-shrink-0">
          {sorted.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className={`w-[70px] h-[70px] rounded-lg overflow-hidden border transition-all ${
                selected?.id === img.id
                  ? "border-[#E07B2A] border-2"
                  : "border-[var(--color-border-tertiary)] hover:border-[var(--color-border-secondary)]"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || productName}
                width={70}
                height={70}
                className="w-full h-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagen principal */}
      <div className="flex-1 relative aspect-square rounded-2xl overflow-hidden border border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)]">
        {selected ? (
          <Image
            src={selected.url}
            alt={selected.alt || productName}
            fill
            className="object-contain p-4"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-border-secondary)"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
