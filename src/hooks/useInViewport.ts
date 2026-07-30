"use client";

import { useEffect, useState, type RefObject } from "react";

/** Observe whether an element is near the viewport — for pausing WebGL / heavy effects */
export function useInViewport(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "120px 0px",
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
