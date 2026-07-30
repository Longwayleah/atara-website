/** Blueprint ring system — mockup technical overlay behind vial */
export function HeroBlueprintRing() {
  return (
    <div
      data-hero-ring
      className="pointer-events-none absolute left-1/2 top-[48%] z-[5] h-[min(88vw,640px)] w-[min(88vw,640px)] -translate-x-1/2 -translate-y-1/2 md:h-[min(72vh,680px)] md:w-[min(72vh,680px)]"
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bp-soft-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="#8CB4CC" opacity="0.38" filter="url(#bp-soft-glow)">
          <circle cx="340" cy="340" r="318" strokeWidth="0.55" />
          <circle cx="340" cy="340" r="278" strokeWidth="0.5" strokeDasharray="3 5" />
          <circle cx="340" cy="340" r="238" strokeWidth="0.48" />
          <circle cx="340" cy="340" r="198" strokeWidth="0.45" strokeDasharray="2 4" />
          <circle cx="340" cy="340" r="158" strokeWidth="0.42" />
          <circle cx="340" cy="340" r="118" strokeWidth="0.38" opacity="0.55" />
        </g>
        <g stroke="#6E96AD" strokeWidth="0.4" opacity="0.32">
          <line x1="340" y1="18" x2="340" y2="662" />
          <line x1="18" y1="340" x2="662" y2="340" />
          <line x1="114" y1="114" x2="566" y2="566" />
          <line x1="566" y1="114" x2="114" y2="566" />
        </g>
        <g stroke="#7BA3BC" strokeWidth="0.35" opacity="0.28">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 340 + Math.cos(rad) * 300;
            const y1 = 340 + Math.sin(rad) * 300;
            const x2 = 340 + Math.cos(rad) * 318;
            const y2 = 340 + Math.sin(rad) * 318;
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        <g fill="#A8D4EF" opacity="0.45">
          <circle cx="340" cy="22" r="2.2" />
          <circle cx="340" cy="658" r="2.2" />
          <circle cx="22" cy="340" r="2.2" />
          <circle cx="658" cy="340" r="2.2" />
          <circle cx="340" cy="340" r="2.8" opacity="0.65" />
          <circle cx="158" cy="158" r="1.8" opacity="0.35" />
          <circle cx="522" cy="158" r="1.8" opacity="0.35" />
          <circle cx="158" cy="522" r="1.8" opacity="0.35" />
          <circle cx="522" cy="522" r="1.8" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
