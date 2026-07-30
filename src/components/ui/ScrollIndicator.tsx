type ScrollIndicatorProps = {
  dark?: boolean;
  hero?: boolean;
  minimal?: boolean;
  label?: string;
};

export function ScrollIndicator({
  dark = false,
  hero = false,
  minimal = false,
  label,
}: ScrollIndicatorProps) {
  if (minimal) {
    return (
      <div className="hero-scroll-cue flex items-center gap-4">
        <span className="font-body text-[9px] font-medium uppercase tracking-[0.4em] text-archon-royal/50">
          {label ?? "Scroll to continue"}
        </span>
        <div className="hero-scroll-cue__line relative h-px w-12 overflow-hidden bg-archon-royal/15" />
      </div>
    );
  }

  if (hero) {
    return (
      <div className="atara-hero-scroll flex flex-col items-center gap-2.5">
        <span className="atara-hero-scroll__label font-body text-[9px] font-medium uppercase tracking-[0.38em]">
          Scroll
        </span>
        <div className="atara-hero-scroll__line" aria-hidden />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2.5">
      <span
        className={
          dark
            ? "font-body text-[9px] font-medium uppercase tracking-[0.38em] text-white/38"
            : "font-body text-[9px] font-medium uppercase tracking-[0.38em] text-archon-royal/55"
        }
      >
        Scroll to continue
      </span>
      <div
        className={
          dark
            ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/18"
            : "flex h-9 w-9 items-center justify-center rounded-full border border-archon-royal/25"
        }
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={dark ? "text-white/50" : "text-archon-royal/60"}
        >
          <path
            d="M6 2v8M6 10l3.5-3.5M6 10L2.5 6.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
