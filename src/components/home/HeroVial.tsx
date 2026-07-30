"use client";

import { useRef, type RefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { cn } from "@/lib/utils/cn";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const VialCanvas = dynamic(
  () => import("@/components/three/VialCanvas").then((m) => m.VialCanvas),
  { ssr: false, loading: () => null },
);

type HeroVialProps = {
  alt: string;
  className?: string;
  /** Dark section — brighter canvas lighting */
  dark?: boolean;
  src?: string;
  priority?: boolean;
  /** TurboSquid GLB + PBR textures */
  use3D?: boolean;
  /** Center vial in frame (hero chamber oval) */
  centered?: boolean;
  /** Gentle vertical float */
  float?: boolean;
  /** Subtle mouse-follow tilt */
  tilt?: boolean;
};

function useVialFloat(
  containerRef: RefObject<HTMLDivElement | null>,
  floatRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const motionSafe = useMotionSafe();

  useGSAP(
    () => {
      if (!enabled || !motionSafe || !floatRef.current) return;

      gsap.to(floatRef.current, {
        y: -14,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [enabled, motionSafe] },
  );
}
function useVialTilt(
  containerRef: RefObject<HTMLDivElement | null>,
  tiltRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const motionSafe = useMotionSafe();

  useGSAP(
    () => {
      if (!enabled || !motionSafe || !containerRef.current || !tiltRef.current) return;

      const container = containerRef.current;
      const target = tiltRef.current;
      const maxTilt = 5;

      const handleMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(target, {
          rotateY: x * maxTilt * 2,
          rotateX: -y * maxTilt * 2,
          duration: 0.65,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleLeave = () => {
        gsap.to(target, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.85,
          ease: "power2.out",
        });
      };

      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);

      return () => {
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: containerRef, dependencies: [enabled, motionSafe] },
  );
}

export function HeroVial({
  alt,
  className,
  dark = false,
  src = "/products/apex.png",
  priority = false,
  use3D = false,
  centered = false,
  float = false,
  tilt = false,
}: HeroVialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  useVialFloat(containerRef, floatRef, float);
  useVialTilt(containerRef, tiltRef, tilt);

  const shellClass = cn(
    "relative flex justify-center",
    centered ? "items-center" : "items-end",
    tilt && "hero-vial-tilt-root",
    className,
  );

  const content = use3D ? (
    <VialCanvas
      className="absolute inset-0 h-full w-full"
      staticView
      dark={dark}
      centered={centered}
    />
  ) : (
    <>
      <div
        aria-hidden
        className={cn(
          "absolute bottom-[2%] left-1/2 -translate-x-1/2 rounded-full",
          float
            ? "h-[10%] w-[58%] bg-[radial-gradient(ellipse,rgba(69,89,128,0.28)_0%,rgba(69,89,128,0.08)_45%,transparent_72%)] blur-2xl"
            : "h-[5%] w-[48%] blur-2xl",
          dark ? "bg-black/35" : !float && "bg-[#0b1f3a]/10",
        )}
      />

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={82}
        sizes="(max-width: 768px) 80vw, 420px"
        className={cn(
          "select-none object-contain",
          centered ? "object-center" : "object-bottom",
          dark
            ? "mix-blend-screen brightness-[1.05] contrast-[1.03]"
            : "drop-shadow-[0_32px_56px_rgba(11,31,58,0.12)]",
        )}
        draggable={false}
      />
    </>
  );

  const vialBody = (
    <div
      ref={tilt ? tiltRef : undefined}
      className={cn("relative h-full w-full", tilt && "hero-vial-tilt-target")}
    >
      {content}
    </div>
  );

  return (
    <div ref={containerRef} className={shellClass} role="img" aria-label={alt}>
      {float ? (
        <div
          ref={floatRef}
          className="relative h-full w-full will-change-transform"
        >
          {vialBody}
        </div>
      ) : (
        vialBody
      )}
    </div>
  );
}
