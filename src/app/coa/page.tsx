import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { formatCoaPurity, getCoaByProductId, isCoaExempt } from "@/config/coa";
import { getProductDosageLabel, products } from "@/config/products";
import { Container } from "@/components/ui/Container";
import { ProductName } from "@/components/ui/ProductName";

export const metadata = createPageMetadata({
  title: "COA Library | Certificate of Analysis",
  description: `Certificate of analysis library — batch verification and purity documentation for ${seo.siteName} research compounds.`,
  path: "/coa",
  keywords: ["COA", "certificate of analysis", "peptide purity", "batch verification"],
});

export default function CoaLibraryPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="wide">
        <header className="max-w-2xl border-b border-archon-navy/10 pb-10 md:pb-12">
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
            Verification vault
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
            COA Library
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
            Independent certificates of analysis for each Atara peptide —
            third-party verification of purity, composition, and lab standards.
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-archon-muted">
            From time to time, the strength noted on a certificate may differ
            from our current formulation. The compound at its core — and the
            standard it represents — remains unchanged.
          </p>
        </header>

        <div className="mt-12 overflow-hidden rounded-2xl border border-archon-navy/10">
          <div className="hidden gap-4 border-b border-archon-navy/10 bg-archon-cream/60 px-6 py-4 font-body text-[10px] uppercase tracking-[0.2em] text-archon-navy/50 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_auto]">
            <span>Compound</span>
            <span>Strength</span>
            <span>Lab batch</span>
            <span>Purity</span>
            <span className="text-right">Report</span>
          </div>

          <ul>
            {products
              .filter((product) => !isCoaExempt(product.id))
              .map((product) => {
              const coa = getCoaByProductId(product.id);
              const isPdf = coa?.file.endsWith(".pdf");

              return (
                <li
                  key={product.id}
                  className="flex flex-col gap-3 border-b border-archon-navy/8 px-5 py-5 last:border-b-0 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_auto] md:items-center md:gap-4 md:px-6"
                >
                  <div>
                    <ProductName
                      name={product.name}
                      subtitle={product.subtitle}
                      as="h2"
                      nameClassName="font-display text-base tracking-[-0.02em] text-archon-navy md:text-lg"
                      subtitleClassName="text-xs md:text-[13px]"
                    />
                  </div>
                  <p className="font-body text-sm text-archon-muted">
                    <span className="mr-2 font-body text-[10px] uppercase tracking-[0.18em] text-archon-navy/40 md:hidden">
                      Strength
                    </span>
                    {getProductDosageLabel(product) || "—"}
                  </p>
                  <p className="font-body text-sm text-archon-navy/70">
                    <span className="mr-2 font-body text-[10px] uppercase tracking-[0.18em] text-archon-navy/40 md:hidden">
                      Lab batch
                    </span>
                    {coa?.batchId ?? "—"}
                  </p>
                  <p className="font-body text-sm text-archon-navy/70">
                    <span className="mr-2 font-body text-[10px] uppercase tracking-[0.18em] text-archon-navy/40 md:hidden">
                      Purity
                    </span>
                    {coa ? formatCoaPurity(coa.purity) : "—"}
                  </p>
                  {coa ? (
                    <a
                      href={coa.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline md:justify-self-end"
                    >
                      {isPdf ? "View PDF" : "View report"}
                    </a>
                  ) : (
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-body text-[10px] uppercase tracking-[0.18em] text-archon-muted md:justify-self-end"
                    >
                      Coming soon
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 max-w-2xl font-body text-sm leading-relaxed text-archon-muted">
          Reports open in a new tab. These certificates are kept here as a
          reference — a transparent record of testing for each protocol. If
          anything is unclear, we&apos;re here at{" "}
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="text-archon-navy underline-offset-4 hover:underline"
          >
            {siteConfig.links.email}
          </a>
          .
        </p>
      </Container>
    </div>
  );
}
