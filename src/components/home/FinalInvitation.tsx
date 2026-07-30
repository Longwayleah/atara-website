"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Section 11 — final invitation */
export function FinalInvitation() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { invitation } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-archon-charcoal py-28 text-archon-cream md:py-40"
    >
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div data-reveal className="relative mb-10 h-16 w-48 md:h-20 md:w-64">
            <Image
              src={invitation.wordmark}
              alt={invitation.wordmarkAlt}
              fill
              quality={90}
              sizes="256px"
              className="object-contain object-center"
            />
          </div>
          <p
            data-reveal
            className="font-display text-4xl font-medium tracking-[-0.02em] md:text-6xl"
          >
            {invitation.statement}
          </p>
          <Link
            data-reveal
            href={invitation.href}
            className="mt-10 inline-flex items-center justify-center border border-archon-electric bg-transparent px-8 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-archon-cream transition-colors hover:bg-archon-electric hover:text-archon-charcoal"
          >
            {invitation.actionLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
