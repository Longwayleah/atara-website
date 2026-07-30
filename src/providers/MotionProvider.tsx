"use client";

import { LazyMotion, domAnimation } from "framer-motion";

interface MotionProviderProps {
  children: React.ReactNode;
}

/** Lazy-loads Framer Motion features for smaller bundle */
export function MotionProvider({ children }: MotionProviderProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
