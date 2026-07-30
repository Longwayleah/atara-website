import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies checkout email captures to Archon Super Bot so the browser never
 * needs WELCOME_FORM_SECRET. Storefront is always archon.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      payment_link_url?: string;
      cart_label?: string;
    };

    const email = body.email?.trim().toLowerCase() ?? "";
    const paymentLinkUrl = body.payment_link_url?.trim() ?? "";

    if (!email.includes("@") || !paymentLinkUrl) {
      return NextResponse.json(
        { error: "email and payment_link_url are required" },
        { status: 400 },
      );
    }

    const superbotUrl = process.env.ARCHON_SUPERBOT_URL?.trim();
    const secret = process.env.WELCOME_FORM_SECRET?.trim();

    if (!superbotUrl) {
      console.error("[cart-capture] ARCHON_SUPERBOT_URL is not set");
      return NextResponse.json(
        { error: "Cart capture is not configured" },
        { status: 503 },
      );
    }

    const response = await fetch(
      `${superbotUrl.replace(/\/$/, "")}/api/cart-capture`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          storefront: "archon",
          payment_link_url: paymentLinkUrl,
          cart_label: body.cart_label?.trim() || undefined,
          source: "archon_checkout_gate",
          secret,
          metadata: {
            site: "archonpeptide.com",
            origin: request.headers.get("origin"),
            user_agent: request.headers.get("user-agent"),
          },
        }),
      },
    );

    const data = (await response.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error ?? "Failed to capture email" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("[cart-capture]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to capture" },
      { status: 500 },
    );
  }
}
