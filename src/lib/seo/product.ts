import type { Product } from "@/config/products";
import { getProductDosageLabel } from "@/config/products";
import { getProductLabel } from "@/components/ui/ProductName";
import { seo } from "@/config/seo";

/** Descriptive alt text for product imagery — SEO and accessibility */
export function getProductImageAlt(product: Product) {
  const label = getProductLabel(product);
  const dosage = getProductDosageLabel(product);

  if (dosage) {
    return `${label} (${dosage}) research peptide vial — ${seo.siteName}`;
  }

  return `${label} research peptide vial — ${seo.siteName}`;
}
