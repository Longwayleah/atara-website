/** Extended editorial copy for product detail pages — keyed by product slug */
export interface ProductEditorialContent {
  /** First overview paragraph */
  lead: string;
  /** Second overview paragraph */
  overview: string;
  scientificProfile: {
    classification: string;
    description: string;
  };
  applications: string[];
  /** Intro copy for the protocol compatibility vial row */
  protocolIntro: string;
  /** Related product slugs for protocol compatibility links */
  protocolSlugs: string[];
}

export const ATARA_STANDARD_COPY =
  "Every batch undergoes independent third-party analytical testing to verify identity and purity prior to release. Batch-specific Certificates of Analysis (COAs) are available through the Quality & Verification Library, providing researchers with transparent documentation and confidence in every purchase.";

export const RESEARCH_NOTICE_COPY =
  "For laboratory research use only. Not intended for human or veterinary use. This product is not intended to diagnose, treat, cure, or prevent any disease.";

export const productContentBySlug: Record<string, ProductEditorialContent> = {
  tirzepatide: {
    lead:
      "Accelerate (Tirzepatide) is a dual GIP and GLP-1 receptor agonist studied for its role in metabolic signaling. The dual-receptor activity of Accelerate (Tirzepatide) gives researchers a distinctive model for investigating energy regulation, glucose metabolism, and body composition.",
    overview:
      "As one of the most extensively studied compounds in its class, Accelerate (Tirzepatide) continues to advance scientific understanding of interconnected metabolic pathways and endocrine signaling.",
    scientificProfile: {
      classification: "Dual GIP & GLP-1 Receptor Agonist",
      description:
        "Accelerate (Tirzepatide) is a dual GIP and GLP-1 receptor agonist designed to activate complementary incretin pathways. The mechanism of Accelerate (Tirzepatide) provides researchers with a model for investigating metabolic signaling, energy homeostasis, and endocrine communication.",
    },
    applications: [
      "Metabolic signaling",
      "Dual incretin receptor activation",
      "Energy homeostasis",
      "Glucose metabolism",
      "Appetite signaling",
      "Body composition research",
    ],
    protocolSlugs: ["lemon-x", "mots-c", "nad-plus"],
    protocolIntro:
      "Accelerate (Tirzepatide) is commonly incorporated into metabolic research protocols alongside Sculpt (Lemon X), Ascend (MOTS-c), and Revive (NAD+).",
  },
  retatrutide: {
    lead:
      "Apex (Retatrutide) is a triple receptor agonist investigated for its unique three-pathway mechanism. By activating GIP, GLP-1, and glucagon receptors simultaneously, Apex (Retatrutide) expands the scope of metabolic research beyond traditional incretin-based compounds.",
    overview:
      "The receptor profile of Apex (Retatrutide) has established it as a leading model for investigating complex metabolic regulation and energy homeostasis.",
    scientificProfile: {
      classification: "Triple GIP, GLP-1 & Glucagon Receptor Agonist",
      description:
        "Apex (Retatrutide) is a triple receptor agonist studied for simultaneous activation of GIP, GLP-1, and glucagon receptors. The mechanism of Apex (Retatrutide) enables investigation of interconnected metabolic pathways within a single research model.",
    },
    applications: [
      "Triple receptor signaling",
      "Metabolic regulation",
      "Energy homeostasis",
      "Glucose metabolism",
      "Energy expenditure",
      "Body composition research",
    ],
    protocolSlugs: ["lemon-x", "mots-c", "nad-plus"],
    protocolIntro:
      "Apex (Retatrutide) is commonly incorporated into metabolic research protocols alongside Sculpt (Lemon X), Ascend (MOTS-c), and Revive (NAD+).",
  },
  glow: {
    lead:
      "Radiance Protocol (GHK-Cu) is curated to support investigation of skin vitality, radiance, and cellular signaling pathways associated with healthy-looking appearance.",
    overview:
      "Radiance Protocol offers a focused approach to cellular support for skin-related wellness goals within the Atara system.",
    scientificProfile: {
      classification: "Cellular Skin Support Peptide",
      description:
        "GHK-Cu is a copper peptide studied for its role in cellular signaling related to skin biology and tissue pathways.",
    },
    applications: [
      "Skin vitality research",
      "Cellular signaling",
      "Extracellular matrix research",
      "Appearance-focused wellness",
    ],
    protocolSlugs: ["bpc-tb500", "nad-plus"],
    protocolIntro:
      "Radiance Protocol is commonly paired with Recovery Protocol and Renew Protocol as part of Atara’s intentional system.",
  },
  "bpc-tb500": {
    lead:
      "Recovery Protocol (TB-500 + BPC-157) is curated to support investigation of recovery, repair, and physical resilience pathways.",
    overview:
      "Recovery Protocol offers a focused model for studying structural and regenerative support within the Atara system.",
    scientificProfile: {
      classification: "Recovery Research Blend",
      description:
        "TB-500 and BPC-157 are regenerative peptides studied for connective tissue biology, repair pathways, and cellular signaling.",
    },
    applications: [
      "Recovery support",
      "Tissue remodeling research",
      "Connective tissue biology",
      "Physical performance pathways",
    ],
    protocolSlugs: ["glow", "nad-plus"],
    protocolIntro:
      "Recovery Protocol is commonly paired with Radiance Protocol and Renew Protocol as part of Atara’s intentional system.",
  },
  "lemon-x": {
    lead:
      "Sculpt (Lemon X) combines riboflavin, lecithin, and bromelain into a metabolic research blend designed to investigate complementary pathways involved in energy regulation and body composition. Each ingredient in Sculpt (Lemon X) has been studied for its role in cellular metabolism, lipid biology, and enzymatic activity.",
    overview:
      "Sculpt (Lemon X) provides researchers with a streamlined model for investigating metabolic function and physiological adaptation.",
    scientificProfile: {
      classification: "Metabolic Research Blend",
      description:
        "Sculpt (Lemon X) is a metabolic research blend combining riboflavin, lecithin, and bromelain. Sculpt (Lemon X) supports investigations into cellular metabolism, lipid biology, and metabolic regulation.",
    },
    applications: [
      "Cellular metabolism",
      "Lipid biology",
      "Enzymatic activity",
      "Energy production",
      "Metabolic regulation",
      "Body composition research",
    ],
    protocolSlugs: ["tirzepatide", "retatrutide", "mots-c"],
    protocolIntro:
      "Sculpt (Lemon X) is commonly incorporated into metabolic research protocols alongside Accelerate (Tirzepatide), Apex (Retatrutide), and Ascend (MOTS-c).",
  },
  "nad-plus": {
    lead:
      "Renew Protocol (NAD+) is curated to support investigation of cellular energy, longevity-focused wellness, and metabolic health.",
    overview:
      "Renew Protocol centers on NAD+, a coenzyme foundational to cellular energy research within the Atara system.",
    scientificProfile: {
      classification: "Cellular Energy & Metabolic Compound",
      description:
        "NAD+ is a naturally occurring coenzyme involved in cellular energy production and metabolic function.",
    },
    applications: [
      "Cellular energy metabolism",
      "Mitochondrial function",
      "Longevity-focused wellness",
      "Metabolic health",
    ],
    protocolSlugs: ["glow", "bpc-tb500"],
    protocolIntro:
      "Renew Protocol is commonly paired with Radiance Protocol and Recovery Protocol as part of Atara’s intentional system.",
  },
  "mots-c": {
    lead:
      "Ascend (MOTS-c) is a mitochondrial-derived peptide studied for its role in metabolic adaptation and cellular energy regulation. Naturally encoded within mitochondrial DNA, Ascend (MOTS-c) has become an important focus of metabolic research.",
    overview:
      "The unique biological origin of Ascend (MOTS-c) continues to expand scientific understanding of mitochondrial communication and physiological resilience.",
    scientificProfile: {
      classification: "Mitochondrial-Derived Peptide",
      description:
        "Ascend (MOTS-c) is a mitochondrial-derived peptide investigated for metabolic signaling. Ascend (MOTS-c) supports studies involving cellular energy regulation, mitochondrial communication, and metabolic adaptation.",
    },
    applications: [
      "Mitochondrial signaling",
      "Cellular energy regulation",
      "Metabolic adaptation",
      "Exercise physiology",
      "Glucose metabolism",
      "Cellular homeostasis",
    ],
    protocolSlugs: ["tirzepatide", "retatrutide", "nad-plus"],
    protocolIntro:
      "Ascend (MOTS-c) is commonly incorporated into metabolic research protocols alongside Accelerate (Tirzepatide), Apex (Retatrutide), and Revive (NAD+).",
  },
  semax: {
    lead:
      "Focus (Semax) is a synthetic peptide studied for its role in neuronal signaling and central nervous system research. The mechanism of Focus (Semax) has made it an established model for investigating cognitive processes and neurobiological function.",
    overview:
      "Broad scientific interest in Focus (Semax) continues to support research involving learning, memory, and neurological signaling.",
    scientificProfile: {
      classification: "Nootropic Research Peptide",
      description:
        "Focus (Semax) is a synthetic nootropic peptide investigated for neuronal communication and central nervous system signaling. Focus (Semax) supports research involving cognition and neurobiology.",
    },
    applications: [
      "Cognitive research",
      "Neuronal signaling",
      "Central nervous system function",
      "Neurobiology",
      "Learning and memory models",
      "Neurophysiological research",
    ],
    protocolSlugs: ["dsip", "nad-plus", "mots-c"],
    protocolIntro:
      "Focus (Semax) is commonly incorporated into neuroscience research protocols alongside Drift (DSIP), Revive (NAD+), and Ascend (MOTS-c).",
  },
  "pt-141": {
    lead:
      "Desire (PT-141) is a melanocortin receptor agonist studied for its interaction with central nervous system pathways. The receptor-specific mechanism of Desire (PT-141) has made it an important model for neuroendocrine research.",
    overview:
      "The biological profile of Desire (PT-141) continues to support investigations into receptor biology and neuroendocrine communication.",
    scientificProfile: {
      classification: "Melanocortin Receptor Agonist",
      description:
        "Desire (PT-141) is a melanocortin receptor agonist investigated for neuroendocrine signaling. Desire (PT-141) supports studies involving receptor activation and central nervous system communication.",
    },
    applications: [
      "Melanocortin receptor signaling",
      "Neuroendocrine biology",
      "Receptor activation",
      "Central nervous system research",
      "Neurobiological signaling",
      "Hormonal communication",
    ],
    protocolSlugs: ["oxytocin", "nad-plus"],
    protocolIntro:
      "Desire (PT-141) is commonly incorporated into neuroendocrine research protocols alongside Connect (Oxytocin) and Revive (NAD+).",
  },
  oxytocin: {
    lead:
      "Connect (Oxytocin) is a naturally occurring neuropeptide involved in neuroendocrine communication and behavioral research. The widespread activity of Connect (Oxytocin) throughout the nervous system has made it one of the most extensively studied signaling molecules in neuroscience.",
    overview:
      "The biological profile of Connect (Oxytocin) supports investigations into social behavior, receptor biology, and endocrine communication.",
    scientificProfile: {
      classification: "Neuropeptide Hormone",
      description:
        "Connect (Oxytocin) is a naturally occurring neuropeptide studied for communication between the nervous and endocrine systems. Connect (Oxytocin) supports research involving receptor biology and behavioral neuroscience.",
    },
    applications: [
      "Neuroendocrine signaling",
      "Social behavior research",
      "Receptor biology",
      "Central nervous system function",
      "Behavioral neuroscience",
      "Hormonal communication",
    ],
    protocolSlugs: ["pt-141", "nad-plus"],
    protocolIntro:
      "Connect (Oxytocin) is commonly incorporated into neuroendocrine research protocols alongside Desire (PT-141) and Revive (NAD+).",
  },
  dsip: {
    lead:
      "Drift (DSIP) contains Delta Sleep-Inducing Peptide, a naturally occurring neuropeptide studied for its relationship with sleep physiology and circadian biology. Although its biological role continues to be explored, Drift (DSIP) remains an established model for neurological research.",
    overview:
      "The unique profile of Drift (DSIP) supports investigations into the relationship between sleep regulation, neuroendocrine signaling, and physiological homeostasis.",
    scientificProfile: {
      classification: "Neuropeptide",
      description:
        "Drift (DSIP) is a naturally occurring neuropeptide investigated for sleep physiology and neuroendocrine signaling. Drift (DSIP) supports studies involving circadian biology and neurological regulation.",
    },
    applications: [
      "Sleep physiology",
      "Circadian biology",
      "Neuroendocrine signaling",
      "Neurological regulation",
      "Central nervous system research",
      "Physiological homeostasis",
    ],
    protocolSlugs: ["semax", "nad-plus", "oxytocin"],
    protocolIntro:
      "Drift (DSIP) is commonly incorporated into neuroscience research protocols alongside Focus (Semax), Revive (NAD+), and Connect (Oxytocin).",
  },
};

export function getProductContent(slug: string) {
  return productContentBySlug[slug] ?? null;
}
