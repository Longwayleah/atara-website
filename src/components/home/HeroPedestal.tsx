/** Two-tier circular pedestal with neon blue ring — mockup platform (static) */
export function HeroPedestal() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[58%] z-[8] -translate-x-1/2 md:top-[57%]"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-[42%] h-[min(22vw,140px)] w-[min(48vw,380px)] -translate-x-1/2 rounded-[100%] blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgb(0 122 255 / 0.35) 0%, rgb(0 122 255 / 0.08) 45%, transparent 72%)",
        }}
      />

      <div
        className="relative mx-auto h-[18px] w-[min(52vw,400px)] rounded-[100%] md:h-[22px] md:w-[min(44vw,440px)]"
        style={{
          background:
            "linear-gradient(180deg, rgb(18 28 42) 0%, rgb(8 12 20) 55%, rgb(4 6 12) 100%)",
          boxShadow:
            "0 8px 32px rgb(0 0 0 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.06), inset 0 -4px 12px rgb(0 0 0 / 0.5)",
        }}
      />

      <div
        className="relative mx-auto -mt-[3px] h-[5px] w-[min(46vw,360px)] rounded-[100%] md:-mt-1 md:h-[6px] md:w-[min(38vw,400px)]"
        style={{
          background: "linear-gradient(90deg, transparent, #007aff 20%, #4db2ff 50%, #007aff 80%, transparent)",
          boxShadow: "0 0 20px rgb(0 122 255 / 0.85), 0 0 40px rgb(0 122 255 / 0.35)",
        }}
      />

      <div
        className="relative mx-auto -mt-[2px] h-[14px] w-[min(40vw,320px)] rounded-[100%] md:h-[16px] md:w-[min(34vw,360px)]"
        style={{
          background:
            "linear-gradient(180deg, rgb(28 40 58) 0%, rgb(14 20 32) 50%, rgb(6 10 18) 100%)",
          boxShadow:
            "0 4px 20px rgb(0 0 0 / 0.5), inset 0 1px 0 rgb(255 255 255 / 0.08)",
        }}
      />
    </div>
  );
}
