/**
 * Minimal hero field — clinical white, subtle datum grid.
 */
export function HeroMinimalField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#FAFAFA]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 62% 44%, rgb(255 255 255 / 0.95) 0%, transparent 62%)",
        }}
      />

      {/* Scientific dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(69 89 128 / 0.14) 0.5px, transparent 0.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Datum cross — single precision mark */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-[58%]">
        <div className="relative h-[min(52vh,440px)] w-[min(52vh,440px)]">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-archon-royal/10" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-archon-royal/10" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-archon-royal/25" />
        </div>
      </div>

      {/* Bottom horizon */}
      <div className="absolute inset-x-0 bottom-[18%] h-px bg-archon-royal/[0.08] md:bottom-[22%]" />
    </div>
  );
}
