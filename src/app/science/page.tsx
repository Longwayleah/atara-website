import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Science | Peptide Research",
  description:
    "The science behind Atara research compounds — formulation integrity, purity standards, and compound education.",
  path: "/science",
});

export default function SciencePage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          Science
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
          Precision at the molecular level
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
          Atara formulations are built on rigorous peptide science — purity,
          stability, and dosing precision designed for intentional wellness
          routines. Full science content is coming soon.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </Container>
    </div>
  );
}
