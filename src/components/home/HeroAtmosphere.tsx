/**
 * Hero atmosphere — luminous field, kinetic royal + silver waves.
 */
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !rootRef.current) return;
      const waves = rootRef.current.querySelector("[data-hero-waves]");
      if (waves) {
        gsap.to(waves, {
          x: 14,
          y: -6,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 65% at 50% 42%, #FFFFFF 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 35% at 85% 15%, rgb(69 89 128 / 0.05) 0%, transparent 55%)",
            "linear-gradient(180deg, #FFFFFF 0%, #FAFBFD 50%, #EEF1F5 100%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute left-1/2 top-[46%] h-[min(70vw,500px)] w-[min(70vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(69 89 128 / 0.1) 0%, rgb(69 89 128 / 0.04) 42%, transparent 68%)",
        }}
      />

      <svg
        data-hero-waves
        className="absolute left-1/2 top-[48%] h-[min(54vh,420px)] w-[min(150vw,1650px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-royal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2f4a6e" />
            <stop offset="50%" stopColor="#455980" />
            <stop offset="100%" stopColor="#3a6aad" />
          </linearGradient>
          <linearGradient id="hero-silver" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EDF2" />
            <stop offset="45%" stopColor="#8A96A6" />
            <stop offset="100%" stopColor="#C8D0DA" />
          </linearGradient>
          <linearGradient id="wave-fade-x" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="7%" stopColor="white" stopOpacity="1" />
            <stop offset="93%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="wave-mask">
            <rect width="1600" height="400" fill="url(#wave-fade-x)" />
          </mask>
        </defs>
        <g mask="url(#wave-mask)" strokeLinecap="round">
          <path d="M-80 200 C 120 110, 280 290, 480 200 S 840 110, 1040 200 S 1360 290, 1680 200" stroke="url(#hero-royal)" strokeWidth="1.2" opacity="0.65" />
          <path d="M-80 218 C 140 128, 300 308, 500 218 S 860 128, 1060 218 S 1380 308, 1680 218" stroke="url(#hero-silver)" strokeWidth="1.05" opacity="0.72" />
          <path d="M-80 182 C 100 92, 260 272, 460 182 S 820 92, 1020 182 S 1340 272, 1680 182" stroke="url(#hero-royal)" strokeWidth="0.9" opacity="0.45" />
          <path d="M-80 236 C 160 146, 320 326, 520 236 S 880 146, 1080 236 S 1400 326, 1680 236" stroke="url(#hero-silver)" strokeWidth="0.85" opacity="0.5" />
          <path d="M-80 164 C 60 74, 220 254, 420 164 S 780 74, 980 164 S 1300 254, 1680 164" stroke="url(#hero-silver)" strokeWidth="0.65" opacity="0.35" />
          <path d="M-80 200 C 120 110, 280 290, 480 200 S 840 110, 1040 200 S 1360 290, 1680 200" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
