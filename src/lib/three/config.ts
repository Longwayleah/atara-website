import { colors } from "@/config/design";

/** Shared Three.js / R3F constants — Archon brand */
export const THREE_CONFIG = {
  dpr: [1, 2] as [number, number],
  maxDpr: 2,
  camera: {
    fov: 45,
    near: 0.1,
    far: 100,
    position: [0, 0, 5] as [number, number, number],
  },
  /** ACES filmic + exposure tuned for dark hero scenes */
  renderer: {
    toneMappingExposure: 1,
    clearAlpha: 0,
    powerPreference: "high-performance" as WebGLPowerPreference,
  },
  colors: {
    ambient: colors.silverHighlight,
    accent: colors.electric,
    shadow: colors.navy,
    rim: colors.white,
  },
  /** Studio lighting presets for product renders */
  lighting: {
    hero: {
      ambient: 0.14,
      keyIntensity: 2.1,
      fillIntensity: 0.38,
      rimIntensity: 0.85,
    },
    product: {
      ambient: 0.6,
      keyIntensity: 1.2,
      fillIntensity: 0.4,
    },
  },
  environment: {
    preset: "studio" as const,
    resolution: 1024,
  },
} as const;

export function clampDpr(dpr: number, max = THREE_CONFIG.maxDpr) {
  return Math.min(Math.max(dpr, 1), max);
}
