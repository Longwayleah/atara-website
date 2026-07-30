import { createPageMetadata } from "@/lib/seo/metadata";
import { products } from "@/config/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { getShopFilterDescriptor, getShopFilterTitle } from "@/lib/shop/filter";

export const metadata = createPageMetadata({
  title: "Our Protocols",
  description:
    "Explore Atara protocols — Radiance, Recovery, and Renew — curated for cellular wellness and intentional beauty.",
  path: "/shop",
  keywords: [
    "Atara protocols",
    "Radiance Protocol",
    "Recovery Protocol",
    "Renew Protocol",
    "GHK-Cu",
    "BPC-157",
    "TB-500",
    "NAD+",
  ],
});

export default function ShopPage() {
  const title = getShopFilterTitle("all");
  const descriptor = getShopFilterDescriptor("all");

  return (
    <div className="bg-archon-cream pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="wide">
        <header className="shop-collection-header">
          <div className="shop-collection-header__intro">
            <div className="min-w-0">
              <h1 className="shop-collection-header__title font-display text-[clamp(2.25rem,5vw,3.25rem)] font-medium tracking-[-0.03em] text-archon-charcoal">
                {title}
              </h1>
            </div>
            <p className="shop-collection-header__descriptor font-body text-base leading-relaxed text-archon-muted md:max-w-md md:text-right lg:max-w-lg">
              {descriptor}
            </p>
          </div>
        </header>

        <div className="shop-product-grid shop-product-grid--desktop-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
              className="shop-product-card--mobile-grid"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
