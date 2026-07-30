import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Network | Partners & Collaborators",
  description: `Partners, affiliates, and collaborators in the ${seo.siteName} network.`,
  path: "/network",
});

export default function NetworkPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          Partners & collaborators
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
          Network
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
          Clinicians, affiliates, and aligned partners building the Atara
          ecosystem — access, education, and distribution.
        </p>
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
        >
          Connect on Instagram
        </a>
      </Container>
    </div>
  );
}
