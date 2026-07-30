"use client";

import { getCartItemCount, useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils/cn";

type CartButtonProps = {
  className?: string;
  onDark?: boolean;
};

export function CartButton({ className, onDark = false }: CartButtonProps) {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = getCartItemCount(items);

  return (
    <button
      type="button"
      aria-label={`Open protocol${itemCount ? `, ${itemCount} items` : ""}`}
      className={cn(
        "group inline-flex min-h-11 items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors md:text-[9px] lg:text-[10px]",
        onDark
          ? "text-white/65 hover:text-white"
          : "text-archon-black/70 hover:text-archon-black",
        className,
      )}
      onClick={openCart}
    >
      <span>Protocol</span>
      <span
        className={cn(
          "tabular-nums tracking-[0.08em] transition-colors",
          itemCount > 0
            ? onDark
              ? "text-white"
              : "text-archon-navy"
            : onDark
              ? "text-white/35"
              : "text-archon-black/30",
        )}
        aria-hidden={itemCount === 0}
      >
        {String(itemCount).padStart(2, "0")}
      </span>
    </button>
  );
}
