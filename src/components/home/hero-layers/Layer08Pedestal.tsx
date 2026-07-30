import { HERO_COLORS } from "./tokens";

/** Layer 8 — chrome pedestal with royal light ring */
export function Layer08Pedestal() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[57%] z-[5] -translate-x-1/2 md:top-[56%]"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-[40%] h-[min(20vw,130px)] w-[min(46vw,360px)] -translate-x-1/2 rounded-[100%] blur-2xl"
        style={{
          background: `radial-gradient(ellipse, rgb(69 89 128 / 0.3) 0%, rgb(148 159 175 / 0.06) 50%, transparent 72%)`,
        }}
      />

      <div
        className="relative mx-auto h-[18px] w-[min(50vw,400px)] rounded-[100%] md:h-[22px] md:w-[min(42vw,440px)]"
        style={{
          background: `linear-gradient(180deg, rgb(80 90 104) 0%, rgb(28 36 48) 45%, rgb(8 12 18) 100%)`,
          boxShadow: `0 8px 36px rgb(0 0 0 / 0.65), inset 0 1px 0 ${HERO_COLORS.silverChrome}33, inset 0 -3px 10px rgb(0 0 0 / 0.5)`,
        }}
      />

      <div
        className="relative mx-auto -mt-[3px] h-[4px] w-[min(44vw,360px)] rounded-[100%] md:-mt-1 md:h-[5px] md:w-[min(36vw,400px)]"
        style={{
          background: `linear-gradient(90deg, transparent, ${HERO_COLORS.royal} 15%, ${HERO_COLORS.silverLight} 50%, ${HERO_COLORS.royal} 85%, transparent)`,
          boxShadow: `0 0 18px rgb(69 89 128 / 0.7), 0 0 36px rgb(58 106 173 / 0.25)`,
        }}
      />

      <div
        className="relative mx-auto -mt-[2px] h-[14px] w-[min(38vw,320px)] rounded-[100%] md:h-[16px] md:w-[min(32vw,360px)]"
        style={{
          background: `linear-gradient(180deg, rgb(110 120 132) 0%, rgb(42 52 66) 50%, rgb(12 18 28) 100%)`,
          boxShadow: `0 4px 22px rgb(0 0 0 / 0.55), inset 0 1px 0 rgb(255 255 255 / 0.1)`,
        }}
      />
    </div>
  );
}
