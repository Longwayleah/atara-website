"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { HeroVial } from "./HeroVial";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollyStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const els = sectionRef.current.querySelectorAll("[data-statement-enter]");
      gsap.from(els, {
        y: 40,
        opacity: 0,
        immediateRender: false,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-[#010308] text-white"
    >
      <p
        data-statement-enter
        className="absolute left-6 top-8 z-10 font-display text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[0.85] tracking-[-0.02em] md:left-10 md:top-10 lg:left-16"
      >
        {homepageCopy.hero.brand}
      </p>

      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="grid w-full items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12">
          {/* Left — headline, left-aligned in frame */}
          <div data-statement-enter className="min-w-0 md:pr-4 lg:pr-8">
            <h2 className="max-w-[min(100%,20rem)] font-display text-[clamp(1.75rem,3.8vw,3.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-left md:max-w-[min(100%,18rem)] lg:max-w-[20rem]">
              <span className="block">{homepageCopy.statement.headline[0]}</span>
              <span className="block">{homepageCopy.statement.headline[1]}</span>
            </h2>
          </div>

          {/* Center — vial */}
          <div data-statement-enter className="flex shrink-0 justify-center">
            <div className="h-[min(42vh,400px)] w-[min(72vw,280px)] md:h-[min(45vh,420px)] md:w-[260px] lg:w-[280px]">
              <HeroVial alt="Atara peptide vial" className="h-full w-full" dark />
            </div>
          </div>

          {/* Right — body copy */}
          <div data-statement-enter className="min-w-0 md:pl-4 lg:pl-8">
            <p className="max-w-[min(100%,22rem)] font-body text-sm leading-relaxed text-white/65 md:text-[15px] md:leading-[1.75]">
              {homepageCopy.statement.body}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden md:block lg:bottom-8 lg:right-10">
        <div className="mb-2 w-8 border-t border-dotted border-white/20" />
        <p className="font-body text-[9px] uppercase tracking-[0.25em] text-white/35">
          Precision formulated
        </p>
      </div>
    </section>
  );
}
