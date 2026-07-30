"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced, speed] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
