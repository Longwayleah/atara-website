/**
 * Atara design system — affiliate storefront tokens.
 * CSS class names retain the Archon token namespace for plug-and-play reuse;
 * values map to the approved Atara palette.
 */

export const colors = {
  /** Charcoal Espresso — primary dark / backgrounds */
  navy: "#3E3934",
  navyLight: "#3E3934",
  /** Hero / atmosphere base */
  heroBg: "#3E3934",
  heroBgToken: "#3E3934",
  /** Mid-tone brand warm neutrals */
  royal: "#8B7B6A",
  royalDeep: "#3E3934",
  royalVivid: "#8B7B6A",
  /** Champagne Bronze — buttons, fine details, accents */
  electric: "#B38C5A",
  electricSoft: "#B38C5A",
  /** Neutrals */
  black: "#3E3934",
  charcoal: "#3E3934",
  white: "#FFFFFF",
  cream: "#F5F1EB",
  sand: "#D7CDC0",
  silver: "#8B7B6A",
  silverMid: "#8B7B6A",
  silverLight: "#D7CDC0",
  silverChrome: "#B38C5A",
  silverHighlight: "#F5F1EB",
  /** Named Atara palette — exclusive brand colors */
  charcoalEspresso: "#3E3934",
  warmTaupe: "#8B7B6A",
  stone: "#D7CDC0",
  softIvory: "#F5F1EB",
  champagneBronze: "#B38C5A",
} as const;

export const motion = {
  ease: {
    outExpo: "expo.out",
    outQuart: "quart.out",
    inOutCubic: "cubic.inOut",
    cinematic: "power3.inOut",
  },
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
    cinematic: 1.8,
    scrollScrub: 1,
  },
  scroll: {
    duration: 1.2,
    touchMultiplier: 1.5,
  },
  scrollTrigger: {
    scrub: 0.8,
    pinSpacing: true,
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const zIndex = {
  background: 0,
  webgl: 5,
  content: 10,
  watermark: 15,
  header: 50,
  overlay: 60,
  splash: 100,
} as const;

export const typography = {
  /** Display — Canela (Cormorant Garamond fallback until licensed files are supplied) */
  displayTracking: "-0.01em",
  /** Body / UI — supporting sans */
  labelTracking: "0.22em",
  navTracking: "0.18em",
} as const;

export type ArchonColor = keyof typeof colors;
