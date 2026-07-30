"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { featuredProducts } from "@/config/products";
import { images } from "@/config/assets";
import { Container } from "@/components/ui/Container";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

const FEATURED_COUNT = 4;
const AUTO_ADVANCE_MS = 3200;
const CROSSFADE_DURATION = 1.15;
const COPY_DURATION = 0.85;

const featuredItems = featuredProducts.slice(0, FEATURED_COUNT);
const headlineWords = homepageCopy.featured.headline.split(" ");

function resetFeaturedReveal(section: HTMLElement) {
  const eyebrow = section.querySelector("[data-featured-eyebrow]");
  const words = section.querySelectorAll("[data-featured-word]");
  const link = section.querySelector("[data-featured-link]");
  const slides = section.querySelector("[data-featured-slides-wrap]");
  const copy = section.querySelector("[data-featured-copy]");
  const dots = section.querySelector("[data-featured-dots]");
  const bg = section.querySelector("[data-featured-bg]");

  if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
  gsap.set(words, { y: "110%", autoAlpha: 0 });
  if (link) gsap.set(link, { autoAlpha: 0, y: 16 });
  if (slides) gsap.set(slides, { autoAlpha: 0, y: 52, scale: 0.94 });
  if (copy) gsap.set(copy, { autoAlpha: 0, y: 28 });
  if (dots) gsap.set(dots, { autoAlpha: 0, y: 12 });
  if (bg) gsap.set(bg, { scale: 1.1, y: "-6%" });
}

export function FeaturedSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const splashComplete = useAppStore((s) => s.splashComplete);
  const { featured } = homepageCopy;
  const total = featuredItems.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  const activeProduct = featuredItems[activeIndex];

  useEffect(() => {
    if (reduced) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((current) => (current + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reduced, total]);

  useGSAP(
    () => {
      if (reduced || !splashComplete || !sectionRef.current) return;

      const section = sectionRef.current;
      const eyebrow = section.querySelector("[data-featured-eyebrow]");
      const words = section.querySelectorAll("[data-featured-word]");
      const link = section.querySelector("[data-featured-link]");
      const slides = section.querySelector("[data-featured-slides-wrap]");
      const slidesInner = section.querySelector("[data-featured-slides]");
      const copy = section.querySelector("[data-featured-copy]");
      const dots = section.querySelector("[data-featured-dots]");
      const bg = section.querySelector("[data-featured-bg]");

      if (!eyebrow && !words.length) return;

      resetFeaturedReveal(section);

      const reveal = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 38%",
            scrub: 0.72,
          },
        })
        .to(eyebrow, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0)
        .to(
          words,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.08,
        )
        .to(link, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.22)
        .to(
          slides,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
          },
          0.18,
        )
        .to(copy, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.42)
        .to(dots, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.52);

      const parallaxConfig = {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.85,
      };

      const triggers: ScrollTrigger[] = [];
      if (reveal.scrollTrigger) triggers.push(reveal.scrollTrigger);

      if (bg) {
        const bgParallax = gsap.fromTo(
          bg,
          { y: "-6%", scale: 1.1 },
          {
            y: "6%",
            scale: 1.02,
            ease: "none",
            scrollTrigger: parallaxConfig,
          },
        );
        if (bgParallax.scrollTrigger) triggers.push(bgParallax.scrollTrigger);
      }

      if (slidesInner) {
        const slideParallax = gsap.fromTo(
          slidesInner,
          { y: 24 },
          {
            y: -24,
            ease: "none",
            scrollTrigger: {
              ...parallaxConfig,
              scrub: 1.1,
            },
          },
        );
        if (slideParallax.scrollTrigger) triggers.push(slideParallax.scrollTrigger);
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        reveal.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced, splashComplete] },
  );

  useGSAP(
    () => {
      if (!slidesRef.current || !splashComplete) return;

      const slides = slidesRef.current.querySelectorAll("[data-featured-slide]");

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;

        gsap.to(slide, {
          autoAlpha: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.988,
          duration: reduced ? 0 : CROSSFADE_DURATION,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    },
    { scope: sectionRef, dependencies: [activeIndex, reduced, splashComplete] },
  );

  useGSAP(
    () => {
      if (!copyRef.current || reduced) return;

      gsap.fromTo(
        copyRef.current,
        { y: 10 },
        {
          y: 0,
          duration: COPY_DURATION,
          ease: "power2.inOut",
        },
      );
    },
    { dependencies: [activeIndex, reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden border-t border-archon-navy/10 bg-white text-archon-navy"
    >
      <div
        ref={bgRef}
        data-featured-bg
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
      >
        <Image
          src={images.featuredProtocolBackground}
          alt=""
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-[50%_48%]"
        />
      </div>

      <Container className="relative z-10 grid h-full grid-rows-[auto_minmax(0,1fr)] py-5 md:py-6">
        <div
          data-featured-header
          className="flex shrink-0 flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p
              data-featured-eyebrow
              className="font-body text-[11px] uppercase tracking-[0.32em] text-archon-navy/50"
            >
              {featured.eyebrow}
            </p>
            <h2 className="mt-2 max-w-[16ch] font-display text-[clamp(1.75rem,2.8vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.01em] text-archon-navy">
              {reduced
                ? featured.headline
                : headlineWords.map((word, index) => (
                    <span
                      key={`${word}-${index}`}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <span data-featured-word className="inline-block">
                        {word}
                        {index < headlineWords.length - 1 ? "\u00A0" : ""}
                      </span>
                    </span>
                  ))}
            </h2>
          </div>
          <Link
            data-featured-link
            href={featured.viewAllHref}
            className="group inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/70 transition-colors hover:text-archon-navy"
          >
            {featured.viewAllLabel}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <div
          className="flex min-h-0 items-center justify-center"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={() => {
            pausedRef.current = false;
          }}
        >
          <div
            data-featured-content
            className="flex w-full max-w-4xl flex-col items-center max-md:-translate-y-2 md:-translate-y-1"
          >
            <div
              data-featured-slides-wrap
              className="w-full will-change-transform"
            >
            <div
              ref={slidesRef}
              data-featured-slides
              className="relative mx-auto aspect-[4/5] h-[min(56svh,640px)] w-auto max-w-[min(94vw,640px)] max-md:-translate-y-1 md:h-[min(50svh,620px)] md:max-w-[680px] lg:h-[min(48svh,660px)] lg:max-w-[720px]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured protocol vials"
            >
              {featuredItems.map((product, index) => (
                <Link
                  key={product.id}
                  href={featured.viewAllHref}
                  data-featured-slide
                  className="absolute inset-0 block origin-center"
                  aria-hidden={index !== activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  <div className="absolute inset-[0%_2%_1%] flex items-center justify-center">
                    <div className="relative h-full w-full max-w-full">
                      <Image
                        src={product.image}
                        alt={getProductImageAlt(product)}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 94vw, 820px"
                        priority={index === 0}
                        quality={82}
                        draggable={false}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </div>

            <div
              ref={copyRef}
              data-featured-copy
              className="-mt-20 w-full px-4 text-center md:mt-2 lg:mt-4"
              aria-live="polite"
            >
              <ProductName
                name={activeProduct.name}
                subtitle={activeProduct.subtitle}
                as="h3"
                nameClassName="font-display text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.02em] text-archon-navy"
                subtitleClassName="text-xs text-archon-navy/65 md:text-sm"
              />
              <Link
                href={featured.viewAllHref}
                className="group mt-2 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/75 transition-colors hover:text-archon-navy"
              >
                {featured.exploreLabel}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>

            <div
              data-featured-dots
              className="mt-2 flex items-center justify-center gap-2 md:mt-3"
            >
              {featuredItems.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`Show ${product.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "w-8 bg-archon-navy/70"
                      : "w-1.5 bg-archon-navy/20 hover:bg-archon-navy/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
