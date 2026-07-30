/** Shared hero geometry — keeps knot atmosphere, photo crop, and UI aligned */

export type KnotEmber = {
  x: string;
  y: string;
  size: string;
  intensity: number;
};

export const heroLayout = {
  knot: {
    mask: {
      mobile: { x: "38%", y: "56%", width: "52%", height: "62%" },
      desktop: { x: "27%", y: "51%", width: "48%", height: "62%" },
    },
    embers: {
      mobile: [
        { x: "20%", y: "72%", size: "min(12vw, 72px)", intensity: 0.85 },
        { x: "26%", y: "61%", size: "min(15vw, 88px)", intensity: 0.95 },
        { x: "32%", y: "49%", size: "min(18vw, 104px)", intensity: 1 },
        { x: "38%", y: "37%", size: "min(14vw, 84px)", intensity: 0.9 },
        { x: "34%", y: "27%", size: "min(11vw, 68px)", intensity: 0.75 },
      ],
      desktop: [
        { x: "16%", y: "74%", size: "min(14vw, 88px)", intensity: 0.85 },
        { x: "23%", y: "63%", size: "min(18vw, 108px)", intensity: 0.95 },
        { x: "29%", y: "51%", size: "min(22vw, 128px)", intensity: 1 },
        { x: "35%", y: "39%", size: "min(17vw, 100px)", intensity: 0.9 },
        { x: "31%", y: "28%", size: "min(13vw, 80px)", intensity: 0.75 },
      ],
    } satisfies Record<"mobile" | "desktop", KnotEmber[]>,
    filaments: {
      mobile: [
        "M 14 78 C 18 70, 23 61, 28 54 C 32 47, 36 40, 39 33 C 41 27, 37 23, 31 25",
        "M 16 76 C 20 68, 25 59, 30 52 C 34 45, 38 38, 41 31 C 43 25, 39 21, 33 23",
        "M 12 80 C 16 72, 21 63, 26 56 C 30 49, 34 42, 37 35 C 39 29, 35 25, 29 27",
      ],
      desktop: [
        "M 10 78 C 14 70, 19 61, 24 54 C 28 47, 32 40, 35 33 C 37 27, 33 23, 27 25",
        "M 12 76 C 16 68, 21 59, 26 52 C 30 45, 34 38, 37 31 C 39 25, 35 21, 29 23",
        "M 8 80 C 12 72, 17 63, 22 56 C 26 49, 30 42, 33 35 C 35 29, 31 25, 25 27",
      ],
    },
  },
} as const;
