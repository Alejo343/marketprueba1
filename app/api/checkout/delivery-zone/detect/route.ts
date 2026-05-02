import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  try {
    const res = await fetch(`${apiUrl}/checkout/delivery-zone/detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "No se pudo calcular el envío" }, { status: 502 });
  }
}
