import { homepageCopy } from "@/config/homepage";

/** Large grainy background ARCHON wordmark — mockup */
export function HeroEmbossedBrand() {
  return (
    <div
      data-hero-brand
      className="pointer-events-none absolute left-1/2 top-[8%] z-[3] w-full max-w-[98vw] -translate-x-1/2 select-none px-2 text-center md:top-[7%]"
      aria-hidden
    >
      <p
        className="relative font-display text-[clamp(4.5rem,min(18vw,20vh),11rem)] font-extrabold uppercase leading-[0.78] tracking-[0.06em]"
        style={{
          color: "rgb(255 255 255 / 0.07)",
          WebkitTextStroke: "0.5px rgb(255 255 255 / 0.12)",
          textShadow: "0 2px 40px rgb(0 122 255 / 0.08)",
        }}
      >
        {homepageCopy.hero.brand}
        <span
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {homepageCopy.hero.brand}
        </span>
      </p>
    </div>
  );
}
