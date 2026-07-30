import { cn } from "@/lib/utils/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: "sm" | "md" | "lg" | "xl";
  as?: "section" | "div";
};

const spacingMap = {
  sm: "py-16 md:py-20",
  md: "py-24 md:py-32",
  lg: "py-32 md:py-40 lg:py-48",
  xl: "py-40 md:py-52 lg:py-64",
};

export function Section({
  as: Tag = "section",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(spacingMap[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}
