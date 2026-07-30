import { readWelcomeEmail } from "@/config/welcome";

/** @deprecated Protocol Clearance removed — resolves immediately if an email exists. */
export function ensureCheckoutEmail(): Promise<string> {
  const existing =
    typeof window !== "undefined" ? readWelcomeEmail() : null;
  if (existing) return Promise.resolve(existing);
  return Promise.resolve("");
}

/** @deprecated Protocol Clearance removed — no-op. */
export function completeCheckoutEmailGate(_email: string) {
  // no-op
}

/**
 * Optional cart email capture → Square Payment Link.
 * Protocol Clearance has been removed; checkout is ungated.
 */
export async function captureCartEmail(input: {
  email: string;
  paymentLinkUrl: string;
  cartLabel?: string;
}) {
  try {
    const response = await fetch("/api/cart-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        payment_link_url: input.paymentLinkUrl,
        cart_label: input.cartLabel,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      console.error("[cart-capture]", data.error ?? response.status);
    }
  } catch (error) {
    console.error("[cart-capture]", error);
  }
}

/**
 * Open Square checkout directly (no Protocol Clearance gate).
 * If a prior email exists on device, capture it without blocking checkout.
 */
export async function openGatedCheckout(options: {
  url: string;
  cartLabel?: string;
  mode?: "navigate" | "tab";
}) {
  const email =
    typeof window !== "undefined" ? readWelcomeEmail() : null;

  if (email) {
    await captureCartEmail({
      email,
      paymentLinkUrl: options.url,
      cartLabel: options.cartLabel,
    });
  }

  if (options.mode === "tab") {
    window.open(options.url, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = options.url;
}
