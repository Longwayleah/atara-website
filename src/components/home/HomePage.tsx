"use client";

import dynamic from "next/dynamic";
import { AtaraHero } from "@/components/home/AtaraHero";

const ProductCampaignSection = dynamic(
  () =>
    import("@/components/home/ProductCampaignSection").then(
      (m) => m.ProductCampaignSection,
    ),
  { ssr: false, loading: () => <div className="min-h-[50vh] bg-[#F5F1EB]" aria-hidden /> },
);
const PhilosophySection = dynamic(
  () =>
    import("@/components/home/PhilosophySection").then(
      (m) => m.PhilosophySection,
    ),
  { ssr: false, loading: () => <div className="min-h-[50vh] bg-archon-charcoal" aria-hidden /> },
);
const ProtocolReveal = dynamic(
  () =>
    import("@/components/home/ProtocolReveal").then((m) => m.ProtocolReveal),
  { ssr: false, loading: () => <div className="min-h-[40vh] bg-[#F5F1EB]" aria-hidden /> },
);
const EditorialMoment = dynamic(
  () =>
    import("@/components/home/EditorialMoment").then((m) => m.EditorialMoment),
  { ssr: false, loading: () => <div className="min-h-[40vh] bg-[#8B7B6A]" aria-hidden /> },
);
const AtaraStandard = dynamic(
  () => import("@/components/home/AtaraStandard").then((m) => m.AtaraStandard),
  { ssr: false, loading: () => <div className="min-h-[50vh] bg-[#3E3934]" aria-hidden /> },
);
const BrandStatementSection = dynamic(
  () =>
    import("@/components/home/BrandStatementSection").then(
      (m) => m.BrandStatementSection,
    ),
  { ssr: false, loading: () => <div className="min-h-[40vh] bg-[#F5F1EB]" aria-hidden /> },
);

/** Client home shell — hero first, defer heavy below-fold sections */
export function HomePage() {
  return (
    <>
      <AtaraHero />
      <ProductCampaignSection />
      <PhilosophySection />
      <ProtocolReveal />
      <EditorialMoment />
      <AtaraStandard />
      <BrandStatementSection />
    </>
  );
}
