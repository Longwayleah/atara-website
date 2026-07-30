import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductEditorialContent } from "@/config/product-content";

type ProductSpecSheetProps = {
  content: ProductEditorialContent;
  embedded?: boolean;
  column?: boolean;
};

const bodyCopy =
  "font-body text-sm leading-[1.75] text-archon-black/70 md:text-[15px]";

type SpecSectionProps = {
  index: string;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

function SpecSection({ index, title, defaultOpen, children }: SpecSectionProps) {
  return (
    <details className="product-spec-sheet__section group" open={defaultOpen}>
      <summary className="product-spec-sheet__summary">
        <span className="product-spec-sheet__index">{index}</span>
        <span className="product-spec-sheet__title">{title}</span>
        <span className="product-spec-sheet__chevron" aria-hidden>
          →
        </span>
      </summary>
      <div className="product-spec-sheet__body">{children}</div>
    </details>
  );
}

export function ProductSpecSheet({
  content,
  embedded = false,
  column = false,
}: ProductSpecSheetProps) {
  const rootClass = column
    ? "product-spec-sheet product-spec-sheet--column"
    : embedded
      ? "product-spec-sheet product-spec-sheet--embedded"
      : "product-spec-sheet";

  return (
    <div className={rootClass}>
      {column ? null : (
        <p className="mb-4 font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          Specification
        </p>
      )}

      <SpecSection index="01" title="Product overview" defaultOpen>
        <p className={bodyCopy}>{content.overview}</p>
      </SpecSection>

      <SpecSection index="02" title="Scientific profile">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/55">
          Classification
        </p>
        <p className="mt-2 font-display text-lg tracking-[-0.02em] text-archon-navy">
          {content.scientificProfile.classification}
        </p>
        <p className={`mt-4 ${bodyCopy}`}>
          {content.scientificProfile.description}
        </p>
      </SpecSection>

      <SpecSection index="03" title="Scientific applications">
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
      </SpecSection>

      <SpecSection index="04" title="The Atara standard">
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
      </SpecSection>
    </div>
  );
}
