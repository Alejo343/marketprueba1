import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get("region_id");

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-products`,
  );
  if (regionId) url.searchParams.set("region_id", regionId);

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  const data = await res.json();
  return NextResponse.json(data);
}
