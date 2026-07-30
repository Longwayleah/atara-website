"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { refreshScroll } from "@/lib/gsap/scroll";
import { motion as motionTokens } from "@/config/design";
import { useMotionSafe } from "@/hooks/useMotionSafe";

type HeroParallaxLayer = {
  selector: string;
  to: gsap.TweenVars;
  scrub?: number | boolean;
};

/** Scroll-out parallax only — starts from the hero's natural layout at rest. */
const HERO_PARALLAX_LAYERS: HeroParallaxLayer[] = [
  {
    selector: '[data-hero-parallax="background"]',
    to: { y: "22%" },
    scrub: 0.5,
  },
  {
    selector: '[data-hero-parallax="vial"]',
    to: { y: 100, scale: 0.9 },
    scrub: 0.9,
  },
  {
    selector: '[data-hero-parallax="wordmark"]',
    to: { y: 180, opacity: 0.12 },
    scrub: 1.05,
  },
  {
    selector: '[data-hero-parallax="headline"]',
    to: { y: 128, opacity: 0 },
    scrub: 1,
  },
  {
    selector: '[data-hero-parallax="copy"]',
    to: { y: 80, opacity: 0 },
    scrub: 0.8,
  },
  {
    selector: '[data-hero-parallax="logo"]',
    to: { y: -72 },
    scrub: 1.15,
  },
  {
    selector: '[data-hero-parallax="scroll"]',
    to: { y: 36, opacity: 0 },
    scrub: 0.9,
  },
];

/** Layered scroll depth for the editorial hero — runs after splash completes. */
export function useHeroParallax(sectionRef: RefObject<HTMLElement | null>) {
  const motionSafe = useMotionSafe();

  useGSAP(
    () => {
      if (!motionSafe || !sectionRef.current) return;

      const section = sectionRef.current;

      const ctx = gsap.context(() => {
        for (const layer of HERO_PARALLAX_LAYERS) {
          const target = section.querySelector(layer.selector);

          if (!target) continue;

          gsap.to(target, {
            ...layer.to,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: layer.scrub ?? motionTokens.scrollTrigger.scrub,
            },
          });
        }
      }, section);

      refreshScroll();

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [motionSafe] },
  );
}
