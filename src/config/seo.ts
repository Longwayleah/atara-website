/** Central SEO constants — single source for metadata and structured data */
export const seo = {
  siteName: "Atara",
  legalName: "Atara",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atara.example",
  title: "Atara | Cellular Wellness. Intentional Beauty.",
  description:
    "Science-backed peptide protocols and intentional skincare designed to support your body at the cellular level.",
  tagline: "Cellular wellness. Intentional beauty.",
  keywords: [
    "Atara",
    "cellular wellness",
    "intentional beauty",
    "peptide protocols",
    "GHK-Cu",
    "BPC-157",
    "TB-500",
    "NAD+",
    "skincare ritual",
    "Lauren Lease",
  ],
  locale: "en_US",
  twitter: {
    card: "summary_large_image" as const,
    /** PLACEHOLDER — update when Atara social handles are provided */
    site: "@atara",
    creator: "@atara",
  },
  /** PLACEHOLDER social profiles — update when accounts are live */
  sameAs: [] as string[],
} as const;

export function getSiteUrl(path = "") {
  const base = seo.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
