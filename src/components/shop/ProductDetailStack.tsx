import type { Product } from "@/config/products";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { ProductResearchNotice } from "@/components/shop/ProductEditorial";

type ProductDetailStackProps = {
  product: Product;
};

export function ProductDetailStack({ product }: ProductDetailStackProps) {
  return (
    <div className="mt-10">
      <div className="overflow-hidden rounded-2xl border border-archon-black/10 bg-white/85 shadow-[0_12px_40px_rgba(11,31,58,0.06)]">
        <ProductPurchasePanel product={product} embedded />
      </div>

      <ProductResearchNotice />
    </div>
  );
}
