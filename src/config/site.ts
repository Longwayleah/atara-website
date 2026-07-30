export const siteConfig = {
  name: "Atara",
  brandName: "Atara",
  tagline: "Cellular wellness. Intentional beauty.",
  description:
    "Science-backed peptide protocols and intentional skincare designed to support your body at the cellular level.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atara.example",
  ogImage: "/opengraph-image",
  links: {
    /** PLACEHOLDER — update when Atara Instagram is provided */
    instagram: "https://instagram.com/",
    /** PLACEHOLDER — update when Atara order email is provided */
    email: "orders@example.com",
    shop: "/shop",
  },
  curator: "Lauren Lease",
} as const;

export const navigation = [
  { label: "Our Protocols", href: "/shop" },
  { label: "The Science", href: "/science" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;
