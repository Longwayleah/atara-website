"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { images } from "@/config/assets";
import { Container } from "@/components/ui/Container";
import { HeroTopWordmark } from "./HeroTopWordmark";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Scroll-scrub breath phases — proportions of the full timeline */
const BREATH = {
  expand: 0.84,
  float: 0.91,
  exhale: 0.97,
} as const;

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const stage = section.querySelector<HTMLElement>("[data-final-cta-wordmark]");
      const wordmark = section.querySelector<HTMLElement>(
        ".final-cta-wordmark-wrap .hero-top-wordmark",
      );
      const cta = section.querySelector<HTMLElement>("[data-final-cta-link]");

      if (!stage) return;

      if (reduced) {
        gsap.set([stage, wordmark, cta].filter(Boolean), { clearProps: "all" });
        return;
      }

      gsap.set(stage, { transformOrigin: "center center", force3D: true });
      if (wordmark) {
        gsap.set(wordmark, { transformOrigin: "center center", force3D: true });
      }
      if (cta) {
        gsap.set(cta, {
          transformOrigin: "center center",
          force3D: true,
          opacity: 0,
          y: 14,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 8%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        stage,
        { scale: 0.84, y: 22, opacity: 0.28, filter: "blur(8px)" },
        {
          scale: 1.06,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "expo.out",
          duration: BREATH.expand,
        },
        0,
      )
        .to(
          stage,
          {
            scale: 1.055,
            y: -2,
            ease: "sine.inOut",
            duration: BREATH.float - BREATH.expand,
          },
          BREATH.expand,
        )
        .to(
          stage,
          {
            scale: 1.018,
            y: 0,
            ease: "sine.out",
            duration: BREATH.exhale - BREATH.float,
          },
          BREATH.float,
        )
        .to(
          stage,
          {
            scale: 1,
            y: 0,
            ease: "sine.inOut",
            duration: 1 - BREATH.exhale,
          },
          BREATH.exhale,
        );

      if (wordmark) {
        tl.fromTo(
          wordmark,
          { scaleX: 0.96, scaleY: 0.93 },
          {
            scaleX: 1.024,
            scaleY: 1.028,
            ease: "expo.out",
            duration: BREATH.expand,
          },
          0,
        )
          .to(
            wordmark,
            {
              scaleX: 1.022,
              scaleY: 1.026,
              ease: "sine.inOut",
              duration: BREATH.float - BREATH.expand,
            },
            BREATH.expand,
          )
          .to(
            wordmark,
            {
              scaleX: 1.008,
              scaleY: 1.01,
              ease: "sine.out",
              duration: BREATH.exhale - BREATH.float,
            },
            BREATH.float,
          )
          .to(
            wordmark,
            {
              scaleX: 1,
              scaleY: 1,
              ease: "sine.inOut",
              duration: 1 - BREATH.exhale,
            },
            BREATH.exhale,
          );
      }

      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            ease: "sine.out",
            duration: 1 - BREATH.expand,
          },
          BREATH.expand,
        );
      }

      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-archon-navy/8 bg-archon-cream py-32 text-archon-navy md:py-48"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.elevateRoutineBackground}
          alt=""
          fill
          priority={false}
          quality={90}
          sizes="100vw"
          className="object-fill object-center"
        />
        <div className="absolute inset-0 bg-archon-cream/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(255,255,255,0.35)_0%,transparent_70%)]" />
      </div>

      <HeroTopWordmark variant="cta" />

      <Container className="relative z-[1]">
        <div className="flex justify-center pt-[clamp(5.75rem,16vh,10.5rem)]">
          <Link
            data-final-cta-link
            href={homepageCopy.cta.href}
            className="group inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-archon-navy transition-colors hover:text-archon-navy/60"
          >
            {homepageCopy.hero.exploreLabel}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
