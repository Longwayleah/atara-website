import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion as motionTokens } from "@/config/design";

let registered = false;

/** Register GSAP plugins once — safe to call multiple times */
export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  gsap.defaults({
    ease: motionTokens.ease.outExpo,
    duration: motionTokens.duration.base,
  });

  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_GSAP_MARKERS === "true",
  });

  registered = true;
}

registerGSAP();

export { gsap, ScrollTrigger, useGSAP };
