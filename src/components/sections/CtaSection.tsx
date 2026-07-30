import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { RevealText } from "@/components/motion/RevealText";

export function CtaSection() {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-archon-black text-archon-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,149,108,0.15)_0%,_transparent_70%)]"
      />

      <Container className="relative text-center">
        <ScrollReveal>
          <RevealText
            as="h2"
            text="Begin your elevation"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.025em]"
          />
        </ScrollReveal>

        <ScrollReveal y={30}>
          <p className="mx-auto mt-8 max-w-md font-body text-lg text-archon-cream/70">
            Discover the collection crafted for those who demand more from their wellness ritual.
          </p>
        </ScrollReveal>

        <ScrollReveal y={20}>
          <div className="mt-12">
            <Button variant="secondary" size="lg">
              Shop the Collection
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
