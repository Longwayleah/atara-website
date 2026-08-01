import { ataraProducts, images } from "@/config/assets";

export const homepageCopy = {
  splash: {
    tagline: "Cellular wellness. Intentional beauty.",
  },
  hero: {
    brand: "Atara",
    subheadline: "Cellular wellness",
    body: "Science-backed peptide protocols and intentional skincare designed to support your body at the cellular level.",
    exploreLabel: "Explore the Protocols",
    exploreHref: "/shop",
    headline: ["Wellness", "Begins Within.", "Beauty", "Radiates Out."],
    features: [
      { label: "Radiance", icon: "recovery" as const },
      { label: "Recovery", icon: "performance" as const },
      { label: "Renewal", icon: "routine" as const },
    ],
    glass: {
      title: "Cellular wellness. Intentional beauty.",
      body: "Science-backed peptide protocols curated for restoration, resilience, and radiance from within.",
    },
    modelLabel: "Atara",
    heroImage: images.ataraHero,
    scrollLabel: "Scroll to Continue",
  },
  philosophy: {
    heading: "A return to balance.",
    body: "Atara approaches beauty differently—supporting the body at the cellular level to encourage restoration, resilience, and radiance from within.",
    image: images.ataraCoastal,
    imageAlt: "Quiet coastal landscape in soft mist — Atara philosophy",
  },
  brandIntro: {
    statement: "Cellular wellness. Intentional beauty.",
    body: "Atara is a thoughtfully curated cellular-wellness brand bringing together peptide protocols and intentional skincare—support designed from within, completed at the surface.",
    image: images.ataraBrandCard,
    imageAlt: "Atara brand card — cellular wellness, intentional beauty, curated by Lauren Lease",
  },
  pathways: {
    heading: "Three pathways.",
    body: "Identify with a wellness goal before exploring individual protocols.",
    items: [
      {
        id: "radiance",
        title: "Radiance",
        body: "Skin vitality and a luminous, healthy-looking appearance.",
      },
      {
        id: "recovery",
        title: "Recovery",
        body: "Restoration, resilience, repair, and physical support.",
      },
      {
        id: "renewal",
        title: "Renewal",
        body: "Cellular energy, longevity-focused wellness, and metabolic health.",
      },
    ],
  },
  science: {
    heading: "Small signals. Meaningful change.",
    body: "Peptides act as signaling molecules that communicate with specific processes in the body. Atara's protocols are intentionally curated around targeted wellness goals, creating a more considered approach to cellular support.",
    image: images.ataraDroplet,
    imageAlt: "Champagne water droplet with concentric ripples",
  },
  protocols: {
    heading: "Four protocols. One intentional system.",
    campaignImage: images.ataraCampaign,
    campaignAlt:
      "Atara full product campaign — Radiance, Recovery, Renew protocols with Daily Ritual cream",
    guideImage: images.ataraProtocolsGuide,
    guideAlt: "Atara Our Protocols guide overview",
    cards: [
      {
        id: "radiance",
        name: "Radiance",
        focus: "GHK-Cu",
        description:
          "Support for healthy-looking skin, radiance, and cellular function.",
        image: ataraProducts.radiance,
        panelImage: images.protocolRadiancePanel,
        panelFit: "cover" as const,
        href: "/shop/glow",
      },
      {
        id: "recovery",
        name: "Recovery",
        focus: "TB-500 + BPC-157",
        description:
          "Support for recovery, repair, and overall physical performance.",
        image: ataraProducts.recovery,
        panelImage: images.protocolRecoveryPanel,
        panelFit: "cover" as const,
        href: "/shop/bpc-tb500",
      },
      {
        id: "renew",
        name: "Renew",
        focus: "NAD+",
        description:
          "Support for cellular energy, longevity, and metabolic health.",
        image: ataraProducts.renew,
        panelImage: images.protocolRenewPanel,
        panelFit: "cover" as const,
        href: "/shop/nad-plus",
      },
      {
        id: "refine",
        name: "Refine",
        focus: "Retatrutide",
        description:
          "Support for metabolic refinement, body composition, and energy balance — targeting three receptors: GLP, GIP, and glucagon.",
        image: ataraProducts.refine,
        panelImage: images.protocolRefinePanel,
        panelFit: "cover" as const,
        href: "/shop/refine",
      },
      {
        id: "essential",
        name: "Essential Protocol",
        focus: "All 3 Protocols",
        description: "A comprehensive approach to renewal from within.",
        image: ataraProducts.essential,
        panelImage: ataraProducts.essential,
        panelFit: "cover" as const,
        href: "/shop/essential",
      },
    ],
  },
  ritual: {
    heading: "The ritual continues at the surface.",
    body: "Intentional skincare completes the Atara experience—supporting the visible ritual of care while the protocols focus on wellness from within.",
    productName: "Daily Ritual Skin Renewal Cream",
    image: images.ataraCampaign,
    imageAlt: "Atara Daily Ritual Skin Renewal Cream within the product campaign",
  },
  editorial: {
    lines: ["Beauty is not applied.", "It is cultivated."],
    attribution: "—ATARA",
    image: images.ataraWarmStone,
    imageAlt: "Warm stone surface with soft light and shadow — editorial brand moment",
  },
  standard: {
    label: "The Atara Standard",
    heading: "Considered at every level.",
    body: "Trust built after the story—quiet standards, not loud claims.",
    image: images.ataraStandardBg,
    imageAlt: "Atara protocols and brand packaging on warm stone",
    pillars: [
      {
        title: "Thoughtfully selected formulations",
        body: "Protocols chosen with intention, not volume.",
      },
      {
        title: "Science-informed protocols",
        body: "Curated around targeted cellular signaling goals.",
      },
      {
        title: "Quality and transparency",
        body: "Clear labeling and accountable presentation.",
      },
      {
        title: "Intentional wellness",
        body: "A considered system for radiance, recovery, and renewal.",
      },
    ],
  },
  founder: {
    heading: "A note from the curator.",
    credit: "Curated by Lauren Lease",
    /** PLACEHOLDER — replace with approved founder copy when supplied */
    body: "[FOUNDER COPY PLACEHOLDER] Lauren’s perspective on cellular wellness, intentional beauty, and living well will appear here once approved founder copy is supplied.",
    image: images.ataraBrandCard,
    imageAlt: "Atara brand card featuring curator Lauren Lease",
  },
  brandStatement: {
    brand: "Atara",
    lines: ["Cellular wellness.", "Intentional beauty."],
    credit: "Curated by Lauren Lease",
  },
  invitation: {
    statement: "Begin within.",
    actionLabel: "Explore the Protocols",
    href: "/shop",
    wordmark: images.ataraWordmark,
    wordmarkAlt: "Atara wordmark",
  },
  /** Retained keys for shared Archon components still referenced elsewhere */
  featured: {
    eyebrow: "The protocols",
    headline: "Four protocols. One intentional system.",
    viewAllLabel: "View all products",
    viewAllHref: "/shop",
    spotlightSlug: "bpc-tb500",
    spotlightLine:
      "Radiance, Recovery, Renew, and Refine—curated as an intentional system.",
    exploreLabel: "Explore protocol",
  },
  brandStrip: "Radiance. Recovery. Renew. Refine.",
  statement: {
    headline: ["Beauty is not", "applied."],
    body: "It is cultivated—supported at the cellular level, completed through ritual.",
  },
  poweredBy: {
    headline: "Powered by intention",
    body: [
      "Small signals.",
      "Meaningful change.",
      "Wellness begins within.",
    ],
  },
  stackSelector: {
    eyebrow: "The protocols",
    headline: "Select your pathway.",
    scrollHint: "Scroll to browse the protocols",
    viewLabel: "View protocol",
  },
  labBench: {
    eyebrow: "The protocols",
    headline: "The lineup.",
    scrollHint: "Scroll to explore",
    viewLabel: "View product",
    dosageLabel: "Strength",
  },
  featureShowcase: {
    protocol: "ATARA // WHY?",
    headline: ["Intention at", "every layer"],
  },
  features: [
    {
      id: "formulation",
      label: "Formulation integrity",
      title: "Every protocol,\nconsidered.",
      body: "Thoughtfully curated peptide protocols and intentional skincare—selected for clarity of purpose.",
      stamp: "INTENTION // VERIFIED",
    },
    {
      id: "recovery",
      label: "Recovery & radiance",
      title: "Built for\nrestoration.",
      body: "From cellular support to visible ritual—formulations designed for a considered wellness practice.",
      stamp: "ACTIVE PROTOCOL // DIALED",
    },
    {
      id: "clarity",
      label: "Renewal",
      title: "Energy where\nit counts.",
      body: "Support for cellular energy, longevity-focused wellness, and metabolic health.",
      stamp: "RENEWAL // NO COMPROMISE",
    },
  ],
  routine: {
    headline: "The ritual,\ncontinued.",
    body: "Intentional skincare completes the Atara experience—supporting the visible ritual of care while the protocols focus on wellness from within.",
    points: [
      "Cellular protocols from within",
      "Daily ritual at the surface",
      "One intentional system",
    ],
  },
  trust: [
    {
      title: "Thoughtfully selected",
      body: "Formulations chosen with intention.",
    },
    {
      title: "Science-informed",
      body: "Protocols curated around targeted goals.",
    },
    {
      title: "Quality & transparency",
      body: "Clear presentation you can trust.",
    },
    {
      title: "Intentional wellness",
      body: "Radiance, recovery, and renewal—together.",
    },
  ],
  trustSection: {
    eyebrow: "Standards",
    headline: "The Atara standard.",
    body: "Quiet standards after the story—thoughtful formulations, science-informed protocols, and intentional wellness.",
    pillars: [
      {
        value: "Select",
        label: "Thoughtful formulations",
        detail: "Protocols chosen with intention, not volume.",
      },
      {
        value: "Science",
        label: "Informed protocols",
        detail: "Curated around targeted cellular signaling goals.",
      },
      {
        value: "Clear",
        label: "Quality & transparency",
        detail: "Accountable presentation and clear labeling.",
        href: "/coa",
      },
      {
        value: "Within",
        label: "Intentional wellness",
        detail: "A considered system for radiance, recovery, and renewal.",
      },
    ],
  },
  cta: {
    headline: "Begin within.",
    button: "Explore the Protocols",
    href: "/shop",
  },
} as const;
