import { NextResponse } from "next/server";

const WOMPI_API = process.env.WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

export const revalidate = 3600;

export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!publicKey) {
    return NextResponse.json({ error: "Configuración de pagos incompleta" }, { status: 500 });
  }

  const res = await fetch(`${WOMPI_API}/pse/financial_institutions`, {
    headers: { Authorization: `Bearer ${publicKey}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "No se pudo obtener la lista de bancos" }, { status: 502 });
  }

  const { data } = await res.json();
  const institutions = (data as Array<{ financial_institution_code: string; financial_institution_name: string }>).map((i) => ({
    code: i.financial_institution_code,
    name: i.financial_institution_name,
  }));

  return NextResponse.json({ institutions });
}
