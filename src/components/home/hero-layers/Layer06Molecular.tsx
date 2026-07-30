import { HERO_COLORS } from "./tokens";

/** Layer 6 — faint molecular structure (scientific wellness cue) */
export function Layer06Molecular() {
  return (
    <svg
      className="pointer-events-none absolute right-[4%] top-[38%] z-[3] h-[min(28vh,220px)] w-[min(22vw,180px)] opacity-[0.14] mix-blend-screen md:right-[6%]"
      viewBox="0 0 180 220"
      fill="none"
      aria-hidden
    >
      <circle cx="90" cy="50" r="4" fill={HERO_COLORS.silverLight} />
      <circle cx="50" cy="100" r="3.5" fill={HERO_COLORS.royal} />
      <circle cx="130" cy="95" r="3.5" fill={HERO_COLORS.royal} />
      <circle cx="70" cy="155" r="3" fill={HERO_COLORS.silver} />
      <circle cx="110" cy="160" r="3" fill={HERO_COLORS.silver} />
      <circle cx="90" cy="190" r="3.5" fill={HERO_COLORS.silverLight} />
      <path d="M90 50 L50 100 M90 50 L130 95 M50 100 L70 155 M130 95 L110 160 M70 155 L90 190 M110 160 L90 190" stroke={HERO_COLORS.silverLight} strokeWidth="0.6" opacity="0.7" />
      <path d="M50 100 L130 95" stroke={HERO_COLORS.royal} strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
