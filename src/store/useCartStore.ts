"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getProductById,
  getProductVariant,
  type Product,
  type ProductVariant,
} from "@/config/products";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type ResolvedCartLine = CartLine & {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
};

interface CartState {
  items: CartLine[];
  isOpen: boolean;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

function lineKey(productId: string, variantId: string) {
  return `${productId}:${variantId}`;
}

export function resolveCartLines(items: CartLine[]): ResolvedCartLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId);
    if (!product) return [];

    const variant = getProductVariant(product, item.variantId);
    if (!variant) return [];

    return [
      {
        ...item,
        product,
        variant,
        lineTotal: variant.price * item.quantity,
      },
    ];
  });
}

export function getCartSubtotal(items: CartLine[]) {
  return resolveCartLines(items).reduce((sum, line) => sum + line.lineTotal, 0);
}

export function getCartItemCount(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (productId, variantId, quantity = 1) => {
        const qty = Math.max(1, quantity);
        const key = lineKey(productId, variantId);
        const existing = get().items.find(
          (item) => lineKey(item.productId, item.variantId) === key,
        );

        set({
          items: existing
            ? get().items.map((item) =>
                lineKey(item.productId, item.variantId) === key
                  ? { ...item, quantity: item.quantity + qty }
                  : item,
              )
            : [...get().items, { productId, variantId, quantity: qty }],
          isOpen: true,
        });
      },

      removeItem: (productId, variantId) => {
        const key = lineKey(productId, variantId);
        set({
          items: get().items.filter(
            (item) => lineKey(item.productId, item.variantId) !== key,
          ),
        });
      },

      setQuantity: (productId, variantId, quantity) => {
        const key = lineKey(productId, variantId);
        if (quantity < 1) {
          get().removeItem(productId, variantId);
          return;
        }

        set({
          items: get().items.map((item) =>
            lineKey(item.productId, item.variantId) === key
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "archon-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
