"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function RoutineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector("[data-routine-left]"), {
        x: -40,
        opacity: 0,
        immediateRender: false,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(sectionRef.current.querySelector("[data-routine-right]"), {
        x: 40,
        opacity: 0,
        immediateRender: false,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} className="bg-archon-white py-24 md:py-40">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Lifestyle collage placeholder */}
          <div data-routine-left className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-archon-sand to-archon-cream" />
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-archon-navy/10 to-archon-cream" />
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-archon-cream to-archon-sand" />
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-archon-navy/15 to-archon-sand" />
            </div>
          </div>

          <div data-routine-right>
            <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
              The Routine
            </p>
            <h2 className="mt-4 whitespace-pre-line font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[-0.02em] text-archon-navy">
              {homepageCopy.routine.headline}
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-archon-muted md:text-lg">
              {homepageCopy.routine.body}
            </p>
            <ul className="mt-8 space-y-4">
              {homepageCopy.routine.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-4 font-body text-sm text-archon-navy"
                >
                  <span className="h-px w-8 bg-archon-navy/30" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
