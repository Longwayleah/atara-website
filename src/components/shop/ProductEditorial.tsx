import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/config/products";
import { products } from "@/config/products";
import {
  RESEARCH_NOTICE_COPY,
  type ProductEditorialContent,
} from "@/config/product-content";
import { ProductName } from "@/components/ui/ProductName";
import { getProductImageAlt } from "@/lib/seo/product";

type ProductScientificAccordionProps = {
  content: ProductEditorialContent;
  embedded?: boolean;
};

const bodyCopy =
  "font-body text-sm leading-[1.75] text-archon-black/70 md:text-[15px]";

function AccordionItem({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-base tracking-[-0.02em] text-archon-navy md:text-lg">
          {title}
        </span>
        <span
          aria-hidden
          className="shrink-0 font-body text-lg leading-none text-archon-navy/35 transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-archon-navy/8 px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
        {children}
      </div>
    </details>
  );
}

export function ProductScientificAccordion({
  content,
  embedded = false,
}: ProductScientificAccordionProps) {
  return (
    <div
      className={
        embedded
          ? "divide-y divide-archon-navy/10"
          : "mt-10 overflow-hidden rounded-2xl border border-archon-black/10 bg-white/80 divide-y divide-archon-navy/10"
      }
    >
      <AccordionItem title="Product overview">
        <p className={bodyCopy}>{content.overview}</p>
      </AccordionItem>

      <AccordionItem title="Scientific profile">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/55">
          Classification
        </p>
        <p className="mt-2 font-display text-lg tracking-[-0.02em] text-archon-navy">
          {content.scientificProfile.classification}
        </p>
        <p className={`mt-4 ${bodyCopy}`}>
          {content.scientificProfile.description}
        </p>
      </AccordionItem>

      <AccordionItem title="Scientific applications">
        <ul className="grid gap-2 sm:grid-cols-2">
          {content.applications.map((application) => (
            <li
              key={application}
              className="rounded-xl border border-archon-navy/8 bg-[#fafafa] px-4 py-3"
            >
              <span className="font-body text-[11px] uppercase leading-snug tracking-[0.12em] text-archon-navy/75">
                {application}
              </span>
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="The Atara standard">
        <p className={bodyCopy}>
          Every batch undergoes independent third-party analytical testing to
          verify identity and purity prior to release. Batch-specific
          Certificates of Analysis (COAs) are available through the{" "}
          <Link
            href="/coa"
            className="text-archon-navy underline-offset-4 transition-colors hover:underline"
          >
            Quality &amp; Verification Library
          </Link>
          , providing researchers with transparent documentation and confidence
          in every purchase.
        </p>
      </AccordionItem>
    </div>
  );
}

export function ProductResearchNotice({ embedded = false }: { embedded?: boolean }) {
  return (
    <p
      className={
        embedded
          ? "font-body text-[11px] leading-relaxed text-archon-muted"
          : "mt-8 font-body text-xs leading-relaxed text-archon-muted"
      }
    >
      {RESEARCH_NOTICE_COPY}
    </p>
  );
}

type ProtocolCompatibilityStripProps = {
  content: ProductEditorialContent;
};

function ProtocolVialCard({ product }: { product: Product }) {
  const imageAlt = getProductImageAlt(product);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col items-center text-center"
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-square w-full max-w-[11rem] transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.05] sm:max-w-[15rem] md:max-w-[17rem] lg:max-w-[19rem]">
        <span
          className="pointer-events-none absolute inset-[2%] rounded-full bg-archon-navy/[0.14] blur-3xl transition-opacity duration-500 [@media(hover:hover)]:group-hover:bg-archon-navy/[0.22]"
          aria-hidden
        />
        <Image
          src={product.image}
          alt={imageAlt}
          fill
          className="relative z-[1] object-contain drop-shadow-[0_28px_64px_rgba(11,31,58,0.32)] transition-[filter] duration-500 [@media(hover:hover)]:group-hover:drop-shadow-[0_32px_72px_rgba(11,31,58,0.45)]"
          sizes="(max-width: 640px) 176px, 304px"
        />
      </div>
      <ProductName
        name={product.name}
        subtitle={product.subtitle}
        className="mt-5 md:mt-6"
        nameClassName="font-display text-base font-bold tracking-[-0.02em] text-archon-navy transition-[color,text-shadow] duration-300 [text-shadow:0_0_18px_rgba(11,31,58,0.22)] group-hover:text-archon-navy/80 group-hover:[text-shadow:0_0_24px_rgba(11,31,58,0.35)] md:text-lg"
        subtitleClassName="text-xs md:text-sm"
      />
    </Link>
  );
}

export function ProtocolCompatibilityStrip({
  content,
  embedded = false,
}: ProtocolCompatibilityStripProps & { embedded?: boolean }) {
  const relatedProducts = content.protocolSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  if (relatedProducts.length === 0) return null;

  return (
    <section
      className={
        embedded
          ? "overflow-x-clip"
          : "mt-16 overflow-x-clip border-t border-archon-navy/10 pt-14 md:mt-20 md:pt-16"
      }
    >
      <p className="text-center font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/55 [text-shadow:0_0_22px_rgba(11,31,58,0.28)]">
        Protocol compatibility
      </p>

      <ul className="mt-10 flex snap-x snap-mandatory justify-start gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-12 md:grid md:snap-none md:grid-cols-3 md:justify-items-center md:gap-10 md:overflow-visible md:px-0 md:pb-0 md:scroll-px-0 lg:gap-14 [&::-webkit-scrollbar]:hidden">
        {relatedProducts.map((product) => (
          <li
            key={product.slug}
            className="w-[11rem] shrink-0 snap-center sm:w-[15rem] md:w-auto md:max-w-[19rem]"
          >
            <ProtocolVialCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}