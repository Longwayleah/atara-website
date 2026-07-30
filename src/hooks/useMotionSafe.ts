"use client";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

/**
 * Whether motion (GSAP, Lenis, WebGL idle) should run.
 * Respects reduced-motion and splash gate.
 */
export function useMotionSafe() {
  const reduced = usePrefersReducedMotion();
  const splashComplete = useAppStore((s) => s.splashComplete);
  return !reduced && splashComplete;
}
