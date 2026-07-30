import { cn } from "@/lib/utils/cn";

type ProductNameProps = {
  name: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  nameClassName?: string;
  subtitleClassName?: string;
};

export function ProductName({
  name,
  subtitle,
  as: Tag = "h3",
  className,
  nameClassName,
  subtitleClassName,
}: ProductNameProps) {
  return (
    <div className={className}>
      <Tag className={nameClassName}>{name}</Tag>
      {subtitle ? (
        <p
          className={cn(
            "mt-1.5 font-body text-sm font-normal tracking-[0.02em] text-archon-muted md:text-[13px]",
            subtitleClassName,
          )}
        >
          ({subtitle})
        </p>
      ) : null}
    </div>
  );
}

export function getProductLabel(product: { name: string; subtitle?: string }) {
  return product.subtitle ? `${product.name} (${product.subtitle})` : product.name;
}
