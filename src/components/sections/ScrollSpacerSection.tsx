import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ScrollSpacerSection() {
  return (
    <Section spacing="xl" className="relative bg-archon-black text-archon-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-archon-accent">
            Now you&apos;re scrolling
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.02em]">
            The hero parallax is doing its work
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-archon-cream/70">
            Scroll back up to see the background image drift at a different
            speed than the headline. The layers separate — that&apos;s the
            parallax effect in action.
          </p>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Background layer",
              body: "Moves slowest. Scales and shifts vertically as you scroll past the hero.",
            },
            {
              title: "Text layer",
              body: "Moves faster and fades out — creating dramatic separation from the image.",
            },
            {
              title: "Overlay layer",
              body: "Darkens on scroll so the contrast shift is visible as content passes.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <h3 className="font-display text-2xl tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-archon-cream/60">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Extra vertical space for continued scrolling */}
        <div className="mt-32 h-[40vh] rounded-sm bg-gradient-to-b from-archon-charcoal to-archon-black" />
      </Container>
    </Section>
  );
}
