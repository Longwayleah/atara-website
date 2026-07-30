/** Layer 5 — edge falloff only */
export function Layer05Vignette() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 50%, rgb(0 0 0 / 0.35) 100%)",
      }}
    />
  );
}
