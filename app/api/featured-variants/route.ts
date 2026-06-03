import { NextResponse } from "next/server";
import { fetchExcludedProductIds, EXCLUDED_REGION_IDS } from "@/lib/excluded-regions";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get("region_id");

  // Allowed specific region — trust backend directly, no extra filtering needed
  if (regionId && !EXCLUDED_REGION_IDS.includes(Number(regionId))) {
    const url = new URL(`${BASE}/featured-variants`);
    url.searchParams.set("region_id", regionId);
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    const data = await res.json();
    return NextResponse.json(data);
  }

  // No region_id (all regions) — fetch and strip excluded products
  const [variantsRes, excludedIds] = await Promise.all([
    fetch(`${BASE}/featured-variants`, { cache: "no-store" }),
    fetchExcludedProductIds(),
  ]);

  const data = await variantsRes.json();
  const filtered = (data.data ?? []).filter(
    (v: { product_id: number }) => !excludedIds.has(v.product_id),
  );

  return NextResponse.json({ ...data, data: filtered });
}
