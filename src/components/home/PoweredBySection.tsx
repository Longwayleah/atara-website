"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { images } from "@/config/assets";
import { motion as motionTokens } from "@/config/design";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useInViewport } from "@/hooks/useInViewport";

function resetPoweredReveal(section: HTMLElement) {
  const words = section.querySelectorAll("[data-powered-word]");
  const lines = section.querySelectorAll("[data-powered-line]");

  gsap.set(words, { y: "110%", opacity: 0 });
  gsap.set(lines, { y: 18, opacity: 0 });
}

export function PoweredBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshStageRef = useRef<HTMLDivElement>(null);
  const waveFlowRef = useRef<HTMLDivElement>(null);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);
  const reduced = usePrefersReducedMotion();
  const motionSafe = useMotionSafe();
  const inView = useInViewport(meshStageRef);
  const { poweredBy } = homepageCopy;
  const headlineWords = poweredBy.headline.split(" ");

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const section = sectionRef.current;
      const words = section.querySelectorAll("[data-powered-word]");
      const lines = section.querySelectorAll("[data-powered-line]");

      if (!words.length && !lines.length) return;

      resetPoweredReveal(section);

      const reveal = gsap
        .timeline({ paused: true })
        .to(words, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.07,
          ease: "power3.out",
        })
        .to(
          lines,
          {
            y: 0,
            opacity: 1,
            duration: 0.88,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.35",
        );

      const playReveal = () => reveal.restart(true);

      const revealTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: playReveal,
        onEnterBack: playReveal,
        onLeave: () => resetPoweredReveal(section),
        onLeaveBack: () => resetPoweredReveal(section),
      });

      if (revealTrigger.isActive) {
        playReveal();
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        revealTrigger.kill();
        reveal.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (reduced || !motionSafe || !sectionRef.current) return;

      const section = sectionRef.current;
      const headline = section.querySelector('[data-powered-parallax="headline"]');
      const body = section.querySelector('[data-powered-parallax="body"]');

      const parallaxBase = {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
      };

      const triggers: ScrollTrigger[] = [];

      if (headline) {
        const headlineParallax = gsap.fromTo(
          headline,
          { y: 28 },
          {
            y: -28,
            ease: "none",
            scrollTrigger: {
              ...parallaxBase,
              scrub: motionTokens.scrollTrigger.scrub,
            },
          },
        );
        if (headlineParallax.scrollTrigger) {
          triggers.push(headlineParallax.scrollTrigger);
        }
      }

      if (body) {
        const bodyParallax = gsap.fromTo(
          body,
          { y: 16 },
          {
            y: -44,
            ease: "none",
            scrollTrigger: {
              ...parallaxBase,
              scrub: 1.05,
            },
          },
        );
        if (bodyParallax.scrollTrigger) {
          triggers.push(bodyParallax.scrollTrigger);
        }
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [reduced, motionSafe] },
  );

  useGSAP(
    () => {
      if (reduced || !motionSafe || !waveFlowRef.current) return;

      const mesh = waveFlowRef.current;
      gsap.set(mesh, {
        transformOrigin: "62% 48%",
        force3D: true,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      });

      const floatConfig = {
        ease: "sine.inOut" as const,
        yoyo: true,
        repeat: -1,
        paused: true,
      };

      floatTweensRef.current = [
        gsap.to(mesh, { y: 30, duration: 11, ...floatConfig }),
        gsap.to(mesh, { x: 17, duration: 14, ...floatConfig }),
        gsap.to(mesh, { rotation: 1.3, duration: 16, ...floatConfig }),
        gsap.to(mesh, { scale: 1.04, duration: 12, ...floatConfig }),
      ];

      return () => {
        floatTweensRef.current.forEach((tween) => tween.kill());
        floatTweensRef.current = [];
      };
    },
    { scope: sectionRef, dependencies: [reduced, motionSafe] },
  );

  useEffect(() => {
    const tweens = floatTweensRef.current;
    if (!tweens.length || reduced || !motionSafe) return;

    tweens.forEach((tween) => {
      if (inView) {
        tween.play();
        gsap.to(tween, {
          timeScale: 1,
          duration: 1.4,
          ease: "sine.inOut",
          overwrite: true,
        });
      } else {
        gsap.to(tween, {
          timeScale: 0,
          duration: 1.4,
          ease: "sine.inOut",
          overwrite: true,
          onComplete: () => tween.pause(),
        });
      }
    });
  }, [inView, reduced, motionSafe]);

  return (
    <section
      id="powered-by"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden border-t border-archon-navy/8 bg-archon-cream text-archon-navy"
    >
      <div
        ref={meshStageRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute inset-0 origin-[62%_48%] rotate-[-6deg] scale-[1.12] md:rotate-[-8deg] md:scale-[1.2]">
          <div
            ref={waveFlowRef}
            className="absolute -inset-[12%] [backface-visibility:hidden] will-change-transform"
          >
            <Image
              src={images.poweredByMolecule}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[62%_48%] opacity-100 saturate-[0.65] contrast-[1.02] brightness-[1.01]"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-archon-cream/8" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_68%_46%,rgba(69,89,128,0.22)_0%,transparent_54%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-archon-cream from-0% via-archon-cream/65 via-[28%] to-transparent to-[62%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-archon-cream/28 via-transparent via-20% to-archon-cream/18" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_18%_88%,rgba(11,31,58,0.07)_0%,transparent_55%),radial-gradient(ellipse_55%_45%_at_82%_18%,rgba(69,89,128,0.06)_0%,transparent_52%)]"
      />
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="flex max-w-[min(88vw,40rem)] flex-col justify-center gap-10 md:gap-10">
          <h2
            data-powered-parallax="headline"
            className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-archon-navy will-change-transform md:leading-[0.92]"
          >
            {reduced
              ? poweredBy.headline
              : headlineWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="inline-block overflow-hidden align-bottom pb-[0.06em] md:pb-0"
                  >
                    <span data-powered-word className="inline-block">
                      {word}
                      {index < headlineWords.length - 1 ? "\u00A0" : ""}
                    </span>
                  </span>
                ))}
          </h2>

          <div
            data-powered-parallax="body"
            className="flex flex-col gap-3.5 will-change-transform md:gap-2"
          >
            {poweredBy.body.map((line) => (
              <p
                key={line}
                data-powered-line
                className="font-display text-[clamp(1rem,2.4vw,1.35rem)] font-semibold uppercase leading-[1.38] tracking-[0.04em] text-archon-navy md:leading-[1.15]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
