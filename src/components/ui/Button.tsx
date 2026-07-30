import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

const variants = {
  primary:
    "bg-archon-black text-archon-white hover:bg-archon-charcoal border border-transparent",
  secondary:
    "bg-archon-accent text-archon-black hover:bg-archon-glow border border-transparent",
  ghost:
    "bg-transparent text-archon-black hover:bg-archon-cream/50 border border-transparent",
  outline:
    "bg-transparent text-archon-black border border-archon-black/20 hover:border-archon-black/40",
};

const sizes = {
  sm: "h-10 px-5 text-xs tracking-[0.12em] uppercase",
  md: "h-12 px-7 text-sm tracking-[0.1em] uppercase",
  lg: "h-14 px-9 text-sm tracking-[0.1em] uppercase",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-body font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-archon-accent/50 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
