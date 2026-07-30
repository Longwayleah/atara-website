import Image from "next/image";
import { images } from "@/config/assets";

/** Layer 0 — hero background photo */
export function HeroLuxuryField() {
  return (
    <div
      data-hero-reveal="background"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white"
      aria-hidden
    >
      <div
        data-hero-parallax="background"
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={images.heroBackground}
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="relative z-0 object-cover [object-position:var(--hero-img-pos)] scale-[1.02]"
        />
      </div>
    </div>
  );
}
