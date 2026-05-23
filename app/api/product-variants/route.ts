import { NextResponse } from "next/server";
import { fetchExcludedProductIds, EXCLUDED_REGION_IDS } from "@/lib/excluded-regions";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const [variantsRes, excludedIds] = await Promise.all([
    fetch(`${BASE}/product-variants?include=product`, { cache: "no-store" }),
    fetchExcludedProductIds(),
  ]);

  const data = await variantsRes.json();
  const filtered = (data.data ?? []).filter(
    (v: { product_id: number }) => !excludedIds.has(v.product_id),
  );

  return NextResponse.json(
    { ...data, data: filtered },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } },
  );
}
