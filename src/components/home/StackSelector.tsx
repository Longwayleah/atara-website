"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { getProductDosageLabel, products } from "@/config/products";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";

const SLIDE_GAP = 92;
const { stackSelector } = homepageCopy;

function StackSelectorStatic() {
  return (
    <section className="bg-[#010308] py-24 text-[#f5f0e8] md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/45">
          {stackSelector.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em]">
          {stackSelector.headline}
        </h2>

        <ul className="mt-16 space-y-8">
          {products.map((product, index) => (
            <li
              key={product.id}
              className="grid gap-6 border-t border-[#f5f0e8]/10 pt-8 md:grid-cols-[120px_1fr] md:items-center"
            >
              <div className="relative mx-auto aspect-[3/5] w-[72px] md:mx-0">
                <Image
                  src={product.image}
                  alt={getProductImageAlt(product)}
                  fill
                  className="object-contain"
                  sizes="72px"
                />
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-[#e86a2a]/80">
                  {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </p>
                <div className="mt-2 flex flex-wrap items-start gap-x-4 gap-y-2">
                  <ProductName
                    name={product.name}
                    subtitle={product.subtitle}
                    as="h3"
                    nameClassName="font-display text-2xl tracking-[-0.02em]"
                    subtitleClassName="text-xs text-[#f5f0e8]/45"
                  />
                  <span className="font-body text-sm text-[#f5f0e8]/50">{getProductDosageLabel(product)}</span>
                </div>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-[#f5f0e8]/58">
                  {product.descriptor}
                </p>
                <Link
                  href={`/shop/${product.slug}`}
                  className="mt-4 inline-flex font-body text-[10px] uppercase tracking-[0.22em] text-[#e86a2a] transition-colors hover:text-[#f5f0e8]"
                >
                  {stackSelector.viewLabel}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StackSelector() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !pinRef.current || !stackRef.current) return;

      const slides = gsap.utils.toArray<HTMLElement>("[data-stack-slide]", stackRef.current);
      const copies = gsap.utils.toArray<HTMLElement>("[data-stack-copy]", sectionRef.current);
      const total = products.length;

      slides.forEach((slide, index) => {
        gsap.set(slide, {
          xPercent: -50,
          yPercent: -50,
          transformPerspective: 1200,
          y: index * SLIDE_GAP,
          scale: index === 0 ? 1 : 0.82,
          opacity: index === 0 ? 1 : index === 1 ? 0.42 : 0.15,
          filter: index === 0 ? "blur(0px)" : "blur(2px)",
          rotateY: index === 0 ? 58 : 78,
          zIndex: total - index,
        });
      });

      copies.forEach((copy, index) => {
        gsap.set(copy, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 18,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: "top top",
          end: `+=${Math.max(total - 1, 1) * 100}%`,
          scrub: 0.75,
          anticipatePin: 1,
          ...(total > 1 ? { snap: 1 / (total - 1) } : {}),
        },
      });

      for (let active = 0; active < total; active += 1) {
        slides.forEach((slide, index) => {
          const distance = Math.abs(index - active);
          timeline.to(
            slide,
            {
              y: (index - active) * SLIDE_GAP,
              scale: distance === 0 ? 1 : 0.82,
              opacity: distance === 0 ? 1 : distance === 1 ? 0.42 : 0.15,
              filter: distance === 0 ? "blur(0px)" : "blur(2px)",
              rotateY: distance === 0 ? 58 : 78,
              zIndex: total - distance,
              duration: 1,
              ease: "none",
            },
            active,
          );
        });

        copies.forEach((copy, index) => {
          timeline.to(
            copy,
            {
              autoAlpha: index === active ? 1 : 0,
              y: index === active ? 0 : 18,
              duration: 1,
              ease: "none",
            },
            active,
          );
        });

        if (progressRef.current) {
          timeline.to(
            progressRef.current,
            {
              scaleX: (active + 1) / total,
              duration: 1,
              ease: "none",
            },
            active,
          );
        }
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  if (reduced) {
    return <StackSelectorStatic />;
  }

  return (
    <section ref={sectionRef} className="relative bg-[#010308] text-[#f5f0e8]">
      <div ref={pinRef} className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_50%,rgba(232,106,42,0.12)_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_85%_20%,rgba(11,31,58,0.55)_0%,transparent_50%)]"
        />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 items-center gap-10 px-6 py-24 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-16 lg:py-28">
          {/* Stack viewport */}
          <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-0">
            <div className="absolute left-0 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-[#f5f0e8]/15 lg:block" aria-hidden />

            <div
              ref={stackRef}
              className="stack-selector-viewport relative h-[360px] w-[min(72vw,240px)] [perspective:1200px]"
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  data-stack-slide
                  className="stack-selector-slide absolute left-1/2 top-1/2 w-[min(58vw,180px)] will-change-transform"
                >
                  <div className="relative aspect-[3/5] w-full">
                    <div
                      aria-hidden
                      className="absolute inset-[8%] rounded-full bg-[#e86a2a]/10 blur-2xl"
                    />
                    <Image
                      src={product.image}
                      alt={getProductImageAlt(product)}
                      fill
                      className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
                      sizes="180px"
                      priority={index < 2}
                    />
                  </div>
                  <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.28em] text-[#f5f0e8]/30">
                    {getProductDosageLabel(product)}
                  </p>
                </div>
              ))}
            </div>

            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 font-body text-[9px] uppercase tracking-[0.28em] text-[#f5f0e8]/30 lg:bottom-8">
              {stackSelector.scrollHint}
            </p>
          </div>

          {/* Active copy */}
          <div className="relative flex min-h-[280px] flex-col justify-center lg:min-h-[420px]">
            <div className="mb-10 lg:mb-0">
              <p className="font-body text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/45">
                {stackSelector.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em]">
                {stackSelector.headline}
              </h2>
            </div>

            <div className="relative min-h-[220px]">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  data-stack-copy
                  className="absolute inset-0 flex flex-col justify-center"
                  aria-hidden={index !== 0}
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.24em] text-[#e86a2a]/85">
                    {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </p>
                  <div className="mt-4 flex flex-wrap items-start gap-x-4 gap-y-2">
                    <ProductName
                      name={product.name}
                      subtitle={product.subtitle}
                      as="h3"
                      nameClassName="font-display text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em]"
                      subtitleClassName="text-sm text-[#f5f0e8]/45"
                    />
                    <span className="font-body text-sm text-[#f5f0e8]/50">{getProductDosageLabel(product)}</span>
                  </div>
                  <p className="mt-5 max-w-md font-body text-sm leading-[1.8] text-[#f5f0e8]/58 md:text-[15px]">
                    {product.descriptor}
                  </p>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-[#e86a2a] transition-colors hover:text-[#f5f0e8]"
                  >
                    {stackSelector.viewLabel}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M1 5H9M9 5L5 1M9 5L5 9"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 h-px w-full origin-left scale-x-[0.1666667] bg-[#e86a2a]/70" ref={progressRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
