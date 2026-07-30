import type { Metadata } from "next";
import { seo, getSiteUrl } from "@/config/seo";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
};

export function createPageMetadata({
  title,
  description = seo.description,
  path = "/",
  keywords,
  noIndex = false,
  ogImage,
  ogType = "website",
}: PageMetadataOptions = {}): Metadata {
  const canonical = getSiteUrl(path);
  const resolvedTitle = title ?? seo.title;
  const imageUrl = ogImage ? getSiteUrl(ogImage) : getSiteUrl("/opengraph-image");

  return {
    title: resolvedTitle,
    description,
    keywords: keywords ?? [...seo.keywords],
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType === "product" ? "website" : ogType,
      locale: seo.locale,
      url: canonical,
      siteName: seo.siteName,
      title: resolvedTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${seo.siteName} — ${seo.tagline}`,
        },
      ],
    },
    twitter: {
      card: seo.twitter.card,
      site: seo.twitter.site,
      creator: seo.twitter.creator,
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}

/** Root layout defaults — template handles nested page titles */
export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(seo.url),
    title: {
      default: seo.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: seo.siteName,
    authors: [{ name: seo.siteName, url: seo.url }],
    creator: seo.siteName,
    publisher: seo.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: getSiteUrl("/"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: getSiteUrl("/"),
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: getSiteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${seo.siteName} — premium research peptides`,
        },
      ],
    },
    twitter: {
      card: seo.twitter.card,
      site: seo.twitter.site,
      creator: seo.twitter.creator,
      title: seo.title,
      description: seo.description,
      images: [getSiteUrl("/opengraph-image")],
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
  };
}
