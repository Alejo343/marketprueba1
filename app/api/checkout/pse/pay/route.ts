import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const WOMPI_API = process.env.WOMPI_API_URL ?? "https://sandbox.wompi.co/v1";

function generateReference() {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BARRIL-PSE-${Date.now()}-${rand}`;
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

async function pollAsyncPaymentUrl(transactionId: string, privateKey: string) {
  const start = Date.now();
  while (Date.now() - start < 25_000) {
    const res = await fetch(`${WOMPI_API}/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${privateKey}` },
      cache: "no-store",
    });
    if (res.ok) {
      const { data } = await res.json();
      const url = data?.payment_method?.extra?.async_payment_url;
      if (url) return url as string;
      if (["DECLINED", "ERROR", "VOIDED"].includes(data?.status)) {
        throw new Error(data?.status_message || "Transacción rechazada");
      }
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("Tiempo agotado esperando la URL de pago PSE");
}

export async function POST(req: NextRequest) {
  const {
    amountInCents,
    customerEmail,
    fullName,
    phone,
    userType,
    userLegalIdType,
    userLegalId,
    financialInstitutionCode,
    paymentDescription,
    redirectUrl,
  } = await req.json();

  if (
    !amountInCents ||
    !customerEmail ||
    !fullName ||
    !phone ||
    userType === undefined ||
    !userLegalIdType ||
    !userLegalId ||
    !financialInstitutionCode ||
    !redirectUrl
  ) {
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

  const description = String(paymentDescription || `Pago a Barril Market, ref: ${reference}`).slice(0, 64);

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
      redirect_url: redirectUrl,
      payment_method: {
        type: "PSE",
        user_type: Number(userType),
        user_legal_id_type: userLegalIdType,
        user_legal_id: userLegalId,
        financial_institution_code: financialInstitutionCode,
        payment_description: description,
      },
      customer_data: {
        phone_number: phone,
        full_name: fullName,
      },
    }),
  });

  if (!txRes.ok) {
    const errData = await txRes.json().catch(() => ({}));
    console.error("Wompi PSE error:", errData);
    const msg =
      errData?.error?.messages?.payment_method?.[0] ??
      errData?.error?.reason ??
      errData?.error?.message ??
      "Error al crear el pago con PSE";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const txData = await txRes.json();
  const transactionId = txData.data.id as string;

  try {
    const asyncUrl = await pollAsyncPaymentUrl(transactionId, privateKey);
    return NextResponse.json({
      transactionId,
      reference,
      asyncPaymentUrl: asyncUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "No se pudo obtener URL de PSE" },
      { status: 502 }
    );
  }
}
