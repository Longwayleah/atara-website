import { createHmac, timingSafeEqual } from "node:crypto";

type SquarePayment = {
  id?: string;
  status?: string;
  buyer_email_address?: string;
  receipt_email?: string;
  order_id?: string;
  customer_id?: string;
};

type SquareWebhookEvent = {
  type?: string;
  data?: {
    type?: string;
    object?: {
      payment?: SquarePayment;
    };
  };
};

export function verifySquareWebhookSignature({
  body,
  signatureHeader,
  signatureKey,
  notificationUrl,
}: {
  body: string;
  signatureHeader: string | null;
  signatureKey: string;
  notificationUrl: string;
}) {
  if (!signatureHeader) {
    return false;
  }

  const payload = notificationUrl + body;
  const digest = createHmac("sha256", signatureKey).update(payload).digest("base64");

  try {
    return timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(signatureHeader),
    );
  } catch {
    return false;
  }
}

export function parseSquarePaymentEvent(body: string) {
  let event: SquareWebhookEvent;

  try {
    event = JSON.parse(body) as SquareWebhookEvent;
  } catch {
    return null;
  }

  if (
    event.type !== "payment.updated" &&
    event.type !== "payment.created"
  ) {
    return null;
  }

  const payment = event.data?.object?.payment;
  if (!payment?.id || payment.status !== "COMPLETED") {
    return null;
  }

  const email =
    payment.buyer_email_address?.trim().toLowerCase() ||
    payment.receipt_email?.trim().toLowerCase() ||
    "";

  return {
    paymentId: payment.id,
    email: email.includes("@") ? email : "",
    orderId: payment.order_id || null,
    customerId: payment.customer_id || null,
    eventType: event.type,
  };
}
