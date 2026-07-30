"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { HeroTopWordmark } from "@/components/home/HeroTopWordmark";
import { useAppStore } from "@/store/useAppStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPLASH_KEY = "atara-splash-seen";
const REPLAY_SPLASH_IN_DEV = false;
const NAVY = "#3E3934";
const WATERMARK_COLOR = "rgb(62 57 52 / 0.08)";

function hasSeenSplash() {
  return !REPLAY_SPLASH_IN_DEV && sessionStorage.getItem(SPLASH_KEY) === "true";
}

function markSplashSeen() {
  if (!REPLAY_SPLASH_IN_DEV) {
    sessionStorage.setItem(SPLASH_KEY, "true");
  }
}

function revealSite(setSplashComplete: (complete: boolean) => void) {
  setSplashComplete(true);
  document.body.style.overflow = "";
  gsap.set("main", { autoAlpha: 1, y: 0, pointerEvents: "auto", clearProps: "filter" });
  gsap.set("[data-hero-splash-defer]", { autoAlpha: 1, clearProps: "opacity,visibility" });
  gsap.set("[data-hero-reveal]", { autoAlpha: 1, clearProps: "opacity,visibility,transform,filter" });
  gsap.set('[data-hero-reveal="background"]', { autoAlpha: 1, clearProps: "opacity,visibility" });
}

function hidePinnedWordmark(wordmark: HTMLSpanElement | null) {
  const wrap = wordmark?.parentElement;

  if (!wrap) return;

  gsap.set(wrap, {
    autoAlpha: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });
}

function finalizeSplashHandoff({
  heroLetters,
  heroDeferShells,
  heroRevealEls,
  heroBackground,
  letterEls,
  setSplashComplete,
}: {
  heroLetters: NodeListOf<Element>;
  heroDeferShells: NodeListOf<Element>;
  heroRevealEls: NodeListOf<Element>;
  heroBackground: HTMLElement | null;
  letterEls: NodeListOf<Element>;
  setSplashComplete: (complete: boolean) => void;
}) {
  gsap.set(heroLetters, { autoAlpha: 1, clearProps: "opacity,visibility" });
  gsap.set(heroDeferShells, { autoAlpha: 1, clearProps: "opacity,visibility" });
  gsap.set(heroRevealEls, { autoAlpha: 1, clearProps: "opacity,visibility,transform,filter" });

  if (heroBackground) {
    gsap.set(heroBackground, { autoAlpha: 1, clearProps: "opacity,visibility" });
  }

  gsap.set(letterEls, { autoAlpha: 0 });

  markSplashSeen();

  requestAnimationFrame(() => {
    revealSite(setSplashComplete);
  });
}

function letterGlow() {
  return "0 0 28px rgb(179 140 90 / 0.35), 0 0 2px rgb(62 57 52 / 0.24)";
}

const SPLASH_EASE = {
  reveal: "expo.out",
  move: "power4.inOut",
  exit: "expo.inOut",
  color: "power2.inOut",
  hero: "power3.out",
} as const;

const HERO_LAND = {
  appear: "sine.out",
  drift: "sine.inOut",
  settle: "power1.out",
  shell: "sine.out",
} as const;

/** Offset a GSAP timeline position string, e.g. `settle+=1.38` → `settle+=1.48`. */
function offsetPosition(position: string, seconds: number) {
  return position.replace(/\+=([\d.]+)/, (_, time) => `+=${(parseFloat(time) + seconds).toFixed(2)}`);
}

/** Two-phase luxury settle: fade in, gentle drift, then soft lock-in. */
function landHeroContent(
  tl: gsap.core.Timeline,
  {
    shell,
    target,
    position,
    drift = {},
    appearDuration = 1.4,
    driftDuration = 1.55,
    settleDuration = 0.85,
    shellDuration = 0.7,
    driftDelay = 0.08,
  }: {
    shell: HTMLElement | null | undefined;
    target: Element | NodeListOf<Element> | null | undefined;
    position: string;
    drift?: gsap.TweenVars;
    appearDuration?: number;
    driftDuration?: number;
    settleDuration?: number;
    shellDuration?: number;
    driftDelay?: number;
  },
) {
  if (shell) {
    tl.to(shell, { autoAlpha: 1, duration: shellDuration, ease: HERO_LAND.shell }, position);
  }

  if (!target) return tl;

  tl.to(target, { autoAlpha: 1, duration: appearDuration, ease: HERO_LAND.appear }, position);

  if (Object.keys(drift).length > 0) {
    tl.to(
      target,
      { ...drift, duration: driftDuration, ease: HERO_LAND.drift },
      offsetPosition(position, driftDelay),
    );

    tl.to(
      target,
      {
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: settleDuration,
        ease: HERO_LAND.settle,
      },
      `-=${settleDuration * 0.42}`,
    );
  }

  return tl;
}

/** Editorial type: fade, drift most of the way, then ease into rest. */
function landHeroType(
  tl: gsap.core.Timeline,
  target: Element | NodeListOf<Element> | null | undefined,
  position: string,
  stagger: number | gsap.StaggerVars = 0,
) {
  if (!target) return tl;

  const staggerConfig = stagger
    ? typeof stagger === "number"
      ? { each: stagger, ease: "sine.out" as const }
      : stagger
    : 0;

  return tl
    .to(
      target,
      { autoAlpha: 1, duration: 1.35, stagger: staggerConfig, ease: HERO_LAND.appear },
      position,
    )
    .to(
      target,
      { y: 3, duration: 1.1, stagger: staggerConfig, ease: HERO_LAND.drift },
      offsetPosition(position, 0.08),
    )
    .to(
      target,
      { y: 0, duration: 0.78, stagger: staggerConfig, ease: HERO_LAND.settle },
      "-=0.46",
    );
}

const LETTER_STAGGER = 0.13;
const LETTER_GLOW_EASE = "sine.inOut";
const SETTLE_STAGGER = 0.07;

type LetterSettleTarget = {
  x: number;
  y: number;
  scale: number;
};

function getLetterSettleTargets(
  splashLetters: NodeListOf<Element>,
  heroLetters: NodeListOf<Element>,
): LetterSettleTarget[] {
  return Array.from(splashLetters).map((splash, index) => {
    const hero = heroLetters[index];

    if (!hero) {
      return { x: 0, y: 0, scale: 1 };
    }

    const splashRect = splash.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();

    return {
      x: heroRect.left + heroRect.width / 2 - (splashRect.left + splashRect.width / 2),
      y: heroRect.top + heroRect.height / 2 - (splashRect.top + splashRect.height / 2),
      scale: heroRect.width / Math.max(splashRect.width, 1),
    };
  });
}

function hasValidSettleTargets(targets: LetterSettleTarget[]) {
  return targets.some((target) => Math.abs(target.y) > 24 || Math.abs(target.x) > 24);
}

function getFallbackSettleTargets(count: number): LetterSettleTarget[] {
  return Array.from({ length: count }, (_, index) => ({
    x: (index - (count - 1) / 2) * 10,
    y: -window.innerHeight * 0.34,
    scale: 0.44,
  }));
}

function pinWordmarkForSettle(wordmark: HTMLSpanElement) {
  const wrap = wordmark.parentElement;

  if (!wrap) return;

  const wrapRect = wrap.getBoundingClientRect();

  gsap.set(wrap, {
    position: "fixed",
    top: wrapRect.top,
    left: wrapRect.left,
    width: wrapRect.width,
    margin: 0,
    zIndex: 10001,
    transform: "none",
  });
}

function measureSettleTargets(
  main: Element,
  letterEls: NodeListOf<Element>,
  heroLetters: NodeListOf<Element>,
) {
  gsap.set(main, { visibility: "visible", opacity: 0, y: 0, pointerEvents: "none" });
  gsap.set(heroLetters, { autoAlpha: 1, opacity: 0 });

  void (main as HTMLElement).offsetHeight;

  const targets = getLetterSettleTargets(letterEls, heroLetters);

  gsap.set(heroLetters, { autoAlpha: 0 });

  return hasValidSettleTargets(targets)
    ? targets
    : getFallbackSettleTargets(letterEls.length);
}

export function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  const reduced = usePrefersReducedMotion();
  const setSplashComplete = useAppStore((s) => s.setSplashComplete);
  const splashComplete = useAppStore((s) => s.splashComplete);
  const [mounted, setMounted] = useState(false);

  const { tagline } = homepageCopy.splash;

  useEffect(() => {
    requestAnimationFrame(() => {
      // Atara homepage has no legacy hero wordmark letters — never block paint.
      const hasHeroWordmark =
        typeof document !== "undefined" &&
        document.querySelectorAll(".hero-top-wordmark .wordmark-letter").length > 0;

      if (!hasHeroWordmark || hasSeenSplash()) {
        setSplashComplete(true);
        document.body.style.overflow = "";
        setMounted(true);
        return;
      }

      if (REPLAY_SPLASH_IN_DEV) {
        setSplashComplete(false);
        gsap.set("main", { autoAlpha: 0, y: 8 });
      } else {
        gsap.set("main", { autoAlpha: 0, y: 8 });
      }
      setMounted(true);
    });

    const fallback = window.setTimeout(() => {
      revealSite(setSplashComplete);
    }, 4000);

    return () => window.clearTimeout(fallback);
  }, [setSplashComplete]);

  useGSAP(
    () => {
      if (!mounted || !containerRef.current) return;

      const skipSplash = hasSeenSplash();

      if (skipSplash || reduced) {
        revealSite(setSplashComplete);
        return;
      }

      document.body.style.overflow = "hidden";

      const main = document.querySelector("main");
      if (!main) {
        revealSite(setSplashComplete);
        return;
      }

      const letterEls = wordmarkRef.current?.querySelectorAll(".wordmark-letter");
      const heroLetters = main.querySelectorAll(".hero-top-wordmark .wordmark-letter");

      const heroDeferShells = main.querySelectorAll("[data-hero-splash-defer]");
      const heroRevealEls = main.querySelectorAll<HTMLElement>("[data-hero-reveal]");
      const heroBackground = main.querySelector<HTMLElement>('[data-hero-reveal="background"]');
      const heroVial = main.querySelector<HTMLElement>('[data-hero-reveal="vial"]');
      const heroHeadline = main.querySelector<HTMLElement>('[data-hero-reveal="headline"]');
      const heroCopy = main.querySelector<HTMLElement>('[data-hero-reveal="copy"]');
      const heroLogo = main.querySelector<HTMLElement>('[data-hero-reveal="logo"]');
      const heroVialShell = heroVial?.closest<HTMLElement>("[data-hero-splash-defer]");
      const heroHeadlineShell = heroHeadline?.closest<HTMLElement>("[data-hero-splash-defer]");
      const heroCopyShell = heroCopy?.closest<HTMLElement>("[data-hero-splash-defer]");
      const heroLogoShell = heroLogo?.closest<HTMLElement>("[data-hero-splash-defer]");
      const headlineLines = heroHeadline?.querySelectorAll("span");
      const copyLines = heroCopy?.querySelectorAll("p, a");

      if (!wordmarkRef.current || !letterEls?.length || !heroLetters?.length) {
        revealSite(setSplashComplete);
        return;
      }

      gsap.set(main, { autoAlpha: 0, y: 8 });
      gsap.set(heroLetters, { autoAlpha: 0 });
      gsap.set(heroDeferShells, { autoAlpha: 0 });
      if (heroBackground) {
        gsap.set(heroBackground, { autoAlpha: 0 });
      }
      if (heroVial) {
        gsap.set(heroVial, {
          autoAlpha: 0,
          y: 12,
          scale: 0.992,
          filter: "blur(2px)",
          transformOrigin: "50% 62%",
          force3D: true,
        });
      }
      if (heroHeadline) {
        gsap.set(heroHeadline, { autoAlpha: 1 });
      }
      if (headlineLines?.length) {
        gsap.set(headlineLines, { autoAlpha: 0, y: 8 });
      } else if (heroHeadline) {
        gsap.set(heroHeadline, { autoAlpha: 0, y: 8 });
      }
      if (heroCopy) {
        gsap.set(heroCopy, { autoAlpha: 1 });
      }
      if (copyLines?.length) {
        gsap.set(copyLines, { autoAlpha: 0, y: 8 });
      } else if (heroCopy) {
        gsap.set(heroCopy, { autoAlpha: 0, y: 8 });
      }
      if (heroLogo) {
        gsap.set(heroLogo, {
          autoAlpha: 0,
          scale: 0.994,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      }
      gsap.set(wordmarkRef.current, { autoAlpha: 0, y: 14, scale: 0.992 });
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(letterEls, {
        color: WATERMARK_COLOR,
        textShadow: "0 0 0px transparent",
        scale: 1,
        y: 0,
        x: 0,
        rotation: 0,
        filter: "none",
        autoAlpha: 1,
        force3D: true,
      });

      let settleTargets: LetterSettleTarget[] = [];

      const tl = gsap.timeline({
        defaults: { ease: SPLASH_EASE.reveal },
        onComplete: () => {
          finalizeSplashHandoff({
            heroLetters,
            heroDeferShells,
            heroRevealEls,
            heroBackground,
            letterEls,
            setSplashComplete,
          });
        },
      });

      tl.set(containerRef.current, { autoAlpha: 1, backgroundColor: "#f5f5f5" })
        .to(wordmarkRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.45,
        })
        .to(
          taglineRef.current,
          { autoAlpha: 1, y: 0, duration: 0.95 },
          "-=0.22",
        )
        .to({}, { duration: 0.55 })
        .to(letterEls, {
          color: NAVY,
          scale: 1.045,
          y: -3,
          filter: "brightness(1.06)",
          textShadow: letterGlow(),
          duration: 0.68,
          stagger: { each: LETTER_STAGGER, ease: "sine.out" },
          ease: LETTER_GLOW_EASE,
        })
        .to(
          letterEls,
          {
            scale: 1,
            y: 0,
            filter: "brightness(1)",
            duration: 0.4,
            stagger: { each: LETTER_STAGGER, ease: "sine.out" },
            ease: LETTER_GLOW_EASE,
          },
          "-=0.22",
        )
        .to({}, { duration: 0.28 })
        .to(taglineRef.current, {
          autoAlpha: 0,
          y: -6,
          duration: 0.22,
          ease: SPLASH_EASE.exit,
        })
        .to({}, { duration: 0.15 })
        .add(() => {
          pinWordmarkForSettle(wordmarkRef.current!);
          settleTargets = measureSettleTargets(main, letterEls, heroLetters);
        })
        .add("settle")
        .to(
          containerRef.current,
          {
            backgroundColor: "rgba(245, 245, 245, 0)",
            duration: 0.9,
            ease: SPLASH_EASE.exit,
          },
          "settle",
        )
        .to(
          main,
          { autoAlpha: 1, y: 0, duration: 1.2, ease: HERO_LAND.drift },
          "settle+=0.12",
        )
        .to(
          heroBackground,
          {
            autoAlpha: 1,
            duration: 1.55,
            ease: HERO_LAND.appear,
          },
          "settle+=0.12",
        )
        .to(
          letterEls,
          {
            x: (index) => settleTargets[Number(index)]?.x ?? 0,
            y: (index) => settleTargets[Number(index)]?.y ?? 0,
            scale: (index) => settleTargets[Number(index)]?.scale ?? 1,
            rotation: 0,
            duration: 1.05,
            stagger: { each: SETTLE_STAGGER, ease: "power2.out" },
            ease: SPLASH_EASE.move,
          },
          "settle",
        )
        .to(
          letterEls,
          {
            color: WATERMARK_COLOR,
            textShadow: "0 0 0px transparent",
            filter: "none",
            duration: 0.4,
            stagger: { each: 0.05, ease: "none" },
            ease: SPLASH_EASE.color,
          },
          "settle+=0.55",
        )
        .to(
          heroLetters,
          {
            autoAlpha: 1,
            duration: 0.85,
            ease: HERO_LAND.appear,
          },
          "settle+=1.22",
        )
        .to(
          letterEls,
          {
            autoAlpha: 0,
            duration: 0.3,
            ease: SPLASH_EASE.exit,
          },
          "settle+=1.32",
        )
        .add(() => {
          hidePinnedWordmark(wordmarkRef.current);
        }, "settle+=1.64")
        .to(
          containerRef.current,
          {
            autoAlpha: 0,
            duration: 0.34,
            ease: SPLASH_EASE.exit,
          },
          "settle+=1.4",
        );

      landHeroContent(tl, {
        shell: heroVialShell,
        target: heroVial,
        position: "settle+=1.38",
        appearDuration: 1.45,
        driftDuration: 1.65,
        settleDuration: 0.95,
        driftDelay: 0.12,
        drift: { y: 4, scale: 0.996, filter: "blur(1px)" },
      });

      if (heroHeadlineShell) {
        tl.to(
          heroHeadlineShell,
          { autoAlpha: 1, duration: 0.7, ease: HERO_LAND.shell },
          "settle+=1.5",
        );
      }

      landHeroType(
        tl,
        headlineLines?.length ? headlineLines : heroHeadline,
        "settle+=1.54",
        headlineLines?.length ? 0.11 : 0,
      );

      if (heroCopyShell) {
        tl.to(
          heroCopyShell,
          { autoAlpha: 1, duration: 0.7, ease: HERO_LAND.shell },
          "settle+=1.58",
        );
      }

      landHeroType(
        tl,
        copyLines?.length ? copyLines : heroCopy,
        "settle+=1.62",
        copyLines?.length ? 0.13 : 0,
      );

      landHeroContent(tl, {
        shell: heroLogoShell,
        target: heroLogo,
        position: "settle+=1.66",
        appearDuration: 1.1,
        driftDuration: 1.25,
        settleDuration: 0.8,
        driftDelay: 0.1,
        drift: { scale: 0.997 },
      });

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [mounted, reduced, setSplashComplete],
    },
  );

  if (!mounted || splashComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-archon-cream opacity-0"
      data-lenis-prevent
      aria-label="Atara loading"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex w-full flex-col items-center px-6 text-center">
        <HeroTopWordmark variant="splash" wordmarkRef={wordmarkRef} splitLetters />

        <p
          ref={taglineRef}
          className="mt-6 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-archon-navy opacity-0 md:mt-8 md:text-[11px]"
        >
          {tagline}
        </p>
      </div>
    </div>
  );
}
