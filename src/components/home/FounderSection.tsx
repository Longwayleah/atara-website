"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 10 — founder / curator note */
export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { founder } = homepageCopy;

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
      className="border-t border-archon-charcoal/10 bg-archon-sand/30 py-24 text-archon-charcoal md:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2
              data-reveal
              className="font-display text-3xl font-medium tracking-[-0.02em] md:text-5xl"
            >
              {founder.heading}
            </h2>
            <p
              data-reveal
              className="mt-4 font-body text-[11px] uppercase tracking-[0.22em] text-archon-electric"
            >
              {founder.credit}
            </p>
            <p
              data-reveal
              className="mt-6 max-w-lg font-body text-sm leading-relaxed text-archon-charcoal/75 md:text-base md:leading-[1.75]"
            >
              {founder.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
