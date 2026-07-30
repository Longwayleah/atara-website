import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import {
  AtaraHero,
  PhilosophySection,
  ProductCampaignSection,
  ProtocolReveal,
  EditorialMoment,
  AtaraStandard,
  BrandStatementSection,
} from "@/components/home";

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
