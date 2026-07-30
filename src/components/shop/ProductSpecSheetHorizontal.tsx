"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { ProductEditorialContent } from "@/config/product-content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap/register";

type ProductSpecSheetHorizontalProps = {
  content: ProductEditorialContent;
};

type SpecSectionId = "overview" | "profile" | "applications" | "standard";

const sections: Array<{
  id: SpecSectionId;
  label: string;
}> = [
  { id: "overview", label: "Overview" },
  { id: "profile", label: "Profile" },
  { id: "applications", label: "Applications" },
  { id: "standard", label: "Standard" },
];

export function ProductSpecSheetHorizontal({
  content,
}: ProductSpecSheetHorizontalProps) {
  const [active, setActive] = useState<SpecSectionId>("overview");
  const reduced = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasMounted = useRef(false);

  const activeIndex = sections.findIndex((section) => section.id === active);

  const syncIndicator = (instant: boolean) => {
    const tab = tabRefs.current[activeIndex];
    const tablist = tablistRef.current;
    const indicator = indicatorRef.current;
    if (!tab || !tablist || !indicator) return;

    const tabRect = tab.getBoundingClientRect();
    const listRect = tablist.getBoundingClientRect();
    const x = tabRect.left - listRect.left + tablist.scrollLeft;

    gsap.to(indicator, {
      x,
      width: tabRect.width,
      duration: instant || reduced ? 0 : 0.45,
      ease: "power3.out",
      overwrite: true,
    });
  };

  useLayoutEffect(() => {
    syncIndicator(!hasMounted.current);
    hasMounted.current = true;
  }, [active, reduced, activeIndex]);

  useGSAP(
    () => {
      const tablist = tablistRef.current;
      if (!tablist) return;

      const onResize = () => syncIndicator(true);
      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    },
    { scope: rootRef, dependencies: [active] },
  );

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (reduced) {
        gsap.set(panel, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        panel,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" },
      );
    },
    { scope: rootRef, dependencies: [active, reduced] },
  );

  return (
    <div ref={rootRef}>
      <div
        ref={tablistRef}
        className="relative flex justify-start gap-6 overflow-x-auto scroll-px-4 border-b border-archon-navy/10 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center md:gap-10 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Specification"
      >
        <span
          ref={indicatorRef}
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-archon-navy shadow-[0_0_16px_rgba(11,31,58,0.55)]"
        />

        {sections.map((section, index) => {
          const isActive = active === section.id;

          return (
            <button
              key={section.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActive(section.id);
                tabRefs.current[index]?.scrollIntoView({
                  inline: "center",
                  block: "nearest",
                  behavior: reduced ? "auto" : "smooth",
                });
              }}
              className={[
                "relative shrink-0 appearance-none border-0 bg-transparent px-2",
                "min-h-11 font-body text-[13px] tracking-[0.04em] whitespace-nowrap md:text-sm",
                "outline-none ring-0 transition-[color,text-shadow] duration-300",
                isActive
                  ? "text-archon-navy [text-shadow:0_0_20px_rgba(11,31,58,0.4)]"
                  : "text-archon-navy/40 hover:text-archon-navy/70 hover:[text-shadow:0_0_16px_rgba(11,31,58,0.22)]",
              ].join(" ")}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        className="mx-auto mt-8 max-w-xl border-0 bg-transparent p-0 text-center shadow-none md:mt-10"
        role="tabpanel"
      >
        {active === "overview" ? (
          <p className="font-body text-[15px] leading-[1.8] text-archon-navy/70 md:text-base md:leading-[1.85]">
            {content.overview}
          </p>
        ) : null}

        {active === "profile" ? (
          <div className="flex flex-col items-center gap-4">
            <p className="font-display text-lg tracking-[-0.02em] text-archon-navy md:text-xl">
              {content.scientificProfile.classification}
            </p>
            <p className="font-body text-[15px] leading-[1.8] text-archon-navy/70 md:text-base md:leading-[1.85]">
              {content.scientificProfile.description}
            </p>
          </div>
        ) : null}

        {active === "applications" ? (
          <ul className="flex list-none flex-col items-center gap-3.5 px-2 p-0">
            {content.applications.map((application) => (
              <li
                key={application}
                className="max-w-full text-balance break-words font-body text-[12px] uppercase tracking-[0.1em] text-archon-navy/70 sm:text-[13px] sm:tracking-[0.14em]"
              >
                {application}
              </li>
            ))}
          </ul>
        ) : null}

        {active === "standard" ? (
          <p className="font-body text-[15px] leading-[1.8] text-archon-navy/70 md:text-base md:leading-[1.85]">
            Every batch undergoes independent third-party analytical testing to
            verify identity and purity prior to release. Batch-specific
            Certificates of Analysis (COAs) are available through the{" "}
            <Link
              href="/coa"
              className="text-archon-navy underline decoration-archon-navy/30 underline-offset-[0.2em] transition-[text-shadow,text-decoration-color] duration-300 hover:decoration-archon-navy/70 hover:[text-shadow:0_0_28px_rgba(11,31,58,0.4)] [text-shadow:0_0_20px_rgba(11,31,58,0.28)]"
            >
              Quality &amp; Verification Library
            </Link>
            , providing researchers with transparent documentation and confidence
            in every purchase.
          </p>
        ) : null}
      </div>
    </div>
  );
}
