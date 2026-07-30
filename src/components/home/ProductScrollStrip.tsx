"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { getProductDosageLabel, products } from "@/config/products";
import { Container } from "@/components/ui/Container";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProductScrollStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !trackRef.current) return;

      gsap.from(sectionRef.current.querySelector("[data-strip-header]"), {
        y: 40,
        opacity: 0,
        immediateRender: false,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const items = trackRef.current.querySelectorAll("[data-strip-item]");
      gsap.from(items, {
        x: 60,
        opacity: 0,
        immediateRender: false,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-archon-white py-24 md:py-32">
      <Container>
        <div data-strip-header className="mb-12 max-w-xl">
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
            Product Experience
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-archon-navy">
            Explore the collection
          </h2>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="product-scroll-track flex gap-6 overflow-x-auto px-6 pb-4 md:gap-8 md:px-10 lg:px-16"
        data-lenis-prevent
      >
        {products.map((product) => (
          <article
            key={product.id}
            data-strip-item
            className="group w-[280px] shrink-0 rounded-2xl border border-archon-navy/8 bg-archon-cream/50 p-6 transition-all duration-500 hover:border-archon-navy/20 hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] md:w-[320px]"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[200px] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
              <Image
                src={product.image}
                alt={getProductImageAlt(product)}
                fill
                className="object-contain"
                sizes="200px"
              />
            </div>
            <div className="mt-4 text-center">
              <ProductName
                name={product.name}
                subtitle={product.subtitle}
                as="h3"
                className="text-center"
                nameClassName="font-display text-lg text-archon-navy"
                subtitleClassName="text-[11px] text-archon-muted/80"
              />
              <p className="mt-1 font-body text-xs text-archon-muted">{getProductDosageLabel(product)}</p>
              <p className="mt-3 font-body text-xs leading-relaxed text-archon-muted">
                {product.descriptor}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
