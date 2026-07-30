import { cn } from "@/lib/utils/cn";

type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label";
  variant?: "display-xl" | "display-lg" | "display-md" | "heading" | "subheading" | "body-lg" | "body" | "caption" | "label";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  "display-xl":
    "font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] tracking-[-0.03em]",
  "display-lg":
    "font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1] tracking-[-0.025em]",
  "display-md":
    "font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]",
  heading:
    "font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.015em]",
  subheading:
    "font-body text-sm md:text-base font-medium uppercase tracking-[0.2em] text-archon-muted",
  "body-lg": "font-body text-lg md:text-xl leading-relaxed text-archon-muted",
  body: "font-body text-base leading-relaxed text-archon-muted",
  caption: "font-body text-xs uppercase tracking-[0.15em] text-archon-muted",
  label: "font-body text-sm font-medium tracking-wide",
};

export function Typography({
  as: Tag = "p",
  variant = "body",
  className,
  children,
}: TypographyProps) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
