"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const VialCanvas = dynamic(
  () => import("@/components/three/VialCanvas").then((m) => m.VialCanvas),
  {
    ssr: false,
    loading: () => null,
  },
);

type FloatingVialProps = {
  alt: string;
  className?: string;
  priority?: boolean;
};

export function FloatingVial({ alt, className }: FloatingVialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !floatRef.current) return;

      gsap.to(floatRef.current, {
        y: -10,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center", className)}
      role="img"
      aria-label={alt}
    >
      <div
        ref={floatRef}
        className="relative h-full w-full will-change-transform"
      >
        <VialCanvas className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
