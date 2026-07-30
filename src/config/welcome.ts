/** Protocol clearance welcome offer */
export const welcomeOffer = {
  code: "welcome10",
  codeLabel: "WELCOME10",
  discountPercent: 10,
  eyebrow: "Atara",
  headline: "Protocol Clearance",
  subheadline: "10% off your first order.",
  submitLabel: "Continue",
  browseLabel: "Browse first",
  ageAttestation: "I am 21 or older.",
  researchAttestation:
    "For research and laboratory use only — not for human consumption.",
  marketingOptInAttestation:
    "I'd like to receive emails and texts about new products, offers, and updates.",
  certificateTitle: "Protocol Clearance",
  certificateSubtitle: "Access issued",
  certificateStatus: "Verified",
  certificateBenefit: "10% first order",
  checkoutNote: "Use at Square checkout when prompted.",
} as const;

export const welcomeCaptureStorageKey = "archon-welcome-capture";
export const welcomeEmailStorageKey = "archon-welcome-email";
/** Soft-dismiss snooze for the browse prompt (not checkout). */
export const welcomeCaptureSnoozeKey = "archon-welcome-capture-snooze";
/** @deprecated Legacy session dismiss key — cleared on mount. */
export const welcomeCaptureSessionKey = "archon-welcome-capture-dismissed";

/** How long “Browse first” hides the soft prompt. Checkout still requires clearance. */
export const WELCOME_SNOOZE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export type WelcomeCaptureStatus = "signed-up";

/** Protocol Clearance removed from Atara storefront. */
export function isProtocolClearanceBypassed() {
  return true;
}

export function readWelcomeEmail(): string | null {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem(welcomeEmailStorageKey)?.trim().toLowerCase();
  if (!email || !email.includes("@")) return null;
  return email;
}

export function writeWelcomeEmail(email: string) {
  localStorage.setItem(welcomeEmailStorageKey, email.trim().toLowerCase());
}

export function readWelcomeCaptureStatus(): WelcomeCaptureStatus | null {
  if (typeof window === "undefined") return null;

  if (localStorage.getItem(welcomeCaptureStorageKey) === "signed-up") {
    return "signed-up";
  }

  return null;
}

/** Signed up + email on device — required before Square checkout. */
export function hasCompletedWelcome(): boolean {
  if (isProtocolClearanceBypassed()) return true;
  return readWelcomeCaptureStatus() === "signed-up" && Boolean(readWelcomeEmail());
}

export function writeWelcomeCaptureStatus(_status: WelcomeCaptureStatus) {
  localStorage.setItem(welcomeCaptureStorageKey, "signed-up");
  sessionStorage.removeItem(welcomeCaptureSessionKey);
  localStorage.removeItem(welcomeCaptureSnoozeKey);
}

export function isWelcomePromptSnoozed(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(welcomeCaptureSnoozeKey);
  if (!raw) return false;
  const until = Number(raw);
  if (!Number.isFinite(until)) return false;
  if (Date.now() >= until) {
    localStorage.removeItem(welcomeCaptureSnoozeKey);
    return false;
  }
  return true;
}

export function snoozeWelcomePrompt(durationMs = WELCOME_SNOOZE_MS) {
  localStorage.setItem(
    welcomeCaptureSnoozeKey,
    String(Date.now() + durationMs),
  );
}

export function createClearanceId() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = String(Math.floor(Math.random() * 9000) + 1000);

  return `AC-${date}-${suffix}`;
}

export function formatClearanceDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
