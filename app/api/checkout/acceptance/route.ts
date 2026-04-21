import { NextResponse } from "next/server";

const WOMPI_API = process.env.WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

export const revalidate = 3600;

export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!publicKey) {
    return NextResponse.json({ error: "Configuración de pagos incompleta" }, { status: 500 });
  }

  const res = await fetch(`${WOMPI_API}/merchants/${publicKey}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "No se pudieron obtener los términos" }, { status: 502 });
  }

  const { data } = await res.json();
  return NextResponse.json({
    endUserPolicy: data.presigned_acceptance.permalink as string,
    personalDataAuth: data.presigned_personal_data_auth.permalink as string,
  });
}
