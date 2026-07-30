"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/config/products";
import { isProductPurchasable } from "@/config/products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/commerce/format";
import { openGatedCheckout } from "@/lib/checkout/gate";
import { getCartItemCount, useCartStore } from "@/store/useCartStore";

type ProductPurchasePanelProps = {
  product: Product;
  /** Render inside a parent card without its own border */
  embedded?: boolean;
};

export function ProductPurchasePanel({
  product,
  embedded = false,
}: ProductPurchasePanelProps) {
  const cartItems = useCartStore((state) => state.items);
  const hasCartItems = getCartItemCount(cartItems) > 0;
  const purchasable = isProductPurchasable(product);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId),
    [product.variants, selectedVariantId],
  );

  const panelClassName = embedded
    ? "p-5 sm:p-6 md:p-8"
    : "mt-10 rounded-2xl border border-archon-black/10 bg-white/70 p-5 sm:p-6 md:p-8";

  if (!purchasable || !selectedVariant) {
    return (
      <div className={panelClassName}>
        <p className="font-body text-sm text-archon-muted">
          Pricing and checkout for this protocol are coming soon.
        </p>
      </div>
    );
  }

  const lineTotal = selectedVariant.price * quantity;
  const hasCheckoutLink = Boolean(selectedVariant.squareCheckoutUrl);

  return (
    <div className={panelClassName}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Price
          </p>
          <p className="mt-2 font-body text-3xl font-semibold tabular-nums tracking-normal text-archon-navy md:text-4xl md:font-display md:font-extrabold md:tracking-[-0.03em]">
            {formatPrice(selectedVariant.price)}
          </p>
        </div>

        {product.variants.length > 1 ? (
          <div className="w-full min-w-0 sm:w-auto sm:min-w-[180px] sm:max-w-xs">
            <label
              htmlFor={`variant-${product.id}`}
              className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50"
            >
              Strength
            </label>
            <select
              id={`variant-${product.id}`}
              value={selectedVariantId}
              onChange={(event) => setSelectedVariantId(event.target.value)}
              className="mt-2 h-12 w-full rounded-full border border-archon-black/15 bg-white px-4 font-body text-sm text-archon-navy outline-none transition-colors focus:border-archon-navy/35"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.dosage} — {formatPrice(variant.price)}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Quantity
          </p>
          <div className="mt-2 inline-flex items-center rounded-full border border-archon-black/15 bg-white">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="flex h-12 w-12 items-center justify-center font-body text-lg text-archon-navy transition-colors hover:text-archon-navy/70"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              −
            </button>
            <span className="min-w-10 text-center font-body text-sm text-archon-navy">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="flex h-12 w-12 items-center justify-center font-body text-lg text-archon-navy transition-colors hover:text-archon-navy/70"
              onClick={() => setQuantity((value) => value + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full text-left sm:ml-auto sm:w-auto sm:text-right">
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Subtotal
          </p>
          <p className="mt-2 font-body text-xl font-semibold tabular-nums tracking-normal text-archon-navy md:font-display md:text-2xl md:font-extrabold md:tracking-[-0.02em]">
            {formatPrice(lineTotal)}
          </p>
        </div>
      </div>

      <div
        className={
          hasCartItems
            ? "mt-8"
            : "mt-8 flex flex-col gap-3 sm:flex-row"
        }
      >
        <AddToCartButton
          product={product}
          variantId={selectedVariantId}
          quantity={quantity}
          size="lg"
          className={hasCartItems ? "w-full rounded-full" : "flex-1 rounded-full"}
        />
        {!hasCartItems ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="flex-1 rounded-full"
            disabled={!hasCheckoutLink}
            onClick={() => {
              if (selectedVariant.squareCheckoutUrl) {
                void openGatedCheckout({
                  url: selectedVariant.squareCheckoutUrl,
                  cartLabel: `${product.name} ${selectedVariant.dosage || ""}`.trim(),
                  mode: "navigate",
                });
              }
            }}
          >
            {hasCheckoutLink ? "Buy now" : "Buy now — link coming soon"}
          </Button>
        ) : null}
      </div>

      {hasCartItems ? (
        <p className="mt-3 font-body text-xs leading-relaxed text-archon-muted">
          Checkout from your cart when you&apos;re ready.
        </p>
      ) : null}

      {!hasCheckoutLink ? (
        <p className="mt-4 font-body text-xs leading-relaxed text-archon-muted">
          Add to cart now. Square checkout links will be wired per strength as
          they are finalized.
        </p>
      ) : null}
    </div>
  );
}
