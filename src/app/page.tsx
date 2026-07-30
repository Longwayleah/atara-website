import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import dynamic from "next/dynamic";
import { AtaraHero } from "@/components/home/AtaraHero";

/** Below-fold sections: client-only so initial HTML/JS stays light */
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

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
});

export default function Home() {
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
