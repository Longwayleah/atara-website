import { homepageCopy } from "@/config/homepage";
import { HERO_COLORS } from "./tokens";

/** Layer 3 — embossed ARCHON watermark (silver → royal) */
export function Layer03Wordmark() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[7%] z-[2] w-full max-w-[98vw] -translate-x-1/2 select-none px-2 text-center md:top-[6%]"
      aria-hidden
    >
      <p
        className="relative font-display text-[clamp(4rem,min(17vw,19vh),10.5rem)] font-extrabold uppercase leading-[0.78] tracking-[0.07em]"
        style={{
          background: `linear-gradient(180deg, ${HERO_COLORS.silverChrome} 0%, ${HERO_COLORS.royal} 55%, ${HERO_COLORS.royalDeep} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: "0.5px rgb(255 255 255 / 0.08)",
          filter: "drop-shadow(0 4px 48px rgb(69 89 128 / 0.2))",
          opacity: 0.42,
        }}
      >
        {homepageCopy.hero.brand}
      </p>
    </div>
  );
}
