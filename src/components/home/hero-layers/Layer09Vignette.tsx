/** Layer 9 — cinematic vignette for depth + scrolly focus */
export function Layer09Vignette() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 88% at 50% 44%, transparent 32%, rgb(0 2 6 / 0.62) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background: "linear-gradient(to top, rgb(0 2 5 / 0.55) 0%, transparent 100%)",
        }}
      />
    </>
  );
}
