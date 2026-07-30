/** Static molecule for reduced-motion fallback */
export function MoleculeFallback() {
  return (
    <svg
      className="mx-auto h-full w-full max-w-[300px] opacity-50"
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="52" r="7" fill="#eef2f7" />
      <circle cx="58" cy="98" r="6" fill="#c8d4e0" />
      <circle cx="142" cy="94" r="6" fill="#9eb0c2" />
      <circle cx="72" cy="148" r="6.5" fill="#b8c6d4" />
      <circle cx="128" cy="152" r="6" fill="#7f96ad" />
      <circle cx="100" cy="196" r="7" fill="#dde6ef" />
      <circle cx="44" cy="126" r="4.5" fill="#6e86a0" />
      <circle cx="156" cy="118" r="4.5" fill="#8fa4b8" />
      <path
        d="M100 52 L58 98 M100 52 L142 94 M58 98 L72 148 M142 94 L128 152 M72 148 L100 196 M128 152 L100 196 M58 98 L44 126 M142 94 L156 118 M100 52 L72 148 M100 52 L128 152"
        stroke="#8fa3b8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
