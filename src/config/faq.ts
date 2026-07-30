import { siteConfig } from "@/config/site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "what-is-atara",
    question: "What is Atara?",
    answer:
      "Atara is a cellular wellness brand rooted in intentional beauty — transparent labeling, batch verification, and peptide protocols designed with precision and care.",
  },
  {
    id: "coa",
    question: "Where can I find certificates of analysis?",
    answer:
      "Each Atara peptide is supported by a certificate of analysis in our library, documenting independent third-party testing. When a listed strength differs from our current offering, the report still reflects the same compound foundation and quality standard we uphold.",
  },
  {
    id: "storage",
    question: "How should I store my vials?",
    answer:
      "Store lyophilized peptides in a cool, dry place away from light. After reconstitution, refrigerate and use within the recommended window.",
  },
  {
    id: "research",
    question: "Are these products for human consumption?",
    answer:
      "Atara products are sold for research and laboratory use only.",
  },
  {
    id: "shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes — we ship internationally. Shipping options, timelines, and any regional requirements are confirmed at checkout.",
  },
  {
    id: "support",
    question: "Who can I contact for order or COA questions?",
    answer:
      `Email us at ${siteConfig.links.email}. Include your order number for the fastest response.`,
  },
];
