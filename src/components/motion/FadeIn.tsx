"use client";

import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof m;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInProps) {
  const reduced = usePrefersReducedMotion();
  const Component = m[as] as typeof m.div;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
