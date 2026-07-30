import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/config/products";
import {
  getProductCatalogIndex,
  getProductDosageLabel,
  getStartingPrice,
  isProductPurchasable,
} from "@/config/products";
import { getProductImageAlt } from "@/lib/seo/product";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatPrice, formatPriceFrom } from "@/lib/commerce/format";
import { cn } from "@/lib/utils/cn";

type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
  "data-collection"?: boolean;
};

function getProtocolEyebrow(name: string) {
  return name.trim().toUpperCase();
}

/** Short display title — "Recovery Protocol" → "Recovery" */
function getProtocolShortName(name: string) {
  return name.replace(/\s+Protocol$/i, "").trim();
}

function getSpecLine(product: Product, dosageLabel: string) {
  const parts = [product.subtitle, dosageLabel ? dosageLabel.toUpperCase() : null].filter(
    Boolean,
  );
  return parts.join(" • ");
}

export function ProductCard({
  product,
  className,
  priority = false,
  ...rest
}: ProductCardProps) {
  const purchasable = isProductPurchasable(product);
  const startingPrice = getStartingPrice(product);
  const dosageLabel = getProductDosageLabel(product);
  const imageAlt = getProductImageAlt(product);
  const catalogIndex = getProductCatalogIndex(product.slug);
  const indexLabel =
    catalogIndex != null ? String(catalogIndex).padStart(2, "0") : null;
  const shortName = getProtocolShortName(product.name);
  const eyebrow = getProtocolEyebrow(product.name);
  const specLine = getSpecLine(product, dosageLabel);
  const imageScale = product.imageFit?.scale ?? 1;
  const imagePosition = product.imageFit?.position ?? "50% 50%";

  return (
    <article className={cn("product-editorial-card group", className)} {...rest}>
      <Link
        href={`/shop/${product.slug}`}
        className="product-editorial-card__media"
        style={
          {
            "--card-photo-scale": String(imageScale),
            "--card-photo-position": imagePosition,
          } as CSSProperties
        }
      >
        {indexLabel ? (
          <span className="product-editorial-card__index" aria-hidden>
            {indexLabel}
          </span>
        ) : null}
        <Image
          src={product.image}
          alt={imageAlt}
          fill
          className="product-editorial-card__photo"
          sizes="(max-width: 639px) 50vw, (max-width: 1024px) 45vw, 360px"
          priority={priority}
        />
      </Link>

      <div className="product-editorial-card__body">
        <Link href={`/shop/${product.slug}`} className="product-editorial-card__copy">
          <p className="product-editorial-card__eyebrow">{eyebrow}</p>
          <h2 className="product-editorial-card__title">{shortName}</h2>
          {specLine ? (
            <p className="product-editorial-card__specs">{specLine}</p>
          ) : null}
          <p className="product-editorial-card__descriptor">{product.descriptor}</p>
        </Link>

        <div className="product-editorial-card__actions">
          <p className="product-editorial-card__price">
            {startingPrice
              ? product.variants.length > 1
                ? formatPriceFrom(startingPrice)
                : formatPrice(startingPrice)
              : "Coming soon"}
          </p>

          {purchasable ? (
            <AddToCartButton
              product={product}
              size="sm"
              variant="ghost"
              className="product-editorial-card__add"
              label={
                <>
                  <span className="product-editorial-card__add-full">Add to bag +</span>
                  <span className="product-editorial-card__add-short">Add +</span>
                </>
              }
              showAddedState={false}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
