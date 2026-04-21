import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const WOMPI_API = process.env.WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

function generateReference() {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BARRIL-NQ-${Date.now()}-${rand}`;
}

async function getAcceptanceTokens(publicKey: string) {
  const res = await fetch(`${WOMPI_API}/merchants/${publicKey}`);
  if (!res.ok) throw new Error("No se pudieron obtener los tokens de aceptación");
  const { data } = await res.json();
  return {
    acceptance_token: data.presigned_acceptance.acceptance_token as string,
    accept_personal_auth: data.presigned_personal_data_auth.acceptance_token as string,
  };
}

export async function POST(req: NextRequest) {
  const { phone, amountInCents, customerEmail } = await req.json();

  if (!phone || !amountInCents || !customerEmail) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const privateKey = process.env.WOMPI_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

  if (!privateKey || !publicKey || !integritySecret) {
    return NextResponse.json({ error: "Configuración de pagos incompleta" }, { status: 500 });
  }

  const reference = generateReference();
  const raw = `${reference}${amountInCents}COP${integritySecret}`;
  const signature = createHash("sha256").update(raw).digest("hex");

  let acceptance_token: string, accept_personal_auth: string;
  try {
    ({ acceptance_token, accept_personal_auth } = await getAcceptanceTokens(publicKey));
  } catch {
    return NextResponse.json({ error: "Error al obtener tokens de aceptación" }, { status: 502 });
  }

  const txRes = await fetch(`${WOMPI_API}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${privateKey}`,
    },
    body: JSON.stringify({
      acceptance_token,
      accept_personal_auth,
      amount_in_cents: amountInCents,
      currency: "COP",
      signature,
      customer_email: customerEmail,
      reference,
      payment_method: {
        type: "NEQUI",
        phone_number: phone,
      },
    }),
  });

  if (!txRes.ok) {
    const errData = await txRes.json().catch(() => ({}));
    console.error("Wompi Nequi error:", errData);
    const msg =
      errData?.error?.messages?.phone_number?.[0] ??
      errData?.error?.message ??
      "Error al crear el pago con Nequi";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const txData = await txRes.json();
  return NextResponse.json({
    transactionId: txData.data.id as string,
    reference,
    status: txData.data.status as string,
  });
}
