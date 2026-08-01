import type { ProductCollection } from "@/config/collections";

export interface ProductVariant {
  id: string;
  dosage: string;
  price: number;
  /** Square payment link — add when available */
  squareCheckoutUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  /** Compound or blend on the vial label */
  subtitle?: string;
  slug: string;
  descriptor: string;
  image: string;
  /**
   * Optical crop for lifestyle photos shot at different distances.
   * Applied inside the fixed card media frame.
   */
  imageFit?: {
    scale?: number;
    /** CSS object-position, e.g. "50% 42%" */
    position?: string;
  };
  featured?: boolean;
  collection: ProductCollection;
  /** Hide strength/mg labeling — e.g. proprietary blends */
  hideDosage?: boolean;
  variants: ProductVariant[];
}

/** Atara protocol catalog — checkout infrastructure preserved via existing Square links */
export const products: Product[] = [
  {
    id: "glow",
    name: "Radiance Protocol",
    subtitle: "GHK-Cu",
    slug: "glow",
    descriptor:
      "Support for healthy-looking skin, radiance, and cellular function.",
    image: "/products/Atara_Radiance_Card_45_v2.jpg",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "70mg",
        dosage: "70 mg",
        price: 75.99,
        squareCheckoutUrl: "https://square.link/u/D3YRcSbf",
      },
    ],
  },
  {
    id: "bpc-tb500",
    name: "Recovery Protocol",
    subtitle: "TB-500 + BPC-157",
    slug: "bpc-tb500",
    descriptor:
      "Support for recovery, repair, and overall physical performance.",
    image: "/products/Atara_Recovery_Card_45_v2.jpg",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 134.99,
        squareCheckoutUrl: "https://square.link/u/NLZRT4jI",
      },
    ],
  },
  {
    id: "nad-plus",
    name: "Renew Protocol",
    subtitle: "NAD+",
    slug: "nad-plus",
    descriptor:
      "Support for cellular energy, longevity, and metabolic health.",
    image: "/products/Atara_Renew_Card_45.jpg",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "500mg",
        dosage: "500 mg",
        price: 109.99,
        squareCheckoutUrl: "https://square.link/u/QRjL35xW",
      },
    ],
  },
  {
    id: "refine",
    name: "Refine Protocol",
    subtitle: "Retatrutide",
    slug: "refine",
    descriptor:
      "Support for metabolic refinement, body composition, and energy balance — targeting three receptors: GLP, GIP, and glucagon.",
    image: "/products/Atara_Refine_Card_45_v3.jpg",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 249.99,
        squareCheckoutUrl: "https://square.link/u/i0ikHwvp",
      },
    ],
  },
  {
    id: "essential",
    name: "Essential Protocol",
    subtitle: "All 3 Protocols",
    slug: "essential",
    descriptor:
      "Radiance, Recovery, and Renew — the complete Atara system in one set.",
    image: "/products/Atara_Essential_Card_45.jpg",
    featured: true,
    collection: "core",
    hideDosage: true,
    variants: [
      {
        id: "bundle",
        dosage: "Bundle",
        price: 269.99,
        squareCheckoutUrl: "https://square.link/u/DAMJyn2m",
      },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** 1-based position in catalog */
export function getProductCatalogIndex(slug: string) {
  const index = products.findIndex((product) => product.slug === slug);
  return index >= 0 ? index + 1 : null;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductVariant(product: Product, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId);
}

export function isProductPurchasable(product: Product) {
  return product.variants.length > 0;
}

export function getStartingPrice(product: Product) {
  if (!product.variants.length) return null;
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function getDefaultVariant(product: Product) {
  return product.variants[0] ?? null;
}

/** Dosage badge for cards — single strength or range across variants */
export function getProductDosageLabel(product: Product) {
  if (product.hideDosage) return "";
  if (!product.variants.length) return "—";
  if (product.variants.length === 1) return product.variants[0].dosage;

  const first = product.variants[0].dosage;
  const last = product.variants[product.variants.length - 1].dosage;
  return `${first} – ${last}`;
}
