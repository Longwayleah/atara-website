"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Edge sample from campaign art — seamless full-bleed canvas */
const CAMPAIGN_CANVAS = "#F5F1EB"; // Soft Ivory

/**
 * Full-bleed product campaign — edge to edge, no crop.
 * Section height follows the image so the full story stays visible.
 */
export function ProductCampaignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { protocols } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current.querySelector("[data-reveal]");
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CAMPAIGN_CANVAS }}
      aria-label="Atara product campaign"
    >
      <div data-reveal className="relative w-full aspect-[1597/985]">
        <Image
          src={protocols.campaignImage}
          alt={protocols.campaignAlt}
          fill
          quality={90}
          sizes="100vw"
          className="object-contain object-center"
          priority
        />
      </div>
    </section>
  );
}
