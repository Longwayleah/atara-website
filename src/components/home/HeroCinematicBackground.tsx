import { HeroParticleTerrain } from "./HeroParticleTerrain";

const ELECTRIC = "#007AFF";
const BG = "#00050A";

/** Mockup-accurate hero atmosphere (static) */
export function HeroCinematicBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: BG }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(ellipse 75% 55% at 50% 38%, rgb(11 31 58 / 0.9) 0%, transparent 58%)`,
            "radial-gradient(ellipse 50% 40% at 50% 42%, rgb(0 122 255 / 0.14) 0%, transparent 55%)",
            `linear-gradient(180deg, ${BG} 0%, #020408 45%, #000205 100%)`,
          ].join(", "),
        }}
      />

      <div
        className="absolute left-1/2 top-[42%] h-[min(90vw,680px)] w-[min(90vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(0 122 255 / 0.28) 0%, rgb(0 122 255 / 0.08) 38%, transparent 68%)",
        }}
      />

      <div
        className="absolute left-1/2 top-[44%] h-[min(35vw,260px)] w-[min(35vw,260px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl mix-blend-screen"
        style={{
          background: `radial-gradient(circle, ${ELECTRIC} 0%, rgb(0 122 255 / 0.2) 35%, transparent 70%)`,
          opacity: 0.35,
        }}
      />

      <div
        className="absolute left-[8%] top-[18%] h-56 w-56 rounded-full blur-[90px] mix-blend-screen md:left-[12%]"
        style={{ background: "radial-gradient(circle, rgb(0 122 255 / 0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[6%] top-[55%] h-48 w-48 rounded-full blur-[80px] mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgb(69 89 128 / 0.14) 0%, transparent 70%)" }}
      />

      <HeroParticleTerrain
        animated={false}
        className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-90 mix-blend-screen"
      />

      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 88% at 50% 45%, transparent 35%, rgb(0 2 6 / 0.65) 100%)",
        }}
      />
    </div>
  );
}
