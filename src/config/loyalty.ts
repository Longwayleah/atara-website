/** Loyalty reward — 15% off every Nth completed Square payment */
export const loyaltyReward = {
  paymentThreshold: 5,
  code: "reorder15",
  codeLabel: "REORDER15",
  discountPercent: 15,
  checkoutNote: "Use at Square checkout when prompted.",
} as const;

export function getLoyaltyPaymentThreshold() {
  const raw = process.env.LOYALTY_PAYMENT_THRESHOLD?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : loyaltyReward.paymentThreshold;
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : loyaltyReward.paymentThreshold;
}

export function getLoyaltyRewardCodeLabel() {
  return (
    process.env.LOYALTY_REWARD_CODE_LABEL?.trim().toUpperCase() ||
    loyaltyReward.codeLabel
  );
}
