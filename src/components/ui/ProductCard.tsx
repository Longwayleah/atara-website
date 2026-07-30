import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/config/products";
import {
  getProductDosageLabel,
  getStartingPrice,
  isProductPurchasable,
} from "@/config/products";
import { getProductImageAlt } from "@/lib/seo/product";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { formatPrice, formatPriceFrom } from "@/lib/commerce/format";
import { cn } from "@/lib/utils/cn";

type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
  "data-collection"?: boolean;
};

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

  return (
    <article
      className={cn("product-glass-card group", className)}
      {...rest}
    >
      <span className="product-glass-card__sheen" aria-hidden />

      <div className="product-glass-card__body relative z-[1]">
        <Link
          href={`/shop/${product.slug}`}
          className="block"
        >
          <div className="product-glass-card__stage mx-auto aspect-square w-full max-w-[220px]">
            <span className="product-glass-card__stage-depth" aria-hidden />
            <span className="product-glass-card__stage-glow" aria-hidden />

            <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <Image
                src={product.image}
                alt={imageAlt}
                fill
                className="relative z-[1] object-contain drop-shadow-[0_20px_40px_rgba(11,31,58,0.22)]"
                sizes="(max-width: 639px) 44vw, (max-width: 1024px) 50vw, 220px"
                priority={priority}
              />
            </div>
          </div>

          <div className="product-glass-card__footer mt-6 pt-6">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <ProductName
                name={product.name}
                subtitle={product.subtitle}
                as="h2"
                className="min-w-0 flex-1"
                nameClassName="font-display text-base tracking-[-0.02em] text-archon-navy break-words sm:text-lg md:text-xl"
                subtitleClassName="text-[11px] md:text-[13px]"
              />
              {dosageLabel ? (
                <span className="product-glass-card__badge shrink-0 rounded-full px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.16em]">
                  {dosageLabel}
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-archon-navy/65">
              {product.descriptor}
            </p>
          </div>
        </Link>

        <div className="product-glass-card__actions mt-5 flex items-center justify-between gap-2 border-t border-archon-black/8 pt-5">
          <p className="product-glass-card__price min-w-0 font-body text-sm font-semibold tabular-nums tracking-normal text-archon-navy md:text-base">
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
              variant="outline"
              className="product-glass-card__add shrink-0 rounded-full border-archon-navy/20 text-archon-navy hover:border-archon-navy/40"
              label="Add"
              showAddedState={false}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
