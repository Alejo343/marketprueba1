"use client";

import { useState, useEffect } from "react";
import type { ProductVariant } from "@/types";
import { getFeaturedVariants } from "@/lib/api";
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
  const [featuredVariants, setFeaturedVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    fetch("/api/product-variants")
      .then((r) => r.json())
      .then((res) => setLatestVariants((res.data ?? []).slice(0, 8)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getFeaturedVariants(8)
      .then(setFeaturedVariants)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-(--color-bg) pt-30" style={{ fontFamily: "var(--font-inter)" }}>
      <Header />
      <HeroSection />
      <TrustBar />
      <PromoBanners />
      <RegionsGrid />
      <FeaturedProducts variants={featuredVariants} />
      <LatestProducts variants={latestVariants} />
      <BottomCTA />
      <HomeFooter />
    </div>
  );
}
