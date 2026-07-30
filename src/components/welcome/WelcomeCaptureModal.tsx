"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  welcomeOffer,
  createClearanceId,
  hasCompletedWelcome,
  isWelcomePromptSnoozed,
  readWelcomeEmail,
  snoozeWelcomePrompt,
  writeWelcomeCaptureStatus,
  writeWelcomeEmail,
} from "@/config/welcome";
import { ProtocolClearanceCertificate } from "@/components/welcome/ProtocolClearanceCertificate";
import { completeCheckoutEmailGate } from "@/lib/checkout/gate";
import { useAppStore } from "@/store/useAppStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const OPEN_DELAY_MS = 4500;

type CapturePhase = "form" | "success";

export function WelcomeCaptureModal() {
  const splashComplete = useAppStore((state) => state.splashComplete);
  const welcomeForCheckout = useAppStore((state) => state.welcomeForCheckout);
  const clearWelcomeForCheckout = useAppStore(
    (state) => state.clearWelcomeForCheckout,
  );
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<CapturePhase>("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [researchUseConfirmed, setResearchUseConfirmed] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clearanceId, setClearanceId] = useState("");
  const firstNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const ageId = useId();
  const researchId = useId();
  const marketingId = useId();

  /** Soft browse prompt can be dismissed; checkout gate cannot. */
  const isCheckoutGate = welcomeForCheckout;
  const canSubmit = ageConfirmed && researchUseConfirmed && !isSubmitting;

  useEffect(() => {
    setMounted(true);
    try {
      sessionStorage.removeItem("archon-welcome-capture-dismissed");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!splashComplete || hasCompletedWelcome() || isWelcomePromptSnoozed()) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!hasCompletedWelcome() && !isWelcomePromptSnoozed()) {
        setPhase("form");
        setIsOpen(true);
      }
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [splashComplete]);

  useEffect(() => {
    if (!welcomeForCheckout) return;

    const existing = readWelcomeEmail();
    if (existing && hasCompletedWelcome()) {
      completeCheckoutEmailGate(existing);
      return;
    }

    setPhase("form");
    setIsOpen(true);
  }, [welcomeForCheckout]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (phase === "success") {
        finishSuccess();
        return;
      }
      if (!isCheckoutGate) {
        dismissSoftPrompt();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // finishSuccess / dismissSoftPrompt close over latest state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, phase, email, isCheckoutGate]);

  const dismissSoftPrompt = () => {
    snoozeWelcomePrompt();
    setIsOpen(false);
    setError(null);
    setIsSubmitting(false);
    clearWelcomeForCheckout();
  };

  const finishSuccess = () => {
    const normalized = email.trim().toLowerCase() || readWelcomeEmail() || "";
    if (normalized) {
      completeCheckoutEmailGate(normalized);
    } else {
      clearWelcomeForCheckout();
    }
    setIsOpen(false);
    setError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!ageConfirmed || !researchUseConfirmed) {
      setError("Please confirm both eligibility statements to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/welcome-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName,
          email,
          phone,
          ageConfirmed,
          researchUseConfirmed,
          marketingOptIn,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Clearance request failed. Please try again.");
        return;
      }

      const normalized = email.trim().toLowerCase();
      writeWelcomeEmail(normalized);
      writeWelcomeCaptureStatus("signed-up");
      setClearanceId(createClearanceId());
      setPhase("success");
    } catch {
      setError("Clearance request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(welcomeOffer.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="protocol-clearance-root">
      {phase === "success" || !isCheckoutGate ? (
        <button
          type="button"
          aria-label="Close protocol clearance"
          className="protocol-clearance-root__backdrop"
          onClick={phase === "success" ? finishSuccess : dismissSoftPrompt}
        />
      ) : (
        <div
          className="protocol-clearance-root__backdrop protocol-clearance-root__backdrop--locked"
          aria-hidden
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="protocol-clearance-title"
        className={cn(
          "protocol-clearance-root__panel",
          phase === "success" && "protocol-clearance-root__panel--certificate",
          phase === "success" &&
            !reducedMotion &&
            "protocol-clearance-root__panel--reveal",
        )}
      >
        {phase === "form" ? (
          <>
            <h2
              id="protocol-clearance-title"
              className="font-display text-[clamp(1.875rem,4vw,2.125rem)] font-extrabold tracking-[-0.03em] text-archon-navy"
            >
              {welcomeOffer.headline}
            </h2>
            <p className="mt-2 font-body text-sm text-archon-muted">
              {isCheckoutGate
                ? "Complete clearance to continue to checkout — and unlock 10% off your first order."
                : welcomeOffer.subheadline}
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label htmlFor={firstNameId} className="sr-only">
                    Full name
                  </label>
                  <input
                    id={firstNameId}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="protocol-clearance-root__input"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label htmlFor={emailId} className="sr-only">
                    Email
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="protocol-clearance-root__input"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label htmlFor={phoneId} className="sr-only">
                    Phone number
                  </label>
                  <input
                    id={phoneId}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="protocol-clearance-root__input"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <fieldset className="space-y-2.5 border-0 p-0">
                <legend className="sr-only">Eligibility confirmations</legend>

                <label htmlFor={ageId} className="protocol-clearance-root__check">
                  <input
                    id={ageId}
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(event) => setAgeConfirmed(event.target.checked)}
                    className="protocol-clearance-root__check-input"
                  />
                  <span className="protocol-clearance-root__check-box" aria-hidden />
                  <span className="protocol-clearance-root__check-text">
                    {welcomeOffer.ageAttestation}
                  </span>
                </label>

                <label htmlFor={researchId} className="protocol-clearance-root__check">
                  <input
                    id={researchId}
                    type="checkbox"
                    checked={researchUseConfirmed}
                    onChange={(event) =>
                      setResearchUseConfirmed(event.target.checked)
                    }
                    className="protocol-clearance-root__check-input"
                  />
                  <span className="protocol-clearance-root__check-box" aria-hidden />
                  <span className="protocol-clearance-root__check-text">
                    {welcomeOffer.researchAttestation}
                  </span>
                </label>

                <label htmlFor={marketingId} className="protocol-clearance-root__check">
                  <input
                    id={marketingId}
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(event) => setMarketingOptIn(event.target.checked)}
                    className="protocol-clearance-root__check-input"
                  />
                  <span className="protocol-clearance-root__check-box" aria-hidden />
                  <span className="protocol-clearance-root__check-text">
                    {welcomeOffer.marketingOptInAttestation}
                  </span>
                </label>
              </fieldset>

              {error ? (
                <p className="font-body text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-full rounded-full bg-archon-navy text-white hover:bg-archon-navy-light disabled:opacity-45"
                disabled={!canSubmit}
              >
                {isSubmitting ? "..." : welcomeOffer.submitLabel}
              </Button>

              {!isCheckoutGate ? (
                <button
                  type="button"
                  className="w-full py-2 font-body text-xs uppercase tracking-[0.18em] text-archon-navy/45 transition-colors hover:text-archon-navy"
                  onClick={dismissSoftPrompt}
                >
                  {welcomeOffer.browseLabel}
                </button>
              ) : null}
            </form>
          </>
        ) : (
          <>
            <ProtocolClearanceCertificate
              firstName={firstName.trim()}
              email={email.trim().toLowerCase()}
              phone={phone.trim()}
              clearanceId={clearanceId}
              copied={copied}
              onCopy={copyCode}
            />

            <Button
              type="button"
              className="mt-6 w-full rounded-full bg-archon-navy text-white hover:bg-archon-navy-light"
              onClick={finishSuccess}
            >
              {isCheckoutGate ? "Continue to checkout" : "Continue"}
            </Button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
