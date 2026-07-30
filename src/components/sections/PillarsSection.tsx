import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FadeIn } from "@/components/motion/FadeIn";

const pillars = [
  {
    number: "01",
    title: "Vitality",
    description:
      "Science-backed peptides designed to support energy, recovery, and daily performance.",
  },
  {
    number: "02",
    title: "Confidence",
    description:
      "Elevated wellness that radiates from within — refined, intentional, unmistakable.",
  },
  {
    number: "03",
    title: "Aesthetics",
    description:
      "Modern formulations for skin, body, and presence — the intersection of beauty and biology.",
  },
];

export function PillarsSection() {
  return (
    <Section spacing="lg" className="bg-archon-white">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <FadeIn>
              <Typography variant="subheading" className="mb-4">
                The Philosophy
              </Typography>
              <Typography
                as="h2"
                variant="display-md"
                className="text-archon-black"
              >
                Modern wellness, refined
              </Typography>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-archon-black/8">
              {pillars.map((pillar) => (
                <ScrollReveal key={pillar.number}>
                  <article className="grid gap-6 py-12 md:grid-cols-12 md:gap-8">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-archon-accent md:col-span-2">
                      {pillar.number}
                    </span>
                    <div className="md:col-span-10">
                      <h3 className="font-display text-3xl tracking-[-0.02em] text-archon-black md:text-4xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-archon-muted">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
