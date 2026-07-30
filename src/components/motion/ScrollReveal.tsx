"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  start?: string;
};

export function ScrollReveal({
  children,
  className,
  y = 60,
  duration = 1,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [reduced, y, duration, start] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
