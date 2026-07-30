import Image from "next/image";

/** Layer 1 — reference atmosphere plate (no typography) */
export function HeroLayeredBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#020408]" aria-hidden>
      <Image
        src="/images/hero-atmosphere.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
