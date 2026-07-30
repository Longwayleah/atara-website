"use client";

import { m } from "framer-motion";
import { pageTransition } from "@/lib/motion/variants";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <m.div
      variants={pageTransition}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </m.div>
  );
}
