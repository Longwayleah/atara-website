import type { Variants } from "framer-motion";
import { durations, easings } from "./easings";

const transition = {
  duration: durations.base,
  ease: easings.outExpo,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.slow, ease: easings.outExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.slow, ease: easings.outExpo },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 1 },
  enter: {
    opacity: 1,
    transition: { duration: durations.base, ease: easings.outExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast, ease: easings.inOutCubic },
  },
};
