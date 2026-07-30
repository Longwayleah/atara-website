import { NextResponse } from "next/server";
import {
  LoyaltyStoreUnavailableError,
  processLoyaltyPayment,
} from "@/lib/loyalty/process-payment";
import { resolvePaymentCustomerEmail } from "@/lib/square/client";
import {
  parseSquarePaymentEvent,
  verifySquareWebhookSignature,
} from "@/lib/square/webhook";

export async function POST(request: Request) {
  const body = await request.text();
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim();
  const notificationUrl =
    process.env.SQUARE_WEBHOOK_NOTIFICATION_URL?.trim() ||
    "https://archonpeptide.com/api/square/webhook";

  if (signatureKey) {
    const signature = request.headers.get("x-square-hmacsha256-signature");
    const valid = verifySquareWebhookSignature({
      body,
      signatureHeader: signature,
      signatureKey,
      notificationUrl,
    });

    if (!valid) {
      console.error("[square-webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[square-webhook] SQUARE_WEBHOOK_SIGNATURE_KEY is not set");
    return NextResponse.json(
      { error: "Webhook verification is not configured" },
      { status: 503 },
    );
  }

  const payment = parseSquarePaymentEvent(body);
  if (!payment) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const email =
    payment.email ||
    (await resolvePaymentCustomerEmail({
      paymentId: payment.paymentId,
      emailFromEvent: payment.email,
      orderId: payment.orderId,
      customerId: payment.customerId,
    }));

  if (!email) {
    console.warn(
      "[square-webhook] COMPLETED payment without resolvable email",
      payment.paymentId,
    );
    return NextResponse.json({
      ok: true,
      ignored: true,
      reason: "no_email",
      paymentId: payment.paymentId,
    });
  }

  try {
    const result = await processLoyaltyPayment({
      email,
      paymentId: payment.paymentId,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof LoyaltyStoreUnavailableError) {
      console.error("[square-webhook] Loyalty store unavailable");
      return NextResponse.json(
        { error: "Loyalty store is not configured" },
        { status: 503 },
      );
    }

    console.error("[square-webhook]", error);
    return NextResponse.json(
      { error: "Failed to process loyalty payment" },
      { status: 500 },
    );
  }
}
