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

const { labBench } = homepageCopy;

export function LabBench() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const rows = sectionRef.current.querySelectorAll("[data-lab-row]");
      rows.forEach((row) => {
        gsap.from(row, {
          y: 32,
          opacity: 0,
          immediateRender: false,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="lineup" className="product-grid-atmosphere py-24 text-archon-navy md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(11,31,58,0.08)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <header className="max-w-xl border-b border-archon-navy/10 pb-10 md:pb-12">
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
            {labBench.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em]">
            {labBench.headline}
          </h2>
        </header>

        <ul className="relative z-[1] mt-12 space-y-6 md:mt-16">
          {products.map((product, index) => (
            <li
              key={product.id}
              data-lab-row
              className="product-glass-card product-glass-card--row grid gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:items-center md:gap-12 lg:gap-16"
            >
              <span className="product-glass-card__sheen" aria-hidden />
              <div className="product-glass-card__stage relative z-[1] mx-auto aspect-[3/5] w-[min(42vw,160px)] md:mx-0 md:w-full md:max-w-[180px]">
                <span className="product-glass-card__stage-depth" aria-hidden />
                <span className="product-glass-card__stage-glow" aria-hidden />
                <div className="relative mx-auto aspect-[3/5] w-[72%]">
                  <Image
                    src={product.image}
                    alt={getProductImageAlt(product)}
                    fill
                    className="relative z-[1] object-contain drop-shadow-[0_20px_40px_rgba(11,31,58,0.22)]"
                    sizes="180px"
                    priority={index < 2}
                  />
                </div>
              </div>

              <div className="relative z-[1] md:max-w-lg">
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-archon-navy/40">
                  {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </p>

                <ProductName
                  name={product.name}
                  subtitle={product.subtitle}
                  as="h3"
                  className="mt-4"
                  nameClassName="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em]"
                />

                <p className="mt-4 font-body text-[11px] uppercase tracking-[0.22em] text-archon-muted">
                  {labBench.dosageLabel} · {getProductDosageLabel(product)}
                </p>

                <p className="mt-5 max-w-md font-body text-sm leading-[1.8] text-archon-muted md:text-[15px]">
                  {product.descriptor}
                </p>

                <Link
                  href={`/shop/${product.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-archon-navy transition-colors hover:text-archon-navy/55"
                >
                  {labBench.viewLabel}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path
                      d="M1 9L9 1M9 1H3M9 1V7"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
