"use client";

import Link from "next/link";
import { useRef } from "react";
import { homepageCopy } from "@/config/homepage";
import { HeroCornerLogo } from "./HeroCornerLogo";
import { HeroTopWordmark } from "./HeroTopWordmark";
import { HeroLuxuryField } from "./HeroLuxuryField";
import { HeroVial } from "./HeroVial";
import { useHeroParallax } from "./HeroParallaxScroll";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

/** Award-level hero — vial focal center, typography frames the scene */
export function EditorialHero() {
  const { hero } = homepageCopy;
  const sectionRef = useRef<HTMLElement>(null);

  useHeroParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="editorial-hero relative min-h-[100svh] w-full overflow-hidden bg-white text-archon-navy"
    >
      <HeroLuxuryField />
      <HeroTopWordmark />

      {/* Right — precision peptides + body */}
      <div
        data-hero-splash-defer
        className="absolute right-[var(--hero-mobile-copy-inset-x)] z-20 max-md:w-[min(38vw,10.25rem)] max-md:text-left top-[var(--hero-mobile-copy-top)] md:right-[var(--hero-inset-x)] md:top-1/2 md:max-w-[18.75rem] md:w-auto md:-translate-y-1/2 lg:right-[var(--hero-inset-x-lg)] lg:max-w-[20rem]"
      >
        <div
          data-hero-reveal="copy"
          data-hero-parallax="copy"
          className="will-change-transform"
        >
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-archon-navy/50 max-md:whitespace-nowrap md:text-[11px] md:tracking-[0.28em]">
          {hero.subheadline}
        </p>

        <p className="mt-2.5 font-body text-[12px] leading-[1.62] text-archon-charcoal/80 md:mt-4 md:text-sm md:leading-relaxed">
          Formulated to{" "}
          <span className="text-archon-navy">lift recovery</span>,{" "}
          <span className="text-archon-navy/85">sharpen performance</span>, and{" "}
          <span className="text-archon-navy">fit the routines</span> you run every day.
        </p>

        <Link
          href={hero.exploreHref}
          className="group mt-2.5 inline-flex items-center gap-1 font-body text-[8px] font-semibold uppercase leading-tight tracking-[0.14em] text-archon-navy transition-colors hover:text-archon-navy/60 md:mt-6 md:gap-2 md:text-[11px] md:tracking-[0.22em]"
        >
          {hero.exploreLabel}
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
            className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-[10px] md:w-[10px]"
          >
            <path
              d="M1 9L9 1M9 1H3M9 1V7"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        </div>
      </div>

      {/* Lower-left — headline */}
      <div
        data-hero-splash-defer
        className="absolute left-[var(--hero-inset-x)] z-20 max-w-[min(82vw,26.25rem)] bottom-[calc(var(--hero-headline-bottom)+env(safe-area-inset-bottom))] lg:left-[var(--hero-inset-x-lg)] lg:max-w-[28.75rem]"
      >
        <div data-hero-reveal="headline" data-hero-parallax="headline" className="will-change-transform">
        <h1 className="font-display font-semibold uppercase leading-[1.08] tracking-[0.04em] text-archon-navy/88 max-md:max-w-[11.25rem] max-md:tracking-[0.02em]">
          <span className="block text-[clamp(1.35rem,3.2vw,2.35rem)] max-md:text-[clamp(1.15rem,2.75vw,1.95rem)]">
            {hero.headline[0]}
          </span>
          <span className="hero-glow-word block text-[clamp(1.5rem,3.6vw,2.65rem)] max-md:text-[clamp(1.3rem,3vw,2.1rem)]">
            {hero.headline[1]}
          </span>
          <span className="block text-[clamp(1.35rem,3.2vw,2.35rem)] max-md:text-[clamp(1.1rem,2.65vw,1.85rem)]">
            {hero.headline[2]}
          </span>
        </h1>
        </div>
      </div>

      <div data-hero-splash-defer>
        <div data-hero-reveal="logo" data-hero-parallax="logo" className="will-change-transform">
          <HeroCornerLogo />
        </div>
      </div>

      {/* Center — vial as focal point */}
      <div
        data-hero-splash-defer
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center pt-[var(--hero-vial-offset-top)] max-md:pt-[var(--hero-mobile-vial-pad-top)] max-md:pb-[calc(var(--hero-mobile-vial-pad-bottom)+env(safe-area-inset-bottom))] max-md:translate-x-[var(--hero-mobile-vial-shift-x)] -translate-y-[var(--hero-vial-shift)]"
      >
        <div
          data-hero-reveal="vial"
          data-hero-parallax="vial"
          className="flex h-full w-full items-center justify-center will-change-transform"
        >
        <div className="hero-product-stage relative aspect-[4/5] w-[var(--hero-vial-width)] max-w-[var(--hero-vial-max)] origin-center scale-[var(--hero-vial-scale)]">
          <HeroVial
            alt={`${hero.modelLabel} — Atara precision peptide`}
            src={hero.heroImage}
            priority
            centered
            className="relative z-[1] h-full w-full"
          />
        </div>
        </div>
      </div>

      <div
        data-hero-splash-defer
        data-hero-parallax="scroll"
        className="absolute inset-x-0 bottom-[calc(var(--hero-scroll-bottom)+env(safe-area-inset-bottom))] z-10 flex justify-center will-change-transform"
      >
        <ScrollIndicator minimal label={hero.scrollLabel} />
      </div>

    </section>
  );
}
