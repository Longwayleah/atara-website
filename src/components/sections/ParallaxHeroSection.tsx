"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ParallaxHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const section = sectionRef.current;

      // Background — moves slowest, scales up as you scroll (deep parallax)
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: "-18%", scale: 1.25 },
          {
            y: "18%",
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }

      // Dark overlay intensifies on scroll for text legibility shift
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0.35 },
          {
            opacity: 0.75,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Headline — moves faster than background (foreground parallax)
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 0, opacity: 1 },
          {
            y: 180,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      // Subline — slightly different speed for layered depth
      if (sublineRef.current) {
        gsap.fromTo(
          sublineRef.current,
          { y: 0, opacity: 1 },
          {
            y: 120,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "70% top",
              scrub: 0.5,
            },
          },
        );
      }

      // Badge floats upward faster
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { y: 0 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[130vh] overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/hero-parallax-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Gradient overlays for contrast */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"
        aria-hidden
      />

      {/* Sticky text layer — stays in view while background parallaxes behind */}
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
          <div ref={badgeRef} className="mb-8 will-change-transform">
            <span className="inline-block border border-white/40 bg-black/30 px-4 py-2 font-body text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-sm">
              Scroll to feel the depth
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="max-w-[14ch] font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.04em] text-white will-change-transform"
            style={{
              textShadow: "0 4px 60px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            Beyond
            <br />
            <span className="text-archon-glow">the surface</span>
          </h1>

          <p
            ref={sublineRef}
            className="mt-8 max-w-md font-body text-lg font-light leading-relaxed text-white/90 will-change-transform md:text-xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
          >
            A layered parallax experience — watch the world move beneath you as
            you scroll.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/70">
            Scroll
          </span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
