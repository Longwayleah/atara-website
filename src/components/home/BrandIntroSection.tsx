"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Brand introduction — copy only; droplet follows immediately after */
export function BrandIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { brandIntro } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
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
      className="bg-archon-cream py-24 text-archon-charcoal md:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="font-display text-3xl font-medium tracking-[-0.02em] md:text-5xl"
          >
            {brandIntro.statement}
          </p>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-archon-charcoal/75 md:text-base md:leading-[1.7]"
          >
            {brandIntro.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
