"use client";

import Image from "next/image";
import { useState } from "react";
import type { ResolvedCartLine } from "@/store/useCartStore";
import { formatPrice } from "@/lib/commerce/format";
import { getProductLabel } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";
import { Button } from "@/components/ui/Button";
import { openGatedCheckout } from "@/lib/checkout/gate";
import { cn } from "@/lib/utils/cn";

type BuyAllCheckoutProps = {
  lines: ResolvedCartLine[];
  onBack: () => void;
  onComplete: () => void;
};

export function BuyAllCheckout({
  lines,
  onBack,
  onComplete,
}: BuyAllCheckoutProps) {
  const [step, setStep] = useState(0);
  const [paidSteps, setPaidSteps] = useState<Record<number, boolean>>({});

  const totalSteps = lines.length;
  const current = lines[step];
  const isLastStep = step === totalSteps - 1;
  const currentMarkedPaid = Boolean(paidSteps[step]);

  if (!current) return null;

  const openSquareCheckout = () => {
    const url = current.variant.squareCheckoutUrl;
    if (!url) return;
    void openGatedCheckout({
      url,
      cartLabel: current.product.name,
      mode: "tab",
    }).then(() => {
      setPaidSteps((prev) => ({ ...prev, [step]: true }));
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-archon-black/8 px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          className="font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/50 transition-colors hover:text-archon-navy"
        >
          ← Back to cart
        </button>
        <p className="mt-4 font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
          Checkout all
        </p>
        <h2 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-archon-navy">
          Step {step + 1} of {totalSteps}
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-archon-muted">
          Complete each checkout on Square. We&apos;ll walk you through every
          protocol in your cart.
        </p>
        {step === 0 ? (
          <p className="mt-3 rounded-xl border border-archon-navy/10 bg-white/80 px-4 py-3 font-body text-sm leading-relaxed text-archon-navy/80">
            You&apos;ll complete one Square payment per product. Takes about a
            minute each.
          </p>
        ) : null}

        <div className="mt-5 flex gap-2">
          {lines.map((line, index) => (
            <span
              key={`${line.productId}:${line.variantId}`}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index < step || paidSteps[index]
                  ? "bg-archon-navy"
                  : index === step
                    ? "bg-archon-navy/45"
                    : "bg-archon-black/10",
              )}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="rounded-2xl border border-archon-black/8 bg-white/80 p-5">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 shrink-0">
              <Image
                src={current.product.image}
                alt={getProductImageAlt(current.product)}
                fill
                className="object-contain"
                sizes="96px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-extrabold tracking-[-0.02em] text-archon-navy">
                {current.product.name}
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.16em] text-archon-muted">
                {current.variant.dosage || current.product.subtitle}
              </p>
              {current.quantity > 1 ? (
                <p className="mt-2 font-body text-xs text-archon-muted">
                  Qty {current.quantity} — adjust quantity on Square if needed.
                </p>
              ) : null}
              <p className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-archon-navy">
                {formatPrice(current.lineTotal)}
              </p>
            </div>
          </div>
        </div>

        <ol className="mt-6 space-y-3">
          {lines.map((line, index) => (
            <li
              key={`${line.productId}:${line.variantId}`}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 font-body text-sm",
                index === step
                  ? "border-archon-navy/20 bg-white text-archon-navy"
                  : "border-transparent text-archon-muted",
              )}
            >
              <span>
                {index + 1}. {line.product.name}
              </span>
              <span>
                {paidSteps[index] ? "Paid" : index === step ? "Now" : "—"}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-archon-black/8 px-6 py-6">
        <Button
          type="button"
          size="lg"
          className="w-full rounded-full"
          onClick={openSquareCheckout}
        >
          {currentMarkedPaid ? "Open Square again" : "Pay on Square"}
        </Button>

        <div className="mt-3 flex gap-3">
          {step > 0 ? (
            <Button
              type="button"
              size="md"
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => setStep((value) => value - 1)}
            >
              Previous
            </Button>
          ) : null}

          <Button
            type="button"
            size="md"
            variant={currentMarkedPaid ? "primary" : "outline"}
            className="flex-1 rounded-full"
            disabled={!currentMarkedPaid}
            onClick={() => {
              if (!currentMarkedPaid) return;
              if (isLastStep) {
                onComplete();
                return;
              }
              setStep((value) => value + 1);
            }}
          >
            {isLastStep
              ? "I paid — finish"
              : currentMarkedPaid
                ? "I paid — next"
                : "Next protocol"}
          </Button>
        </div>

        <p className="mt-4 font-body text-xs leading-relaxed text-archon-muted">
          Pay on Square opens in a new tab. Come back here and tap{" "}
          <span className="text-archon-navy">I paid — next</span> once payment
          is complete.
        </p>
      </div>
    </div>
  );
}
