"use client";

import { useCallback } from "react";

export function useAddToCartAnimation() {
  return useCallback((sourceEl: HTMLElement | null) => {
    const target = document.getElementById("header-cart-btn");
    if (!sourceEl || !target) return;

    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const dx = endX - startX;
    const dy = endY - startY;

    const dot = document.createElement("div");
    Object.assign(dot.style, {
      position: "fixed",
      width: "10px",
      height: "10px",
      background: "#C9A84C",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      left: `${startX - 5}px`,
      top: `${startY - 5}px`,
      boxShadow: "0 0 12px rgba(201,168,76,0.8), 0 0 4px rgba(201,168,76,0.5)",
    });
    document.body.appendChild(dot);

    const anim = dot.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx * 0.4}px, ${Math.min(dy * 0.15, -70)}px) scale(1.4)`,
          opacity: 1,
          offset: 0.3,
        },
        { transform: `translate(${dx}px, ${dy}px) scale(0.15)`, opacity: 0.7 },
      ],
      { duration: 580, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );

    anim.onfinish = () => {
      dot.remove();
      target.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.18)" },
          { transform: "scale(0.93)" },
          { transform: "scale(1)" },
        ],
        { duration: 380, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    };
  }, []);
}
