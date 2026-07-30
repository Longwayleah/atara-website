"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

/**
 * Exact Atara protocol reference:
 * 50/50 split, square panes (height = 50vw), Soft Ivory copy panel,
 * PROTOCOL / title / compound / rule / description / EXPLORE PROTOCOL →
 */
export function ProtocolReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const panels = homepageCopy.protocols.cards.filter(
    (card) => card.id !== "essential",
  );

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      sectionRef.current
        .querySelectorAll("[data-protocol-panel]")
        .forEach((row) => {
          gsap.fromTo(
            row.querySelectorAll("[data-reveal]"),
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 78%" },
            },
          );
        });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="protocols"
      className="bg-[#F5F1EB] text-[#3E3934]"
      aria-label="Three protocols"
    >
      {panels.map((card, index) => {
        const imageLeft = index % 2 === 0;
        const number = String(index + 1).padStart(2, "0");

        return (
          <article
            key={card.id}
            data-protocol-panel
            className="grid w-full grid-cols-1 md:grid-cols-2 md:h-[min(50vw,900px)]"
          >
            {/* Photo */}
            <div
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden bg-[#F5F1EB] md:aspect-auto md:h-full",
                !imageLeft && "md:order-2",
              )}
            >
              <Image
                src={card.panelImage}
                alt={`${card.name} protocol`}
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Copy — Soft Ivory panel */}
            <div
              className={cn(
                "relative flex w-full items-center bg-[#F5F1EB] px-10 py-16 md:h-full md:px-[8%] lg:px-[10%]",
                !imageLeft && "md:order-1",
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-[6%] top-[8%] font-display text-[clamp(5rem,11vw,7.5rem)] font-medium leading-none text-[#3E3934]/[0.07]"
              >
                {number}
              </span>

              <div data-reveal className="relative z-[1] w-full max-w-[22rem]">
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.35em] text-[#B38C5A]">
                  Protocol
                </p>

                <h2 className="mt-3 font-display text-[clamp(2.75rem,4.5vw,3.75rem)] font-medium leading-none tracking-[-0.02em] text-[#3E3934]">
                  {card.name}
                </h2>

                <p className="mt-3 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-[#B38C5A]">
                  {card.focus}
                </p>

                <div className="mt-5 h-px w-11 bg-[#B38C5A]" />

                <p className="mt-5 font-display text-[1.05rem] font-normal leading-[1.55] text-[#3E3934]/85">
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className="mt-9 inline-flex items-center gap-2 border-b border-[#B38C5A] pb-1 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-[#B38C5A] transition-opacity hover:opacity-80"
                >
                  Explore protocol
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
