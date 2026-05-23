"use client";

import { useState, useEffect } from "react";
import type { ProductVariant } from "@/types";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import PromoBanners from "@/components/home/PromoBanners";
import RegionsGrid from "@/components/home/RegionsGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LatestProducts from "@/components/home/LatestProducts";
import BottomCTA from "@/components/home/BottomCTA";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  const [latestVariants, setLatestVariants] = useState<ProductVariant[]>([]);

  const EXCLUDED_REGION_IDS = [47, 39];

  useEffect(() => {
    fetch("/api/product-variants")
      .then((r) => r.json())
      .then((res) => {
        const filtered = (res.data ?? []).filter(
          (v: ProductVariant) => !EXCLUDED_REGION_IDS.includes(v.product?.region_id ?? -1),
        );
        setLatestVariants(filtered.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="min-h-screen bg-(--color-bg)"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Header />
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <PromoBanners />
      <RegionsGrid />
      <LatestProducts variants={latestVariants} />
      <BottomCTA />
      <HomeFooter />
    </div>
  );
}
