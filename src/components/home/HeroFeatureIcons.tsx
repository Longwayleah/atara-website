import { homepageCopy } from "@/config/homepage";

function FeatureIcon({ type }: { type: "recovery" | "performance" | "routine" }) {
  const cls = "text-archon-silver-light";

  if (type === "recovery") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={cls} aria-hidden style={{ width: "1em", height: "1em" }}>
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "performance") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={cls} aria-hidden style={{ width: "1em", height: "1em" }}>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="none" className={cls} aria-hidden style={{ width: "1em", height: "1em" }}>
      <path d="M8 3a5 5 0 1 0 0 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 3V1M8 3l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HeroFeatureIcons() {
  return (
    <ul className="flex flex-wrap items-start gap-x-6 gap-y-3 md:gap-x-8">
      {homepageCopy.hero.features.map((feature) => (
        <li key={feature.label} className="flex items-center gap-2.5">
          <FeatureIcon type={feature.icon} />
          <span className="font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55 md:text-[10px]">
            {feature.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
