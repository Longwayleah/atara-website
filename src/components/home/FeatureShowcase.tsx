"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FeatureSlideVisual } from "./FeatureSlideVisual";

type Feature = (typeof homepageCopy.features)[number];

const SLIDE_VARIANTS = ["dark", "light", "cream"] as const;
type SlideVariant = (typeof SLIDE_VARIANTS)[number];
type SlideTheme = "formulation" | "recovery" | "clarity";

function FeatureStamp({ label, light }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn("h-px w-8", light ? "bg-[#e86a2a]/70" : "bg-[#e86a2a]/55")}
        aria-hidden
      />
      <p
        className={cn(
          "font-body text-[9px] font-medium uppercase tracking-[0.22em] md:text-[10px]",
          light ? "text-[#f5f0e8]/45" : "text-archon-navy/40",
        )}
      >
        {label}
      </p>
    </div>
  );
}

function FeatureSlideContent({
  feature,
  index,
  variant,
  showSectionHeadline = false,
}: {
  feature: Feature;
  index: number;
  variant: SlideVariant;
  showSectionHeadline?: boolean;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const isDark = variant === "dark";
  const [line1, line2] = homepageCopy.featureShowcase.headline;

  return (
    <div
      className={cn(
        "relative flex h-full min-w-0 flex-col items-start justify-start overflow-hidden px-8 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28 lg:px-16 xl:px-20",
        isDark && "bg-[#0b1f3a] text-[#f5f0e8]",
        variant === "light" && "bg-white text-archon-navy",
        variant === "cream" && "bg-[#f7f7f4] text-archon-navy",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute left-6 top-6 font-display text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none tracking-[-0.05em] md:left-10 md:top-8",
          isDark ? "feature-index-outline--light" : "feature-index-outline",
        )}
        aria-hidden
      >
        {indexLabel}
      </span>

      <div className="relative z-10 w-full min-w-0 max-w-lg text-left" data-feature-enter>
        {showSectionHeadline && (
          <header className="mb-8 md:mb-10">
            <p
              className={cn(
                "font-body text-[10px] uppercase tracking-[0.32em]",
                isDark ? "text-[#f5f0e8]/40" : "text-archon-navy/40",
              )}
            >
              Why Atara
            </p>
            <h2
              className={cn(
                "mt-4 max-w-[14ch] font-display text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]",
                isDark ? "text-[#f5f0e8]" : "text-archon-navy",
              )}
            >
              <span className="block">{line1}</span>
              <span className="block text-[#e86a2a]">{line2}</span>
            </h2>
          </header>
        )}

        <p
          className={cn(
            "font-body text-[10px] uppercase tracking-[0.28em]",
            isDark ? "text-[#e86a2a]/90" : "text-archon-navy/45",
          )}
        >
          {feature.label}
        </p>

        <h3
          className={cn(
            "mt-5 w-full max-w-[15ch] font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em]",
            showSectionHeadline
              ? "text-[clamp(1.65rem,3.2vw,2.5rem)]"
              : "text-[clamp(1.85rem,3.8vw,3rem)]",
            isDark ? "text-[#f5f0e8]" : "text-archon-navy",
          )}
        >
          {feature.title.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <p
          className={cn(
            "mt-5 max-w-[32ch] font-body text-sm leading-[1.75] md:mt-6 md:text-[15px]",
            isDark ? "text-[#f5f0e8]/58" : "text-archon-muted",
          )}
        >
          {feature.body}
        </p>

        <div
          className={cn(
            "mt-8 border-t pt-6 md:mt-10 md:pt-8",
            isDark ? "border-dotted border-[#f5f0e8]/18" : "border-archon-navy/10",
          )}
        >
          <FeatureStamp label={feature.stamp} light={isDark} />
        </div>
      </div>
    </div>
  );
}

function FeatureSlide({
  feature,
  index,
  variant,
}: {
  feature: Feature;
  index: number;
  variant: SlideVariant;
}) {
  return (
    <article
      data-feature-slide
      className="feature-stack-slide relative grid min-h-screen grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <FeatureSlideContent
        feature={feature}
        index={index}
        variant={variant}
        showSectionHeadline={index === 0}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-10 hidden w-px -translate-x-1/2 bg-white/10 md:block"
      />
      <FeatureSlideVisual theme={feature.id as SlideTheme} index={index} />
    </article>
  );
}

export function FeatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const features = homepageCopy.features;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const slides = sectionRef.current.querySelectorAll("[data-feature-slide]");
      slides.forEach((slide) => {
        gsap.from(slide.querySelectorAll("[data-feature-enter]"), {
          y: 28,
          opacity: 0,
          immediateRender: false,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 72%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="why-archon" className="relative bg-[#e8e8e5]">
      {features.map((feature, index) => (
        <FeatureSlide
          key={feature.id}
          feature={feature}
          index={index}
          variant={SLIDE_VARIANTS[index]}
        />
      ))}
    </section>
  );
}
