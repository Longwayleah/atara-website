import { homepageCopy } from "@/config/homepage";

export function BrandStrip() {
  return (
    <section className="border-y border-black/8 bg-white py-12 md:py-14">
      <p className="mx-auto max-w-4xl px-6 text-center font-display text-lg font-extrabold uppercase leading-snug tracking-[-0.02em] text-archon-black md:text-2xl">
        {homepageCopy.brandStrip}
      </p>
    </section>
  );
}
