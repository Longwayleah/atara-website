import { getLoyaltyPaymentThreshold } from "@/config/loyalty";
import { sendLoyaltyRewardEmail } from "@/lib/loyalty/reward-email";
import {
  LoyaltyStoreUnavailableError,
  recordCompletedPayment,
} from "@/lib/loyalty/store";

export async function processLoyaltyPayment({
  email,
  paymentId,
}: {
  email: string;
  paymentId: string;
}) {
  const recorded = await recordCompletedPayment({ email, paymentId });

  if (!recorded) {
    return { status: "duplicate" as const };
  }

  const threshold = getLoyaltyPaymentThreshold();
  const shouldReward = recorded.paymentCount % threshold === 0;

  if (shouldReward) {
    await sendLoyaltyRewardEmail({
      email: recorded.email,
      paymentCount: recorded.paymentCount,
    });
  }

  return {
    status: "recorded" as const,
    email: recorded.email,
    paymentCount: recorded.paymentCount,
    rewarded: shouldReward,
  };
}

export { LoyaltyStoreUnavailableError };
