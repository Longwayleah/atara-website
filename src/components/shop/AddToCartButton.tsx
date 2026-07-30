"use client";

import { useState } from "react";
import type { Product } from "@/config/products";
import { getDefaultVariant } from "@/config/products";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils/cn";

type AddToCartButtonProps = {
  product: Product;
  variantId?: string;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
  label?: string;
  showAddedState?: boolean;
};

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  size = "md",
  variant = "primary",
  className,
  label = "Add to cart",
  showAddedState = true,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const selectedVariant = variantId
    ? product.variants.find((item) => item.id === variantId)
    : getDefaultVariant(product);

  if (!selectedVariant) return null;

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={cn(className)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addItem(product.id, selectedVariant.id, quantity);
        if (showAddedState) {
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1400);
        }
      }}
    >
      {added ? "Added" : label}
    </Button>
  );
}
