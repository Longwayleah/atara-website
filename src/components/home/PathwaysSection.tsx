"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 4 — three wellness pathways */
export function PathwaysSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { pathways } = homepageCopy;

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
          duration: 0.95,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-archon-charcoal/10 bg-archon-sand/40 py-24 text-archon-charcoal md:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-reveal
            className="font-display text-3xl font-medium tracking-[-0.02em] md:text-5xl"
          >
            {pathways.heading}
          </h2>
          <p
            data-reveal
            className="mt-4 font-body text-sm leading-relaxed text-archon-charcoal/70 md:text-base"
          >
            {pathways.body}
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-0">
          {pathways.items.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              className="relative px-2 text-center md:px-10"
            >
              {index > 0 ? (
                <div
                  className="pointer-events-none absolute left-0 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-archon-charcoal/15 md:block"
                  aria-hidden
                />
              ) : null}
              <p className="font-body text-[10px] uppercase tracking-[0.28em] text-archon-electric">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] md:text-3xl">
                {item.title}
              </h3>
              <div className="mx-auto mt-4 h-px w-10 bg-archon-electric/70" />
              <p className="mx-auto mt-5 max-w-xs font-body text-sm leading-relaxed text-archon-charcoal/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
