/** Shared easing curves for GSAP + Framer Motion */
export const easings = {
  /** Premium deceleration — editorial reveals */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Smooth entrance */
  outQuart: [0.25, 1, 0.5, 1] as const,
  /** Subtle bounce for micro-interactions */
  outBack: [0.34, 1.56, 0.64, 1] as const,
  /** Cinematic slow settle */
  inOutCubic: [0.65, 0, 0.35, 1] as const,
} as const;

export const durations = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  cinematic: 1.8,
} as const;
