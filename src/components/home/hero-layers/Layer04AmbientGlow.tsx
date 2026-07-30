import { HERO_COLORS } from "./tokens";

/** Layer 4 — soft royal + silver ambient glow (product halo zone) */
export function Layer04AmbientGlow() {
  return (
    <>
      <div
        className="absolute left-1/2 top-[42%] h-[min(88vw,660px)] w-[min(88vw,660px)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-3xl"
        style={{
          background: `radial-gradient(circle, rgb(69 89 128 / 0.28) 0%, rgb(58 106 173 / 0.1) 40%, transparent 68%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-[44%] h-[min(38vw,280px)] w-[min(38vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgb(212 220 230 / 0.12) 0%, rgb(69 89 128 / 0.18) 35%, transparent 70%)`,
        }}
      />
      <div
        className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full blur-[100px] mix-blend-screen md:left-[14%]"
        style={{ background: `radial-gradient(circle, rgb(69 89 128 / 0.12) 0%, transparent 70%)` }}
      />
      <div
        className="absolute right-[8%] top-[52%] h-56 w-56 rounded-full blur-[90px] mix-blend-screen"
        style={{ background: `radial-gradient(circle, rgb(148 159 175 / 0.1) 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 0%, rgb(255 255 255 / 0.04) 0%, transparent 45%)`,
        }}
      />
    </>
  );
}
