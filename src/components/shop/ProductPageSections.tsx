import type { ProductEditorialContent } from "@/config/product-content";
import { ProductSpecSheetHorizontal } from "@/components/shop/ProductSpecSheetHorizontal";
import { ProtocolCompatibilityStrip } from "@/components/shop/ProductEditorial";

type ProductPageSectionsProps = {
  content: ProductEditorialContent;
};

/** Stacked sections below the hero: specification tabs → protocol */
export function ProductPageSections({ content }: ProductPageSectionsProps) {
  return (
    <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
      <section>
        <div className="mx-auto max-w-3xl">
          <ProductSpecSheetHorizontal content={content} />
        </div>
      </section>

      <ProtocolCompatibilityStrip content={content} embedded />
    </div>
  );
}
