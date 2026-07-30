"use client";

import { type ReactNode, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { cn } from "@/lib/utils/cn";

type GsapRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

/** Foundation reveal — fade + lift, scoped with useGSAP cleanup */
export function GsapReveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.9,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionSafe = useMotionSafe();

  useGSAP(
    () => {
      if (!motionSafe || !ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "expo.out",
      });
    },
    { scope: ref, dependencies: [motionSafe, delay, y, duration] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
