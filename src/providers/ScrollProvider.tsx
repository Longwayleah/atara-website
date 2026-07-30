"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { connectLenisToScrollTrigger } from "@/lib/gsap/scroll";
import { motion as motionTokens } from "@/config/design";
import { useScrollStore } from "@/store/useScrollStore";
import { useAppStore } from "@/store/useAppStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Smooth scroll engine — Lenis synced to GSAP ScrollTrigger.
 * Foundation for scrollytelling sections across the site.
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const splashComplete = useAppStore((s) => s.splashComplete);
  const setScroll = useScrollStore((s) => s.setScroll);

  useEffect(() => {
    if (reducedMotion || !splashComplete) return;

    const lenis = new Lenis({
      duration: motionTokens.scroll.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: motionTokens.scroll.touchMultiplier,
    });

    lenis.on("scroll", (e) => {
      setScroll({
        scrollY: e.scroll,
        velocity: e.velocity,
        direction: e.direction === 1 ? "down" : e.direction === -1 ? "up" : null,
        progress: e.progress,
      });
    });

    connectLenisToScrollTrigger(lenis);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reducedMotion, splashComplete, setScroll]);

  return <>{children}</>;
}

/** @deprecated Use ScrollProvider */
export const LenisProvider = ScrollProvider;
