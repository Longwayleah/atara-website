"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Golden droplet + brand statement — one cohesive full-bleed moment.
 */
export function ScienceTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { science, brandIntro } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 22 },
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
      className="relative overflow-hidden bg-[#3E3934]"
      aria-label={science.imageAlt}
    >
      <div className="relative min-h-[100svh] w-full">
        <Image
          src={science.image}
          alt={science.imageAlt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#3E3934]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E3934]/25 via-transparent to-[#3E3934]/55" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p
              data-reveal
              className="font-display text-3xl font-medium tracking-[-0.02em] text-[#F5F1EB] md:text-5xl md:leading-[1.15]"
            >
              {brandIntro.statement}
            </p>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-[#F5F1EB]/85 md:mt-8 md:text-base md:leading-[1.7]"
            >
              {brandIntro.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
