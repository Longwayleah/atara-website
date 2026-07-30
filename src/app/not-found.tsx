import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-white pt-28 pb-24 md:pt-32">
      <Container size="narrow" className="text-center">
        <p className="font-display text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none tracking-[-0.04em] text-archon-navy/10">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-[-0.02em] text-archon-navy">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-archon-muted">
          That route doesn&apos;t exist yet. Head back to the homepage or browse
          the collection.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
          >
            Shop
          </Link>
        </div>
      </Container>
    </div>
  );
}
