import { getLoyaltyRedis } from "@/lib/loyalty/redis";

const PAYMENT_TTL_SECONDS = 60 * 60 * 24 * 365;

function paymentKey(paymentId: string) {
  return `loyalty:payment:${paymentId}`;
}

function countKey(email: string) {
  return `loyalty:count:${email.toLowerCase()}`;
}

export class LoyaltyStoreUnavailableError extends Error {
  constructor() {
    super("Loyalty store is not configured.");
    this.name = "LoyaltyStoreUnavailableError";
  }
}

/** Returns null when this payment was already processed. */
export async function recordCompletedPayment({
  email,
  paymentId,
}: {
  email: string;
  paymentId: string;
}) {
  const redis = getLoyaltyRedis();
  if (!redis) {
    throw new LoyaltyStoreUnavailableError();
  }

  const normalizedEmail = email.trim().toLowerCase();
  const wasNew = await redis.set(paymentKey(paymentId), normalizedEmail, {
    nx: true,
    ex: PAYMENT_TTL_SECONDS,
  });

  if (wasNew !== "OK") {
    return null;
  }

  const paymentCount = await redis.incr(countKey(normalizedEmail));
  return { email: normalizedEmail, paymentCount };
}
