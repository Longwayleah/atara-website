/** Minimal Square REST helpers for loyalty email enrichment. */

function squareBaseUrl() {
  return process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

function squareHeaders() {
  const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Square-Version": "2025-01-23",
    "Content-Type": "application/json",
  } as const;
}

export function isSquareApiConfigured() {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN?.trim());
}

export async function retrieveSquarePayment(paymentId: string) {
  const headers = squareHeaders();
  if (!headers) return null;
  const res = await fetch(`${squareBaseUrl()}/v2/payments/${paymentId}`, {
    headers,
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { payment?: Record<string, unknown> };
  return data.payment ?? null;
}

export async function retrieveSquareOrder(orderId: string) {
  const headers = squareHeaders();
  if (!headers) return null;
  const res = await fetch(`${squareBaseUrl()}/v2/orders/${orderId}`, {
    headers,
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { order?: Record<string, unknown> };
  return data.order ?? null;
}

export async function retrieveSquareCustomer(customerId: string) {
  const headers = squareHeaders();
  if (!headers) return null;
  const res = await fetch(`${squareBaseUrl()}/v2/customers/${customerId}`, {
    headers,
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { customer?: Record<string, unknown> };
  return data.customer ?? null;
}

function emailFromOrder(order: Record<string, unknown> | null) {
  if (!order) return null;
  const fulfillments = (order.fulfillments as Array<Record<string, unknown>>) || [];
  for (const fulfillment of fulfillments) {
    const shipment = fulfillment.shipment_details as
      | { recipient?: { email_address?: string } }
      | undefined;
    const pickup = fulfillment.pickup_details as
      | { recipient?: { email_address?: string } }
      | undefined;
    const email =
      shipment?.recipient?.email_address?.trim() ||
      pickup?.recipient?.email_address?.trim();
    if (email?.includes("@")) return email.toLowerCase();
  }
  return null;
}

/**
 * Payment Link webhooks often omit buyer_email_address.
 * Resolve email from payment fields → order fulfillments → customer profile.
 */
export async function resolvePaymentCustomerEmail(input: {
  paymentId: string;
  emailFromEvent?: string | null;
  orderId?: string | null;
  customerId?: string | null;
}) {
  const fromEvent = input.emailFromEvent?.trim().toLowerCase();
  if (fromEvent?.includes("@")) return fromEvent;

  const payment = await retrieveSquarePayment(input.paymentId);
  if (payment) {
    const direct =
      (typeof payment.buyer_email_address === "string" &&
        payment.buyer_email_address.trim()) ||
      (typeof payment.receipt_email === "string" &&
        payment.receipt_email.trim()) ||
      "";
    if (direct.includes("@")) return direct.toLowerCase();
  }

  const orderId =
    input.orderId ||
    (typeof payment?.order_id === "string" ? payment.order_id : null);
  if (orderId) {
    const order = await retrieveSquareOrder(orderId);
    const fromOrder = emailFromOrder(order);
    if (fromOrder) return fromOrder;
  }

  const customerId =
    input.customerId ||
    (typeof payment?.customer_id === "string" ? payment.customer_id : null);
  if (customerId) {
    const customer = await retrieveSquareCustomer(customerId);
    const email =
      typeof customer?.email_address === "string"
        ? customer.email_address.trim().toLowerCase()
        : "";
    if (email.includes("@")) return email;
  }

  return null;
}
