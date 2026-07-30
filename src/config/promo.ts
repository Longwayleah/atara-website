/** Site-wide thank-you promo (must match Square discount code) */
export const thankYouPromo = {
  code: "thankyou40",
  codeLabel: "THANKYOU40",
  discountPercent: 40,
  image: "/promo/thankyou40.png",
  headline: "Prices adjusted. Standard unchanged.",
  dismissLabel: "Not now",
  copyLabel: "Copy THANKYOU40",
  copiedLabel: "Copied",
} as const;

export const thankYouPromoSnoozeKey = "archon-thankyou40-snooze";

/** How long dismissing hides the thank-you promo */
export const THANK_YOU_SNOOZE_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

export function isThankYouPromoSnoozed(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(thankYouPromoSnoozeKey);
  if (!raw) return false;
  const until = Number(raw);
  if (!Number.isFinite(until)) return false;
  if (Date.now() >= until) {
    localStorage.removeItem(thankYouPromoSnoozeKey);
    return false;
  }
  return true;
}

export function snoozeThankYouPromo(durationMs = THANK_YOU_SNOOZE_MS) {
  localStorage.setItem(thankYouPromoSnoozeKey, String(Date.now() + durationMs));
}
