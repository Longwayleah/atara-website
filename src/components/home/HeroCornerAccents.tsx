/** Bottom corner accents — mockup N + star */
export function HeroCornerAccents() {
  return (
    <>
      <div
        className="pointer-events-none absolute bottom-6 left-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] md:bottom-8 md:left-10 lg:left-16"
        aria-hidden
      >
        <span className="font-display text-[11px] font-extrabold text-white/45">N</span>
      </div>
      <div
        className="pointer-events-none absolute bottom-6 right-6 z-20 md:bottom-8 md:right-10 lg:right-16"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/40">
          <path
            d="M9 0L10.2 7.8L18 9L10.2 10.2L9 18L7.8 10.2L0 9L7.8 7.8L9 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </>
  );
}
