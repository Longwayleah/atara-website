import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Standards | Quality & Testing",
  description: `Quality rules, testing standards, and purity verification for ${seo.siteName} research peptides.`,
  path: "/standards",
});

export default function StandardsPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          Authority layer
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
          Standards
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
          The rules, testing protocols, and quality systems behind every Atara
          batch — how we formulate, verify, and hold the line.
        </p>
        <Link
          href="/coa"
          className="mt-10 inline-block font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
        >
          View COA library
        </Link>
      </Container>
    </div>
  );
}
