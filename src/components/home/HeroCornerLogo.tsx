/** Bottom-left Archon mark */
export function HeroCornerLogo() {
  return (
    <div
      className="pointer-events-none absolute bottom-[calc(1.75rem+env(safe-area-inset-bottom))] left-[var(--hero-inset-x)] z-20 flex h-9 w-9 items-center justify-center rounded-full border border-archon-navy/15 bg-white/60 md:bottom-8 lg:left-[var(--hero-inset-x-lg)]"
      aria-hidden
    >
      <span className="font-display text-[12px] font-extrabold text-archon-navy/45">A</span>
    </div>
  );
}
