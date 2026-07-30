import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { faqItems } from "@/config/faq";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "FAQ | Research Peptide Questions",
  description: `Frequently asked questions about ${seo.siteName} research peptides, COAs, orders, and compliance.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <header className="max-w-2xl border-b border-archon-navy/10 pb-10 md:pb-12">
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
            Support
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
            FAQ
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
            Answers on verification, storage, shipping, and how Atara protocols
            are built.
          </p>
        </header>

        <div className="mt-12 divide-y divide-archon-navy/10">
          {faqItems.map((item) => (
            <details key={item.id} className="group py-6">
              <summary className="cursor-pointer list-none font-display text-lg tracking-[-0.02em] text-archon-navy md:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-6">
                  {item.question}
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-body text-sm text-archon-navy/40 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-archon-muted md:text-[15px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
