import { HERO_COLORS } from "./tokens";

/** Layer 5 — orbital light trails (royal + silver, mockup-inspired) */
export function Layer05EnergyArcs() {
  const arcs = [
    { r: 285, ry: 98, rot: -20, w: 1.2, id: "a" },
    { r: 315, ry: 112, rot: 14, w: 0.9, id: "b" },
    { r: 255, ry: 82, rot: -34, w: 0.75, id: "c" },
  ];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[46%] z-[3] h-[min(90vw,680px)] w-[min(90vw,680px)] -translate-x-1/2 -translate-y-1/2 md:h-[min(72vh,700px)] md:w-[min(72vh,700px)]"
      aria-hidden
    >
      {arcs.map((arc) => (
        <svg
          key={arc.id}
          className="absolute inset-0 h-full w-full opacity-80"
          viewBox="0 0 680 680"
          fill="none"
        >
          <defs>
            <linearGradient id={`lux-arc-${arc.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor={HERO_COLORS.royal} stopOpacity="0.55" />
              <stop offset="55%" stopColor={HERO_COLORS.silverLight} stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <ellipse
            cx="340"
            cy="340"
            rx={arc.r}
            ry={arc.ry}
            stroke={`url(#lux-arc-${arc.id})`}
            strokeWidth={arc.w}
            transform={`rotate(${arc.rot} 340 340)`}
            strokeLinecap="round"
            strokeDasharray="160 880"
            style={{ filter: "blur(0.4px)" }}
          />
        </svg>
      ))}

      <svg className="absolute inset-0 h-full w-full mix-blend-screen opacity-50" viewBox="0 0 680 680" fill="none">
        <path
          d="M 340 55 A 285 285 0 0 1 595 340"
          stroke={HERO_COLORS.silverLight}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.45"
          style={{ filter: "blur(1px)" }}
        />
      </svg>
    </div>
  );
}
