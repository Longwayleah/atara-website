import { NextResponse } from "next/server";
import {
  getLoyaltyPaymentThreshold,
  getLoyaltyRewardCodeLabel,
} from "@/config/loyalty";
import { isLoyaltyStoreConfigured } from "@/lib/loyalty/redis";
import { isSquareApiConfigured } from "@/lib/square/client";

function authorizeStatus(request: Request) {
  const candidates = [
    process.env.LOYALTY_STATUS_SECRET,
    process.env.WELCOME_FORM_SECRET,
    process.env.SQUARE_WEBHOOK_SIGNATURE_KEY,
  ]
    .map((s) => s?.trim())
    .filter(Boolean) as string[];

  if (!candidates.length) return { ok: false as const, reason: "no_server_secret" };

  const urlSecret = new URL(request.url).searchParams.get("secret")?.trim();
  const auth = request.headers.get("authorization")?.trim();
  const bearer = auth?.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";
  const provided = urlSecret || bearer;
  if (!provided) return { ok: false as const, reason: "missing_client_secret" };
  if (!candidates.includes(provided)) {
    return { ok: false as const, reason: "mismatch" };
  }
  return { ok: true as const };
}

/**
 * Ops health check for 5th-order loyalty automation.
 * GET /api/loyalty/status?secret=… or Authorization: Bearer …
 * Accepts LOYALTY_STATUS_SECRET, WELCOME_FORM_SECRET, or SQUARE_WEBHOOK_SIGNATURE_KEY.
 */
export async function GET(request: Request) {
  const auth = authorizeStatus(request);
  if (!auth.ok) {
    return NextResponse.json(
      { error: "Unauthorized", reason: auth.reason },
      { status: 401 },
    );
  }

  const redis = isLoyaltyStoreConfigured();
  const squareApi = isSquareApiConfigured();
  const webhookKey = Boolean(process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim());
  const resend = Boolean(process.env.RESEND_API_KEY?.trim());
  const notificationUrl =
    process.env.SQUARE_WEBHOOK_NOTIFICATION_URL?.trim() ||
    "https://archonpeptide.com/api/square/webhook";

  const ready = redis && webhookKey && resend;

  return NextResponse.json({
    ready,
    threshold: getLoyaltyPaymentThreshold(),
    code: getLoyaltyRewardCodeLabel(),
    checks: {
      redis,
      webhookSignatureKey: webhookKey,
      squareAccessToken: squareApi,
      resendApiKey: resend,
      notificationUrl,
    },
  });
}
