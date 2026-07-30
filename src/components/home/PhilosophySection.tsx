"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 2 — cinematic philosophy with coastal landscape */
export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { philosophy } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-archon-charcoal text-archon-cream"
    >
      <div className="relative min-h-[85svh] w-full md:min-h-[92svh]">
        <Image
          src={philosophy.image}
          alt={philosophy.imageAlt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-archon-charcoal/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-archon-charcoal/70 via-archon-charcoal/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h2
              data-reveal
              className="font-display text-4xl font-medium tracking-[-0.02em] text-archon-cream md:text-6xl lg:text-7xl"
            >
              {philosophy.heading}
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl font-body text-sm leading-relaxed text-archon-cream/85 md:mt-8 md:text-base md:leading-[1.7]"
            >
              {philosophy.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
