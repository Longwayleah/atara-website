import { HERO_COLORS } from "./tokens";

/** Layer 1 — asymmetric depth field, not a centered halo */
export function Layer01BaseGradient() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: [
          `radial-gradient(ellipse 70% 55% at 72% 28%, rgb(69 89 128 / 0.22) 0%, transparent 52%)`,
          `radial-gradient(ellipse 50% 45% at 12% 78%, rgb(47 74 110 / 0.14) 0%, transparent 48%)`,
          `linear-gradient(168deg, #030810 0%, ${HERO_COLORS.bg} 38%, #010306 100%)`,
        ].join(", "),
      }}
    />
  );
}
