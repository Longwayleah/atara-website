"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "words" | "chars";
};

export function RevealText({
  text,
  className,
  as: Tag = "h2",
  splitBy = "words",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const parts =
    splitBy === "words" ? text.split(" ") : text.split("");

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const targets = ref.current.querySelectorAll("[data-reveal-part]");
      gsap.from(targets, {
        y: "110%",
        opacity: 0,
        duration: 0.9,
        stagger: splitBy === "words" ? 0.06 : 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    },
    { scope: ref, dependencies: [reduced, text, splitBy] },
  );

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      <div ref={ref} className="inline">
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-reveal-part className="inline-block">
              {part}
              {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </div>
    </Tag>
  );
}
