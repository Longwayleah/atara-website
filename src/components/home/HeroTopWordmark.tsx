import type { RefObject } from "react";
import { homepageCopy } from "@/config/homepage";
import { cn } from "@/lib/utils/cn";

type HeroTopWordmarkProps = {
  variant?: "hero" | "splash" | "cta";
  wordmarkRef?: RefObject<HTMLSpanElement | null>;
  className?: string;
  splitLetters?: boolean;
};

/** Full-width ARCHON title — shared by hero watermark and splash intro */
export function HeroTopWordmark({
  variant = "hero",
  wordmarkRef,
  className,
  splitLetters = variant === "hero",
}: HeroTopWordmarkProps) {
  const brand = homepageCopy.hero.brand;
  const letters = brand.toUpperCase().split("");
  const useSplitLetters = splitLetters || variant === "hero";

  const wordmark = (
    <span ref={wordmarkRef} className="hero-top-wordmark relative inline-block">
      {useSplitLetters
        ? letters.map((letter, index) => (
            <span key={`${letter}-${index}`} className="wordmark-letter">
              {letter}
            </span>
          ))
        : brand}
      {!useSplitLetters ? <span className="hero-top-wordmark-grain">{brand}</span> : null}
    </span>
  );

  if (variant === "splash") {
    return (
      <p
        className={cn(
          "mx-auto w-full max-w-[min(96vw,64rem)] text-center font-display font-extrabold uppercase",
          className,
        )}
      >
        {wordmark}
      </p>
    );
  }

  if (variant === "cta") {
    return (
      <div
        className={cn(
          "final-cta-wordmark-wrap pointer-events-none absolute inset-0 z-[0] flex select-none items-center justify-center px-5 md:px-10 lg:px-14",
          className,
        )}
        aria-hidden
      >
        <div data-final-cta-wordmark className="final-cta-wordmark-stage">
          <span className="hero-top-wordmark relative font-display font-extrabold uppercase">
            {brand.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-hero-parallax="wordmark"
      className="hero-top-wordmark-wrap pointer-events-none absolute inset-x-0 z-[3] select-none px-5 will-change-transform md:px-10 lg:px-14"
      aria-hidden
    >
      <p className="mx-auto w-full text-center font-display font-extrabold uppercase">{wordmark}</p>
    </div>
  );
}
