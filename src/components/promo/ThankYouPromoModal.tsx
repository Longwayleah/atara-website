"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  isThankYouPromoSnoozed,
  snoozeThankYouPromo,
  thankYouPromo,
} from "@/config/promo";
import { isProtocolClearanceBypassed } from "@/config/welcome";
import { useAppStore } from "@/store/useAppStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const OPEN_DELAY_MS = 9000;
const RETRY_MS = 2500;

export function ThankYouPromoModal() {
  const splashComplete = useAppStore((state) => state.splashComplete);
  const welcomeForCheckout = useAppStore((state) => state.welcomeForCheckout);
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !splashComplete) return;
    if (isThankYouPromoSnoozed()) return;

    let cancelled = false;
    let retryTimer = 0;

    const tryOpen = () => {
      if (cancelled || isThankYouPromoSnoozed()) return;
      if (
        !isProtocolClearanceBypassed() &&
        (welcomeForCheckout ||
          document.querySelector(".protocol-clearance-root"))
      ) {
        retryTimer = window.setTimeout(tryOpen, RETRY_MS);
        return;
      }
      setIsOpen(true);
    };

    const openTimer = window.setTimeout(tryOpen, OPEN_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(openTimer);
      window.clearTimeout(retryTimer);
    };
  }, [mounted, splashComplete, welcomeForCheckout]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const dismiss = () => {
    snoozeThankYouPromo();
    setIsOpen(false);
    setCopied(false);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(thankYouPromo.codeLabel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="thankyou-promo-root" role="presentation">
      <button
        type="button"
        aria-label="Dismiss offer"
        className="thankyou-promo-root__backdrop"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thankyou-promo-title"
        className={cn(
          "thankyou-promo-root__panel",
          !reducedMotion && "thankyou-promo-root__panel--reveal",
        )}
      >
        <button
          type="button"
          aria-label="Close"
          className="thankyou-promo-root__close"
          onClick={dismiss}
        >
          ×
        </button>

        <h2 id="thankyou-promo-title" className="sr-only">
          {thankYouPromo.headline} — {thankYouPromo.discountPercent}% off with{" "}
          {thankYouPromo.codeLabel}
        </h2>

        <div className="thankyou-promo-root__media">
          <Image
            src={thankYouPromo.image}
            alt="Prices adjusted. Standard unchanged. 40% off your next order — use code THANKYOU40. For research and educational purposes only."
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 92vw, 640px"
          />
        </div>

        <div className="thankyou-promo-root__actions">
          <Button
            type="button"
            className="w-full rounded-full bg-archon-navy text-white hover:bg-archon-navy-light"
            onClick={copyCode}
          >
            {copied ? thankYouPromo.copiedLabel : thankYouPromo.copyLabel}
          </Button>
          <button
            type="button"
            className="w-full min-h-11 py-2 font-body text-xs uppercase tracking-[0.18em] text-archon-navy/45 transition-colors hover:text-archon-navy"
            onClick={dismiss}
          >
            {thankYouPromo.dismissLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
