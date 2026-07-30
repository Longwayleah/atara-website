"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getCartItemCount,
  getCartSubtotal,
  resolveCartLines,
  useCartStore,
} from "@/store/useCartStore";
import { BuyAllCheckout } from "@/components/shop/BuyAllCheckout";
import { formatPrice } from "@/lib/commerce/format";
import { openGatedCheckout } from "@/lib/checkout/gate";
import { getProductLabel } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const [buyAllActive, setBuyAllActive] = useState(false);
  const [buyAllComplete, setBuyAllComplete] = useState(false);

  const lines = resolveCartLines(items);
  const subtotal = getCartSubtotal(items);
  const itemCount = getCartItemCount(items);
  const uniqueLines = lines.length;
  const singleLine = uniqueLines === 1 ? lines[0] : null;
  const canDirectCheckout = Boolean(singleLine?.variant.squareCheckoutUrl);
  const allLinesHaveCheckout = lines.every((line) => line.variant.squareCheckoutUrl);
  const canBuyAll = uniqueLines > 1 && allLinesHaveCheckout;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setBuyAllActive(false);
      setBuyAllComplete(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const handleBuyAllComplete = () => {
    clearCart();
    setBuyAllComplete(true);
    setBuyAllActive(false);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[120] bg-archon-black/35 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-[130] flex w-full max-w-md flex-col border-l border-archon-black/10 bg-[#f7f7f7] shadow-[-24px_0_60px_rgba(11,31,58,0.12)] transition-transform duration-300",
          "pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]",
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        {buyAllActive ? (
          <BuyAllCheckout
            lines={lines}
            onBack={() => setBuyAllActive(false)}
            onComplete={handleBuyAllComplete}
          />
        ) : buyAllComplete ? (
          <div className="flex h-full flex-col px-6 py-8">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
                Checkout all complete
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-archon-navy">
                You&apos;re all set
              </h2>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-archon-muted">
                Each protocol was sent through Square. Confirmation emails will
                come from your Square receipts.
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              className="w-full rounded-full"
              onClick={closeCart}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-archon-black/8 px-6 py-5">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
                  Cart
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-archon-navy">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-archon-black/15 bg-white px-3 font-body text-[11px] uppercase tracking-[0.16em] text-archon-navy transition-colors hover:border-archon-black/30"
                onClick={closeCart}
              >
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
                <span>Close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-xl font-extrabold text-archon-navy">
                    Your cart is empty
                  </p>
                  <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-archon-muted">
                    Browse the shop and add protocols to your cart.
                  </p>
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    className="mt-8 min-h-11 rounded-full px-8"
                    onClick={closeCart}
                  >
                    Continue shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li
                      key={`${line.productId}:${line.variantId}`}
                      className="flex gap-4 rounded-2xl border border-archon-black/8 bg-white/80 p-4"
                    >
                      <div className="relative h-20 w-20 shrink-0">
                        <Image
                          src={line.product.image}
                          alt={getProductImageAlt(line.product)}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-extrabold tracking-[-0.02em] text-archon-navy">
                          {line.product.name}
                        </p>
                        <p className="mt-1 font-body text-xs uppercase tracking-[0.16em] text-archon-muted">
                          {line.variant.dosage || line.product.subtitle}
                        </p>
                        <p className="mt-2 font-body text-sm text-archon-navy/75">
                          {formatPrice(line.lineTotal)}
                          {line.quantity > 1
                            ? ` · ${line.quantity} units`
                            : null}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-archon-black/10">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="flex h-11 w-11 items-center justify-center text-archon-navy"
                              onClick={() =>
                                setQuantity(
                                  line.productId,
                                  line.variantId,
                                  line.quantity - 1,
                                )
                              }
                            >
                              −
                            </button>
                            <span className="min-w-8 text-center font-body text-xs text-archon-navy">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="flex h-11 w-11 items-center justify-center text-archon-navy"
                              onClick={() =>
                                setQuantity(
                                  line.productId,
                                  line.variantId,
                                  line.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="inline-flex min-h-11 items-center px-2 font-body text-[11px] uppercase tracking-[0.16em] text-archon-muted transition-colors hover:text-archon-navy"
                            onClick={() =>
                              removeItem(line.productId, line.variantId)
                            }
                          >
                            Remove
                          </button>
                        </div>

                        {uniqueLines > 1 && !canBuyAll ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="mt-4 w-full rounded-full"
                            disabled={!line.variant.squareCheckoutUrl}
                            onClick={() => {
                              if (line.variant.squareCheckoutUrl) {
                                void openGatedCheckout({
                                  url: line.variant.squareCheckoutUrl,
                                  cartLabel: line.product.name,
                                  mode: "navigate",
                                });
                              }
                            }}
                          >
                            {line.variant.squareCheckoutUrl
                              ? `Buy ${line.product.name}`
                              : "Checkout link coming soon"}
                          </Button>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <div className="border-t border-archon-black/8 px-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-archon-navy">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {canBuyAll ? (
                  <p className="mt-4 font-body text-xs leading-relaxed text-archon-muted">
                    Each protocol checks out on Square separately. Checkout all
                    guides you through.
                  </p>
                ) : uniqueLines > 1 ? (
                  <p className="mt-4 font-body text-xs leading-relaxed text-archon-muted">
                    Multiple protocols checkout individually for now. Use each
                    product&apos;s buy button above.
                  </p>
                ) : null}

                {canBuyAll ? (
                  <Button
                    type="button"
                    size="lg"
                    className="mt-5 w-full rounded-full"
                    onClick={() => setBuyAllActive(true)}
                  >
                    Checkout all — {uniqueLines} steps
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    className="mt-5 w-full rounded-full"
                    disabled={!canDirectCheckout}
                    onClick={() => {
                      if (singleLine?.variant.squareCheckoutUrl) {
                        void openGatedCheckout({
                          url: singleLine.variant.squareCheckoutUrl,
                          cartLabel: singleLine.product.name,
                          mode: "navigate",
                        });
                      }
                    }}
                  >
                    {canDirectCheckout
                      ? "Checkout"
                      : uniqueLines > 1
                        ? "Checkout unavailable"
                        : "Checkout link coming soon"}
                  </Button>
                )}
              </div>
            ) : null}
          </>
        )}
      </aside>
    </>
  );
}
