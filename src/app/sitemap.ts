import type { MetadataRoute } from "next";
import { products } from "@/config/products";
import { getSiteUrl } from "@/config/seo";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/coa", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/science", changeFrequency: "monthly", priority: 0.7 },
  { path: "/standards", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journal", changeFrequency: "weekly", priority: 0.6 },
  { path: "/network", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: getSiteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const productPages = products.map((product) => ({
    url: getSiteUrl(`/shop/${product.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...pages, ...productPages];
}
