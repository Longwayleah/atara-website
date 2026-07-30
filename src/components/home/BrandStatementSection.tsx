"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Cream brand statement + final CTA — closes the homepage */
export function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { brandStatement, invitation } = homepageCopy;

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
          duration: 1.05,
          stagger: 0.12,
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
      className="flex min-h-[85svh] items-center justify-center bg-[#F5F1EB] px-6 py-24 text-[#3E3934] md:min-h-[92svh] md:py-32"
      aria-label="Atara brand statement"
    >
      <div className="mx-auto max-w-xl text-center">
        <p
          data-reveal
          className="font-display text-[clamp(3.5rem,12vw,6.5rem)] font-medium uppercase leading-none tracking-[0.04em]"
        >
          {brandStatement.brand}
        </p>
        <div data-reveal className="mt-8 space-y-1 md:mt-10">
          {brandStatement.lines.map((line) => (
            <p
              key={line}
              className="font-body text-[10px] font-medium uppercase tracking-[0.32em] text-[#3E3934]/80 md:text-[11px] md:tracking-[0.36em]"
            >
              {line}
            </p>
          ))}
        </div>
        <div
          data-reveal
          className="mx-auto mt-8 h-px w-12 bg-[#B38C5A] md:mt-10"
          aria-hidden
        />
        <p
          data-reveal
          className="mt-8 font-body text-[10px] font-medium uppercase tracking-[0.32em] text-[#3E3934]/75 md:mt-10 md:text-[11px] md:tracking-[0.36em]"
        >
          {brandStatement.credit}
        </p>
        <Link
          data-reveal
          href={invitation.href}
          className="mt-12 inline-flex items-center justify-center border border-[#B38C5A] bg-transparent px-8 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3E3934] transition-colors hover:bg-[#B38C5A] hover:text-[#F5F1EB] md:mt-14"
        >
          {invitation.actionLabel}
        </Link>
      </div>
    </section>
  );
}
