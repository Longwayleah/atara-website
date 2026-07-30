import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { HomePage } from "@/components/home/HomePage";

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
