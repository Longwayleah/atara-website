/**
 * Hero background — exact mockup: dark gradient, grain, topo, kinetic waves.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0B0F14]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 95% 75% at 6% 4%, #2A4356 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 40% at 20% 15%, rgb(82 128 158 / 0.32) 0%, transparent 50%)",
            "linear-gradient(152deg, #2A4356 0%, #1a2a36 22%, #101820 45%, #0B0F14 68%, #0B0F14 100%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="topo-corner-tr" cx="88%" cy="18%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="0.22" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="topo-corner-br" cx="92%" cy="88%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="topo-corners">
            <rect width="1440" height="900" fill="black" />
            <rect width="1440" height="900" fill="url(#topo-corner-tr)" />
            <rect width="1440" height="900" fill="url(#topo-corner-br)" />
          </mask>
        </defs>
        <g mask="url(#topo-corners)" stroke="#6E96AD" strokeWidth="0.6" opacity="0.45">
          <path d="M720 900 C 920 860, 1080 880, 1280 840 S 1520 820, 1520 820" />
          <path d="M520 900 C 720 860, 880 880, 1080 840 S 1320 820, 1320 820" />
          <path d="M920 900 C 1120 860, 1280 880, 1480 840" />
          <path d="M960 120 C 1160 80, 1320 100, 1480 60 S 1520 40, 1520 40" />
          <path d="M760 120 C 960 80, 1120 100, 1320 60" />
          <path d="M880 200 C 1080 160, 1240 180, 1440 140" />
          <ellipse cx="1180" cy="220" rx="380" ry="160" />
          <ellipse cx="1180" cy="220" rx="300" ry="125" />
          <ellipse cx="1180" cy="220" rx="220" ry="92" />
          <ellipse cx="1280" cy="720" rx="320" ry="140" />
          <ellipse cx="1280" cy="720" rx="240" ry="105" />
        </g>
      </svg>

      <svg
        data-hero-waves
        className="absolute left-1/2 top-[48%] h-[min(58vh,440px)] w-[min(150vw,1700px)] -translate-x-1/2 -translate-y-1/2 opacity-90"
        viewBox="0 0 1600 420"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="wave-glow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wave-fade-x" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor="white" stopOpacity="0.9" />
            <stop offset="92%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="wave-mask">
            <rect width="1600" height="420" fill="url(#wave-fade-x)" />
          </mask>
        </defs>
        <g mask="url(#wave-mask)" filter="url(#wave-glow)" strokeLinecap="round">
          <path d="M-80 210 C 120 120, 280 300, 480 210 S 840 120, 1040 210 S 1360 300, 1680 210" stroke="#B8DCF2" strokeWidth="1.4" opacity="0.5" />
          <path d="M-80 228 C 140 138, 300 318, 500 228 S 860 138, 1060 228 S 1380 318, 1680 228" stroke="#9FD0EE" strokeWidth="1.15" opacity="0.38" />
          <path d="M-80 192 C 100 102, 260 282, 460 192 S 820 102, 1020 192 S 1340 282, 1680 192" stroke="#C5E4F5" strokeWidth="1.25" opacity="0.42" />
          <path d="M-80 246 C 160 156, 320 336, 520 246 S 880 156, 1080 246 S 1400 336, 1680 246" stroke="#88C6E6" strokeWidth="0.95" opacity="0.3" />
          <path d="M-80 174 C 80 84, 240 264, 440 174 S 800 84, 1000 174 S 1320 264, 1680 174" stroke="#D0EAF7" strokeWidth="0.8" opacity="0.24" />
          <path d="M-80 264 C 180 174, 340 354, 540 264 S 900 174, 1100 264 S 1420 354, 1680 264" stroke="#78B8DC" strokeWidth="0.7" opacity="0.2" />
          <path d="M-80 156 C 60 66, 220 246, 420 156 S 780 66, 980 156 S 1300 246, 1680 156" stroke="#DAF0FA" strokeWidth="0.6" opacity="0.16" />
          <path d="M-80 282 C 200 192, 360 372, 560 282 S 920 192, 1120 282 S 1440 372, 1680 282" stroke="#68AED0" strokeWidth="0.55" opacity="0.14" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 48%, transparent 40%, rgb(11 15 20 / 0.45) 100%)",
        }}
      />
    </div>
  );
}
