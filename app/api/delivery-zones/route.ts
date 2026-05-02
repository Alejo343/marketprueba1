import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  try {
    const res = await fetch(`${apiUrl}/delivery-zones`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "No se pudieron cargar las zonas" }, { status: 502 });
  }
}
