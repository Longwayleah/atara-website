import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { CanvasWrapper } from "@/components/three/CanvasWrapper";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-archon-accent/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] bottom-[20%] h-[40vh] w-[40vh] rounded-full bg-archon-sand/20 blur-[100px]"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <FadeIn>
              <Typography variant="subheading" className="mb-6 text-archon-accent">
                Premium Peptide Wellness
              </Typography>
            </FadeIn>

            <RevealText
              as="h1"
              text="Elevate your vitality"
              className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.03em] text-archon-black"
            />

            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-archon-muted md:text-xl">
                {siteConfig.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Explore Collection
                </Button>
                <Button variant="outline" size="lg">
                  Our Science
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-b from-archon-cream to-archon-sand/30">
                <CanvasWrapper className="absolute inset-0" />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
