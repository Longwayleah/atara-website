import type { ProductCollection } from "@/config/collections";

export type ShopFilter = "all" | ProductCollection;

export function parseShopFilter(value?: string): ShopFilter {
  if (value === "core") return value;
  return "all";
}

export function getShopFilterTitle(filter: ShopFilter) {
  switch (filter) {
    case "core":
      return "Our Protocols";
    default:
      return "Our Protocols";
  }
}

export function getShopFilterDescriptor(filter: ShopFilter) {
  switch (filter) {
    case "core":
      return "Radiance, Recovery, Renew, Refine, and Essential — curated for intentional cellular wellness.";
    default:
      return "Radiance, Recovery, Renew, Refine, and Essential — curated for intentional cellular wellness.";
  }
}
