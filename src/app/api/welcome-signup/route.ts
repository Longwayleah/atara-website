import { NextResponse } from "next/server";
import {
  handleWelcomeSignup,
  normalizePhone,
  validateWelcomeSignup,
} from "@/lib/email/welcome-signup";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      ageConfirmed?: boolean;
      researchUseConfirmed?: boolean;
      marketingOptIn?: boolean;
    };
    const name = body.name ?? "";
    const email = body.email ?? "";
    const phone = body.phone ?? "";
    const ageConfirmed = body.ageConfirmed === true;
    const researchUseConfirmed = body.researchUseConfirmed === true;
    const marketingOptIn = body.marketingOptIn === true;

    const validation = validateWelcomeSignup({
      name,
      email,
      phone,
      ageConfirmed,
      researchUseConfirmed,
      marketingOptIn,
    });
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const digits = normalizePhone(phone);
    const formattedPhone =
      digits.length === 10
        ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        : digits.length === 11 && digits.startsWith("1")
          ? `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
          : `+${digits}`;

    await handleWelcomeSignup({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      ageConfirmed,
      researchUseConfirmed,
      marketingOptIn,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[welcome-signup]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
