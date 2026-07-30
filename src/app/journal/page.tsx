import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Journal",
  description:
    "Stories on research, performance, and the Atara lifestyle — education and insights for the modern protocol.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          Journal
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
          Notes on modern wellness
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
          Editorial stories on recovery, performance, and the routines behind
          elevated living. The journal is launching soon.
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
