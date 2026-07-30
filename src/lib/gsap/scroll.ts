import { gsap, ScrollTrigger } from "./setup";
import { motion as motionTokens } from "@/config/design";

type ScrollVars = ScrollTrigger.Vars;

/** Refresh all ScrollTriggers after layout shift (images, fonts, WebGL) */
export function refreshScroll() {
  ScrollTrigger.refresh();
}

/** Kill all ScrollTriggers — use sparingly (route changes, unmount) */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

type PinSectionOptions = {
  trigger: gsap.DOMTarget;
  start?: string;
  end?: string | (() => string);
  scrub?: boolean | number;
  pinSpacing?: boolean;
  onUpdate?: ScrollVars["onUpdate"];
};

/** Pin a scrollytelling section with sensible Archon defaults */
export function pinSection({
  trigger,
  start = "top top",
  end = "+=100%",
  scrub = motionTokens.scrollTrigger.scrub,
  pinSpacing = motionTokens.scrollTrigger.pinSpacing,
  onUpdate,
}: PinSectionOptions) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    scrub,
    pinSpacing,
    anticipatePin: 1,
    onUpdate,
  });
}

type ScrubTimelineOptions = {
  trigger: gsap.DOMTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  animation: gsap.core.Animation;
};

/** Link a timeline to scroll progress */
export function scrubTimeline({
  trigger,
  start = "top bottom",
  end = "bottom top",
  scrub = motionTokens.scrollTrigger.scrub,
  animation,
}: ScrubTimelineOptions) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    animation,
  });
}

export function createScrollTrigger(vars: ScrollVars) {
  return ScrollTrigger.create(vars);
}

/** Wire Lenis smooth scroll to ScrollTrigger (call once on mount) */
export function connectLenisToScrollTrigger(lenis: {
  scroll: number;
  on: (event: "scroll", handler: () => void) => void;
  scrollTo: (value: number, options?: { immediate?: boolean }) => void;
}) {
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.defaults({
    pinType: "transform",
  });

  ScrollTrigger.scrollerProxy(document.documentElement, {
    pinType: "transform",
    scrollTop(value) {
      if (arguments.length && typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.refresh();
}
