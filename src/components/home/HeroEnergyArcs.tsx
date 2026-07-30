const ELECTRIC = "#007AFF";

/** Swirling electric-blue energy trails around the vial (static) */
export function HeroEnergyArcs() {
  const arcs = [
    { r: 280, ry: 95, rot: -18, opacity: 0.85, w: 1.4 },
    { r: 310, ry: 110, rot: 12, opacity: 0.55, w: 1.1 },
    { r: 250, ry: 80, rot: -32, opacity: 0.4, w: 0.9 },
  ];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[46%] z-[5] h-[min(92vw,680px)] w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 md:h-[min(74vh,720px)] md:w-[min(74vh,720px)]"
      aria-hidden
    >
      {arcs.map((arc, i) => (
        <svg
          key={i}
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 680 680"
          fill="none"
          style={{ filter: "blur(0.3px)" }}
        >
          <defs>
            <linearGradient id={`arc-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="35%" stopColor={ELECTRIC} stopOpacity={arc.opacity} />
              <stop offset="65%" stopColor="#4db2ff" stopOpacity={arc.opacity * 0.7} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <ellipse
            cx="340"
            cy="340"
            rx={arc.r}
            ry={arc.ry}
            stroke={`url(#arc-grad-${i})`}
            strokeWidth={arc.w}
            transform={`rotate(${arc.rot} 340 340)`}
            strokeLinecap="round"
            strokeDasharray="180 900"
          />
        </svg>
      ))}

      <svg
        className="absolute inset-0 h-full w-full mix-blend-screen"
        viewBox="0 0 680 680"
        fill="none"
      >
        <path
          d="M 340 60 A 280 280 0 0 1 600 340"
          stroke={ELECTRIC}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
          style={{ filter: "blur(1px)" }}
        />
      </svg>
    </div>
  );
}
