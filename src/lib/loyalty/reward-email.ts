import {
  getLoyaltyRewardCodeLabel,
  loyaltyReward,
} from "@/config/loyalty";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendResendEmail({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
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
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed (${response.status}): ${body}`);
  }
}

export async function sendLoyaltyRewardEmail({
  email,
  paymentCount,
}: {
  email: string;
  paymentCount: number;
}) {
  const code = getLoyaltyRewardCodeLabel();
  const localPart = email.split("@")[0] ?? "there";
  const greeting = localPart.replace(/[._-]/g, " ");

  await sendResendEmail({
    to: [email],
    subject: `Your ${loyaltyReward.discountPercent}% Atara loyalty reward`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:32px;border-radius:16px 16px 0 0;">
          <p style="margin:0;color:#94a3b8;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Atara</p>
          <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;font-weight:700;">Loyalty reward unlocked</h1>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 16px 16px;background:#ffffff;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#475569;">Hi ${escapeHtml(greeting)},</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;">
            Thank you for your continued research with Atara. This is your
            <strong>${paymentCount}${getOrdinalSuffix(paymentCount)}</strong>
            completed order — you&apos;ve earned
            <strong>${loyaltyReward.discountPercent}% off</strong> your next purchase.
          </p>
          <div style="background:#f1f5f9;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 8px;color:#64748b;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">Reward code</p>
            <p style="margin:0;color:#0f172a;font-size:32px;font-weight:700;letter-spacing:0.12em;font-family:monospace;">${code}</p>
          </div>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
            ${escapeHtml(loyaltyReward.checkoutNote)}
          </p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">
            To your research,<br/>
            <strong style="color:#0f172a;">The Atara Team</strong>
          </p>
        </div>
      </div>
    `,
  });

  const notifyEmail = process.env.WELCOME_NOTIFY_EMAIL ?? "info@archonpeptide.com";

  await sendResendEmail({
    to: [notifyEmail],
    subject: `Loyalty reward sent — ${email} (${paymentCount} orders)`,
    html: `
      <h2>Archon loyalty reward issued</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Completed payments:</strong> ${paymentCount}</p>
      <p><strong>Code:</strong> ${code} (${loyaltyReward.discountPercent}% off)</p>
    `,
  });
}

function getOrdinalSuffix(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (value % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
