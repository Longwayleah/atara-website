import type { Product } from "@/config/products";
import { seo, getSiteUrl } from "@/config/seo";
import { getProductImageAlt } from "@/lib/seo/product";
import { getProductLabel } from "@/components/ui/ProductName";
import { getStartingPrice } from "@/config/products";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seo.legalName,
    url: seo.url,
    logo: getSiteUrl("/icon"),
    description: seo.description,
    sameAs: seo.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.siteName,
    url: seo.url,
    description: seo.description,
    publisher: {
      "@type": "Organization",
      name: seo.legalName,
      logo: {
        "@type": "ImageObject",
        url: getSiteUrl("/icon"),
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl("/shop")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product) {
  const price = getStartingPrice(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getProductLabel(product),
    description: product.descriptor,
    image: getSiteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: seo.siteName,
    },
    sku: product.id,
    url: getSiteUrl(`/shop/${product.slug}`),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: getSiteUrl(`/shop/${product.slug}`),
            priceCurrency: "USD",
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: seo.legalName,
            },
          },
        }
      : {}),
  };
}

export function siteJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

export function productPageJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      productJsonLd(product),
      {
        "@type": "WebPage",
        name: getProductLabel(product),
        description: product.descriptor,
        url: getSiteUrl(`/shop/${product.slug}`),
        isPartOf: { "@type": "WebSite", url: seo.url, name: seo.siteName },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: getSiteUrl(product.image),
          caption: getProductImageAlt(product),
        },
      },
    ],
  };
}
