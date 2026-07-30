import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const SLIDE_VIALS = {
  formulation: { src: "/products/ascend.png", alt: "Atara Ascend peptide vial" },
  recovery: { src: "/products/recover.png", alt: "Atara Recover peptide vial" },
  clarity: { src: "/products/focus.png", alt: "Atara Focus peptide vial" },
} as const;

type SlideTheme = keyof typeof SLIDE_VIALS;

type FeatureSlideVisualProps = {
  theme: SlideTheme;
  index: number;
  className?: string;
};

export function FeatureSlideVisual({ theme, index, className }: FeatureSlideVisualProps) {
  const vial = SLIDE_VIALS[theme];
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "feature-slide-visual relative h-full min-h-[320px] overflow-hidden md:min-h-0",
        className,
      )}
    >
      <div className="feature-marble-surface absolute inset-0" aria-hidden />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_42%,rgba(255,255,255,0.72)_0%,transparent_62%)]"
      />

      <div className="relative flex h-full items-center justify-center px-10 py-16 md:px-14 lg:px-16">
        <div className="feature-vial-stage relative w-[min(46vw,280px)]">
          <div
            aria-hidden
            className="feature-vial-shadow absolute inset-x-[14%] bottom-[2%] h-[6%] rounded-full"
          />

          <div className="relative aspect-[3/5] w-full">
            <Image
              src={vial.src}
              alt={vial.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 46vw, 280px"
              priority={index === 0}
            />
          </div>
        </div>
      </div>

      <span
        className="feature-index-outline pointer-events-none absolute bottom-10 right-10 font-display text-[clamp(3rem,8vw,5rem)] font-extrabold leading-none tracking-[-0.05em] md:bottom-12 md:right-12"
        aria-hidden
      >
        {indexLabel}
      </span>
    </div>
  );
}
