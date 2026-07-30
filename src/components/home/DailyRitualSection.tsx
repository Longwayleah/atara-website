"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 7 — Daily Ritual cream as companion to protocols */
export function DailyRitualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { ritual } = homepageCopy;

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
      className="border-t border-archon-charcoal/10 bg-archon-sand/35 py-24 text-archon-charcoal md:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p
              data-reveal
              className="font-body text-[10px] uppercase tracking-[0.28em] text-archon-electric"
            >
              {ritual.productName}
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] md:text-5xl"
            >
              {ritual.heading}
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-md font-body text-sm leading-relaxed text-archon-charcoal/75 md:text-base md:leading-[1.75]"
            >
              {ritual.body}
            </p>
          </div>
          <div data-reveal className="relative lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={ritual.image}
                alt={ritual.imageAlt}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-[70%_center]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
