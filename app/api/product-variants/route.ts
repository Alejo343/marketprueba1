import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product-variants?include=product.brand`,
    { next: { revalidate: 300 } },
  );
  const data = await res.json();
  return NextResponse.json(data);
}
