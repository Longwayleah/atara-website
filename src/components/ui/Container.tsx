import { cn } from "@/lib/utils/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "main";
  size?: "default" | "narrow" | "wide" | "full";
};

const sizes = {
  default: "max-w-[1400px]",
  narrow: "max-w-[960px]",
  wide: "max-w-[1600px]",
  full: "max-w-none",
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
