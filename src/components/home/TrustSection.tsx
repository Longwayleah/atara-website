"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import { StandardsWallStage } from "./StandardsWallStage";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

function resetStandardsReveal(section: HTMLElement) {
  const copyEls = section.querySelectorAll("[data-standards-enter]");
  const wall = section.querySelector("[data-standards-wall]");
  const facts = section.querySelectorAll("[data-standards-fact]");

  gsap.set(copyEls, { autoAlpha: 0, y: 22 });
  if (wall) {
    gsap.set(wall, {
      autoAlpha: 0,
      scale: 0.984,
      transformOrigin: "50% 50%",
      force3D: true,
    });
  }
  facts.forEach((fact) => {
    const depth = Number(fact.getAttribute("data-fact-depth") ?? 50);
    gsap.set(fact, {
      autoAlpha: 0,
      y: 8 + depth * 0.08,
      force3D: true,
    });
  });
}

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { trustSection } = homepageCopy;
  const reduced = usePrefersReducedMotion();
  const splashComplete = useAppStore((s) => s.splashComplete);

  useGSAP(
    () => {
      if (reduced || !splashComplete || !sectionRef.current) return;

      const section = sectionRef.current;
      const copyEls = section.querySelectorAll("[data-standards-enter]");
      const wall = section.querySelector("[data-standards-wall]");
      const facts = section.querySelectorAll("[data-standards-fact]");

      if (!copyEls.length) return;

      resetStandardsReveal(section);

      const reveal = gsap
        .timeline({ paused: true })
        .to(copyEls, {
          autoAlpha: 1,
          y: 0,
          duration: 0.88,
          stagger: 0.11,
          ease: "power3.out",
        })
        .to(
          wall,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.42",
        )
        .to(
          facts,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: { each: 0.09, from: "random" },
            ease: "power2.out",
          },
          "-=0.62",
        );

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: () => reveal.restart(true),
        onEnterBack: () => reveal.restart(true),
      });

      const resetTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => resetStandardsReveal(section),
        onLeaveBack: () => resetStandardsReveal(section),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        trigger.kill();
        resetTrigger.kill();
        reveal.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced, splashComplete] },
  );

  useGSAP(
    () => {
      if (reduced || !splashComplete || !sectionRef.current) return;

      const section = sectionRef.current;
      const wall = section.querySelector("[data-standards-wall-parallax]");
      const factLayers = section.querySelectorAll("[data-standards-fact-parallax]");

      const parallaxConfig = {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.85,
      };

      const triggers: ScrollTrigger[] = [];

      if (wall) {
        gsap.set(wall, { transformOrigin: "50% 50%", force3D: true });

        const wallParallax = gsap.fromTo(
          wall,
          { y: 56, scale: 1.03 },
          {
            y: -56,
            scale: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: parallaxConfig,
          },
        );
        if (wallParallax.scrollTrigger) triggers.push(wallParallax.scrollTrigger);
      }

      factLayers.forEach((layer) => {
        const depth = Number(layer.getAttribute("data-fact-depth") ?? 50);
        const depthFactor = 1 - depth / 100;
        const travel = 14 + depthFactor * 28;

        gsap.set(layer, { force3D: true });

        const factParallax = gsap.fromTo(
          layer,
          { y: travel },
          {
            y: -travel,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              ...parallaxConfig,
              scrub: 0.85 + depthFactor * 0.35,
            },
          },
        );
        if (factParallax.scrollTrigger) triggers.push(factParallax.scrollTrigger);
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [reduced, splashComplete] },
  );

  return (
    <section
      ref={sectionRef}
      className="standards-wall-section relative bg-white px-6 py-20 text-archon-navy md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1024px]">
        <div className="max-w-2xl">
          <p
            data-standards-enter
            className="font-body text-[11px] uppercase tracking-[0.32em] text-archon-muted"
          >
            {trustSection.eyebrow}
          </p>
          <h2
            data-standards-enter
            className="mt-3 font-display text-[clamp(1.55rem,4.2vw,2.75rem)] font-semibold leading-[1.08] text-archon-navy md:text-[clamp(1.75rem,3.5vw,2.75rem)] md:leading-tight"
          >
            {trustSection.headline}
          </h2>
          <p
            data-standards-enter
            className="mt-3 max-w-[34rem] font-body text-[13px] leading-[1.55] text-archon-muted md:mt-4 md:text-sm md:leading-relaxed lg:text-base"
          >
            {trustSection.body}
          </p>
        </div>

        <div className="mt-12">
          <StandardsWallStage />
        </div>
      </div>
    </section>
  );
}
