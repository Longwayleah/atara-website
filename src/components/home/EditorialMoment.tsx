"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 8 — editorial pause */
export function EditorialMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { editorial } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70svh] overflow-hidden bg-[#8B7B6A] text-archon-cream md:min-h-[80svh]"
    >
      <Image
        src={editorial.image}
        alt={editorial.imageAlt}
        fill
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
        loading="lazy"
      />
      {/* Soft veil so Soft Ivory type stays legible on the stone */}
      <div className="absolute inset-0 bg-[#3E3934]/28" />
      <div className="relative z-10 flex min-h-[70svh] items-center justify-center px-6 py-24 md:min-h-[80svh] md:py-32">
        <div className="max-w-3xl text-center">
          {editorial.lines.map((line) => (
            <p
              key={line}
              data-reveal
              className="font-display text-3xl font-medium tracking-[-0.02em] text-[#F5F1EB] md:text-6xl md:leading-[1.15]"
            >
              {line}
            </p>
          ))}
          {editorial.attribution ? (
            <p
              data-reveal
              className="mt-8 font-display text-sm tracking-[0.28em] text-[#F5F1EB]/85 md:mt-10 md:text-base"
            >
              {editorial.attribution}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
