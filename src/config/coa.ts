export type CoaRecord = {
  productId: string;
  /** Public URL under /coa */
  file: string;
  batchId: string;
  lotNumber?: string;
  labId?: string;
  dateReported?: string;
  purity?: string;
};

/** COA files live in /public/coa — keyed to product id */
export const coaRecords: CoaRecord[] = [
  {
    productId: "retatrutide",
    file: "/coa/retatrutide.png",
    batchId: "251005RT1032",
    lotNumber: "RET1025",
    labId: "V251125-1 011",
    dateReported: "12/19/2025",
    purity: "99.72%",
  },
  {
    productId: "tirzepatide",
    file: "/coa/accelerate.jpg",
    batchId: "251107TZ103",
    lotNumber: "TIR1025",
    labId: "V251125-1 019",
    dateReported: "12/19/2025",
    purity: ">99.67%",
  },
  {
    productId: "mots-c",
    file: "/coa/ascend.png",
    batchId: "251103MO103",
    lotNumber: "MOC1025",
    labId: "V251125-1 008",
    dateReported: "12/19/2025",
    purity: ">99.51%",
  },
  {
    productId: "semax",
    file: "/coa/focus.jpg",
    batchId: "251117SX103",
    lotNumber: "SEX1025",
    labId: "V251125-1 007",
    dateReported: "12/19/2025",
    purity: ">99.16%",
  },
  {
    productId: "glow",
    file: "/coa/glow.pdf",
    batchId: "251125GS703",
    lotNumber: "251125GS703",
    labId: "V260115-10 001",
    dateReported: "1/30/2026",
    purity: ">99.80%",
  },
  {
    productId: "bpc-tb500",
    file: "/coa/recover.jpg",
    batchId: "251212WL103",
    lotNumber: "251212WL103",
    labId: "V251216-10 001",
    dateReported: "12/26/2025",
    purity: ">99.80%",
  },
  {
    productId: "nad-plus",
    file: "/coa/revive.png",
    batchId: "2250910NAD500-2",
    lotNumber: "2250910NAD500-2",
    labId: "V260217-4 001",
    dateReported: "3/3/2026",
    purity: ">99.29%",
  },
];

/** Normalize purity for display — always prefix with > */
export function formatCoaPurity(purity?: string) {
  if (!purity) return "—";
  const trimmed = purity.trim();
  return trimmed.startsWith(">") ? trimmed : `>${trimmed}`;
}

/** Non-peptide products — excluded from the COA library */
export const coaExemptProductIds = new Set(["lemon-x"]);

export function isCoaExempt(productId: string) {
  return coaExemptProductIds.has(productId);
}

export function getCoaByProductId(productId: string) {
  return coaRecords.find((record) => record.productId === productId);
}
