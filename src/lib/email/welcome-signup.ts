import { welcomeOffer } from "@/config/welcome";

export type WelcomeSignupPayload = {
  name: string;
  email: string;
  phone: string;
  ageConfirmed: boolean;
  researchUseConfirmed: boolean;
  marketingOptIn: boolean;
};

export type WelcomeSignupResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Digits only — US numbers must have at least 10. */
export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function validateWelcomeSignup({
  name,
  email,
  phone,
  ageConfirmed,
  researchUseConfirmed,
}: WelcomeSignupPayload): WelcomeSignupResult {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const digits = normalizePhone(phone);

  if (!ageConfirmed) {
    return { ok: false, error: "Please confirm you are 21 years of age or older." };
  }

  if (!researchUseConfirmed) {
    return {
      ok: false,
      error: "Please confirm research and laboratory use only.",
    };
  }

  if (trimmedName.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (digits.length < 10 || digits.length > 15) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  return { ok: true };
}

async function sendResendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Archon Peptide <orders@archonpeptide.com>";

  if (!apiKey) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed (${response.status}): ${body}`);
  }
}

export async function sendCustomerWelcomeEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const firstName = name.trim().split(" ")[0] || name.trim();
  const code = welcomeOffer.codeLabel;

  await sendResendEmail({
    to: [email],
    subject: "Your Atara Protocol Clearance — 10% Off",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:32px;border-radius:16px 16px 0 0;">
          <p style="margin:0;color:#94a3b8;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Atara</p>
          <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;font-weight:700;">Protocol Clearance Issued</h1>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 16px 16px;background:#ffffff;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#475569;">Hi ${escapeHtml(firstName)},</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;">
            Your protocol clearance is confirmed. Use the code below for ${welcomeOffer.discountPercent}% off your first order.
          </p>
          <div style="background:#f1f5f9;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 8px;color:#64748b;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">Authorization Code</p>
            <p style="margin:0;color:#0f172a;font-size:32px;font-weight:700;letter-spacing:0.12em;font-family:monospace;">${code}</p>
          </div>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
            ${escapeHtml(welcomeOffer.checkoutNote)}
          </p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">
            To your research,<br/>
            <strong style="color:#0f172a;">The Atara Team</strong>
          </p>
        </div>
      </div>
    `,
  });
}

export async function notifyWelcomeSignup({
  name,
  email,
  phone,
  ageConfirmed,
  researchUseConfirmed,
  marketingOptIn,
}: WelcomeSignupPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail =
    process.env.WELCOME_NOTIFY_EMAIL ?? "info@archonpeptide.com";

  if (!apiKey) {
    console.warn(
      "[welcome-signup] RESEND_API_KEY is not set — signup recorded without email notification.",
      { name, email, phone },
    );
    return;
  }

  await sendCustomerWelcomeEmail({ name, email });

  await sendResendEmail({
    to: [notifyEmail],
    replyTo: email,
    subject: `Protocol clearance request — ${name}`,
    html: `
      <h2>New Archon protocol clearance request</h2>
      <p><strong>Full name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Age 21+ confirmed:</strong> ${ageConfirmed ? "Yes" : "No"}</p>
      <p><strong>Research use acknowledged:</strong> ${researchUseConfirmed ? "Yes" : "No"}</p>
      <p><strong>Marketing emails opted in:</strong> ${marketingOptIn ? "Yes" : "No"}</p>
      <p><strong>Authorization code issued:</strong> ${welcomeOffer.code} (${welcomeOffer.discountPercent}% off)</p>
      <p><em>Submitted from archonpeptide.com</em></p>
    `,
  });
}

async function syncToSuperBot({
  name,
  email,
  phone,
  ageConfirmed,
  researchUseConfirmed,
  marketingOptIn,
}: WelcomeSignupPayload) {
  const superbotUrl = process.env.ARCHON_SUPERBOT_URL?.trim();
  const secret = process.env.WELCOME_FORM_SECRET?.trim();

  if (!superbotUrl) {
    throw new Error("ARCHON_SUPERBOT_URL is not configured");
  }

  const response = await fetch(`${superbotUrl.replace(/\/$/, "")}/api/welcome`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: name,
      email,
      phone,
      secret,
      skip_email: true,
      welcome_code: welcomeOffer.codeLabel,
      source: "protocol_clearance",
      metadata: {
        site: "archonpeptide.com",
        age_confirmed: ageConfirmed,
        research_use_confirmed: researchUseConfirmed,
        marketing_opt_in: marketingOptIn,
        discount_code: welcomeOffer.codeLabel,
        phone,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Super Bot sync failed (${response.status}): ${body}`);
  }
}

export async function handleWelcomeSignup(payload: WelcomeSignupPayload) {
  // CRM sync first — never let Resend failure drop the lead in Nova.
  await syncToSuperBot(payload);
  try {
    await notifyWelcomeSignup(payload);
  } catch (error) {
    console.error(
      "[welcome-signup] Email notify failed after Superbot sync:",
      error,
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
