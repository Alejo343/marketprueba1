import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { reference, amountInCents } = await req.json();

  if (!reference || !amountInCents) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const secret = process.env.WOMPI_INTEGRITY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }

  // Wompi integrity signature: SHA256(reference + amountInCents + "COP" + integritySecret)
  const raw = `${reference}${amountInCents}COP${secret}`;
  const signature = createHash("sha256").update(raw).digest("hex");

  return NextResponse.json({ signature });
}
