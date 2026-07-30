"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Returns 0–1 scroll progress for an element ref */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || !ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [ref, enabled, reduced]);

  return progress;
}
