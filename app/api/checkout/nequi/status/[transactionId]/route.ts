import { NextRequest, NextResponse } from "next/server";

const WOMPI_API = process.env.WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  const { transactionId } = await params;
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;

  const res = await fetch(`${WOMPI_API}/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${publicKey}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "No se pudo verificar la transacción" }, { status: 502 });
  }

  const { data } = await res.json();
  return NextResponse.json({
    status: data.status as string,
    statusMessage: (data.status_message ?? "") as string,
  });
}
