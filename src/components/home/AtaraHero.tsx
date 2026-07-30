"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { homepageCopy } from "@/config/homepage";
import { images } from "@/config/assets";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

/**
 * Full-bleed hero — same treatment as “A return to balance”.
 * Photo uses object-cover; headline is HTML so words never crop.
 */
export function AtaraHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = homepageCopy;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-archon-charcoal text-archon-cream"
      aria-label="Atara hero"
    >
      <div className="relative min-h-[100svh] w-full">
        <Image
          src={images.ataraEditorialPortrait}
          alt="Atara — serene editorial portrait"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-[70%_15%] md:object-[center_12%]"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-archon-charcoal/80 via-archon-charcoal/45 to-transparent md:via-archon-charcoal/35"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-28 md:px-12 md:py-32 lg:px-20">
          <div className="max-w-xl md:max-w-2xl">
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-medium uppercase leading-[1.05] tracking-[0.02em] text-archon-cream">
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-archon-cream/85 md:mt-8 md:text-base md:leading-[1.7]">
              {hero.body}
            </p>

            <Link
              href="#protocols"
              className="group mt-10 inline-flex items-center gap-4 md:mt-12"
            >
              <span
                aria-hidden
                className="h-10 w-px bg-archon-electric/80 transition-colors group-hover:bg-archon-cream"
              />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-archon-electric transition-colors group-hover:text-archon-cream">
                The protocols
              </span>
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center md:bottom-10">
          <ScrollIndicator hero label={hero.scrollLabel} />
        </div>
      </div>
    </section>
  );
}
