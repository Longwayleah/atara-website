"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { CartButton } from "@/components/shop/CartButton";
import { navigation, siteConfig } from "@/config/site";
import { useAppStore } from "@/store/useAppStore";
import { useScrollStore } from "@/store/useScrollStore";

/** Fully visible through this fraction of hero scroll */
const HOME_HEADER_HOLD_RATIO = 0.58;
/** Fade-out spans this additional fraction of hero height */
const HOME_HEADER_FADE_RATIO = 0.34;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutExpo(value: number) {
  return value >= 1 ? 1 : 1 - Math.pow(2, -10 * value);
}

function easeOutQuint(value: number) {
  return 1 - Math.pow(1 - value, 5);
}

function easeOutQuart(value: number) {
  return 1 - Math.pow(1 - value, 4);
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function easeInOutQuart(value: number) {
  return value < 0.5
    ? 8 * value * value * value * value
    : 1 - Math.pow(-2 * value + 2, 4) / 2;
}

function getHomeHeaderMotion(
  scrollY: number,
  hideStart: number,
  hideEnd: number,
  direction: "up" | "down" | null,
) {
  const fadeSpan = Math.max(hideEnd - hideStart, 1);
  const isRevealing = direction === "up";

  const motionStart = isRevealing ? hideStart - fadeSpan * 0.24 : hideStart;
  const motionSpan = isRevealing ? fadeSpan * 1.48 : fadeSpan;
  const raw = clamp01((scrollY - motionStart) / motionSpan);

  if (isRevealing) {
    const slideFade = smoothstep(clamp01((raw - 0.04) / 0.96));
    const opacityFade = smoothstep(clamp01((raw - 0.16) / 0.84));
    const scaleFade = smoothstep(clamp01((raw - 0.22) / 0.78));

    return {
      raw,
      opacity: 1 - easeInOutQuart(opacityFade),
      translateY: easeOutExpo(slideFade) * 64,
      scale: 1 - easeOutQuint(scaleFade) * 0.006,
    };
  }

  const opacityFade = smoothstep(clamp01((raw - 0.08) / 0.92));
  const slideFade = smoothstep(clamp01((raw - 0.2) / 0.8));
  const scaleFade = smoothstep(clamp01((raw - 0.26) / 0.74));

  return {
    raw,
    opacity: 1 - easeOutQuart(opacityFade),
    translateY: easeOutExpo(slideFade) * 68,
    scale: 1 - easeOutQuint(scaleFade) * 0.008,
  };
}

function getHomeHeaderMetrics(isHomePage: boolean) {
  // Inner pages have no cinematic hero — use viewport so fade timing matches home.
  const hero = isHomePage
    ? (document.querySelector("main > *:first-child") ??
      document.querySelector("main section:first-child"))
    : null;
  const heroHeight = hero
    ? (hero as HTMLElement).offsetHeight
    : window.innerHeight;
  const hideStart = Math.max(180, Math.round(heroHeight * HOME_HEADER_HOLD_RATIO));
  const hideEnd = Math.max(
    hideStart + 200,
    Math.round(heroHeight * (HOME_HEADER_HOLD_RATIO + HOME_HEADER_FADE_RATIO)),
  );

  return { hideEnd, hideStart };
}

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isMenuOpen = useAppStore((s) => s.isMenuOpen);
  const toggleMenu = useAppStore((s) => s.toggleMenu);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);
  const scrollY = useScrollStore((s) => s.scrollY);
  const scrollDirection = useScrollStore((s) => s.direction);
  const setScroll = useScrollStore((s) => s.setScroll);
  const lastScrollDirection = useRef<"up" | "down" | null>(null);
  const [mounted, setMounted] = useState(false);
  const [homeHeaderMetrics, setHomeHeaderMetrics] = useState({
    hideEnd: 780,
    hideStart: 520,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollDirection) {
      lastScrollDirection.current = scrollDirection;
    }
  }, [scrollDirection]);

  const headerMotionDirection = scrollDirection ?? lastScrollDirection.current;
  const isRevealingHeader = headerMotionDirection === "up";

  const scrolled = scrollY > 50;
  const headerMotion = !isMenuOpen
    ? getHomeHeaderMotion(
        scrollY,
        homeHeaderMetrics.hideStart,
        homeHeaderMetrics.hideEnd,
        headerMotionDirection,
      )
    : { raw: 0, opacity: 1, translateY: 0, scale: 1 };
  const headerInteractive = isMenuOpen || headerMotion.opacity > 0.04;
  const navyReveal = easeOutQuint(
    clamp01((scrollY - 20) / (isRevealingHeader ? 168 : 128)),
  );
  const navyExit = 1 - easeOutQuart(smoothstep(clamp01(headerMotion.raw / 0.78)));
  const navyStrength =
    isHomePage && !isMenuOpen ? navyReveal * navyExit : 0;
  const useNavyBar = navyStrength > 0.32;
  const mobileIconOnDark = useNavyBar && !isMenuOpen;

  useEffect(() => {
    setScroll({ scrollY: 0, velocity: 0, direction: null, progress: 0 });
  }, [pathname, setScroll]);

  useEffect(() => {
    const updateHideOffset = () =>
      setHomeHeaderMetrics(getHomeHeaderMetrics(isHomePage));
    updateHideOffset();
    // Recalculate after layout paints (shop/content height)
    const frame = window.requestAnimationFrame(updateHideOffset);
    window.addEventListener("resize", updateHideOffset, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateHideOffset);
    };
  }, [pathname, isHomePage]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const showSolidBar = isHomePage
    ? navyStrength > 0.04 || headerMotion.raw > 0
    : isMenuOpen || (scrolled && headerMotion.opacity > 0.04);
  const navyBarOpacity = navyStrength;

  const homeHeaderTransition = isRevealingHeader
    ? "transform 560ms cubic-bezier(0.16, 1, 0.3, 1), opacity 720ms cubic-bezier(0.22, 1, 0.36, 1)"
    : "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)";

  const headerBarStyle = !isMenuOpen
    ? {
        transform: `translate3d(0, ${-headerMotion.translateY}%, 0) scale(${headerMotion.scale})`,
        opacity: headerMotion.opacity,
        transition: homeHeaderTransition,
      }
    : undefined;

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        data-open={isMenuOpen ? "true" : "false"}
        className={cn(
          "mobile-menu-overlay fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white md:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu-overlay__surface pointer-events-none absolute inset-0" aria-hidden />

        <nav
          id="mobile-primary-nav"
          className="relative z-[1] flex min-h-full flex-col justify-center gap-6 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))]"
          aria-label="Mobile"
        >
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isMenuOpen ? 0 : -1}
              className="mobile-menu-overlay__link font-display text-[clamp(1.75rem,7vw,2.25rem)] font-semibold uppercase tracking-[-0.02em] text-archon-navy transition-colors hover:text-archon-navy"
              style={{
                transitionDelay: isMenuOpen ? `${120 + index * 60}ms` : "0ms",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>,
      document.body,
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[110]",
          !isHomePage &&
            "transition-[background-color,border-color] duration-500 ease-out",
          isMenuOpen && "border-b border-black/5 bg-white/95 backdrop-blur-sm",
          isHomePage && !isMenuOpen
            ? cn(
                "border-b backdrop-blur-sm transition-[border-color,background-color] duration-[900ms] ease-out",
                navyBarOpacity > 0.04
                  ? "border-white/10"
                  : "border-transparent bg-transparent",
              )
            : !isHomePage && !showSolidBar
              ? "bg-transparent"
              : !isHomePage
                ? "border-b border-black/5 bg-white/90 backdrop-blur-sm transition-[background-color,border-color] duration-500 ease-out"
                : null,
        )}
      >
        <div
          style={headerBarStyle}
          className={cn(
            "relative will-change-[transform,opacity]",
            !headerInteractive && "pointer-events-none",
          )}
        >
          {isHomePage && !isMenuOpen && navyBarOpacity > 0.04 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-archon-navy/95"
              style={{
                opacity: navyBarOpacity,
                transition: isRevealingHeader
                  ? "opacity 680ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ) : null}
          <div className="relative z-[1] mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10 lg:px-16">
            <Link
              href="/"
              className={cn(
                "justify-self-start font-display text-[13px] font-extrabold uppercase tracking-[0.24em] transition-[color,opacity] duration-[900ms] ease-out",
                isMenuOpen
                  ? "text-archon-black"
                  : useNavyBar
                    ? "text-white"
                    : "text-archon-black",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {siteConfig.name}
            </Link>

            <nav className="relative z-10 hidden items-center justify-self-center md:flex md:gap-5 lg:gap-7 xl:gap-9">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap font-body text-[10px] font-semibold uppercase tracking-[0.16em] transition-[color,opacity] duration-[900ms] ease-out md:text-[9px] lg:text-[10px]",
                    useNavyBar
                      ? "text-white/65 hover:text-white"
                      : "text-archon-black/70 hover:text-archon-black",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="col-start-3 hidden items-center justify-self-end md:flex">
              <CartButton onDark={useNavyBar} />
            </div>

            <div className="pointer-events-auto relative z-50 col-start-3 flex items-center gap-4 justify-self-end md:hidden">
              <CartButton onDark={isMenuOpen ? false : mobileIconOnDark} />
              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-primary-nav"
                className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
                onClick={toggleMenu}
              >
                <span
                  className={cn(
                    "h-px w-5 transition-transform duration-300 ease-out",
                    mobileIconOnDark ? "bg-white" : "bg-archon-black",
                    isMenuOpen && "translate-y-[3.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-5 transition-transform duration-300 ease-out",
                    mobileIconOnDark ? "bg-white" : "bg-archon-black",
                    isMenuOpen && "-translate-y-[3.5px] -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
