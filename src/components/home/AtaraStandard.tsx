"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 9 — cream editorial panel over product photo */
export function AtaraStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { standard } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
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
      aria-label={standard.imageAlt}
    >
      <div className="relative flex min-h-[100svh] items-center justify-center px-5 py-16 md:px-10 md:py-24">
        <Image
          src={standard.image}
          alt={standard.imageAlt}
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />

        <div
          data-reveal
          className="relative z-10 mx-auto w-full max-w-md bg-[#F5F1EB] px-8 py-10 text-[#3E3934] md:max-w-lg md:px-12 md:py-14"
        >
          <p className="font-body text-[10px] font-medium uppercase tracking-[0.32em] text-[#8B7B6A]">
            {standard.label}
          </p>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.02em] md:text-[2.65rem] md:leading-[1.12]">
            {standard.heading}
          </h2>
          <div className="mt-6 h-px w-10 bg-[#B38C5A]" aria-hidden />

          <ul className="mt-8 space-y-8 md:mt-10 md:space-y-9">
            {standard.pillars.map((pillar) => (
              <li key={pillar.title}>
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] md:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#3E3934]/70">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
