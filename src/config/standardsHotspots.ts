export type FactHotspot = {
  factIndex: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
};

/** Default panel positions — tune via ?placeStandards=1 */
export const STANDARDS_WALL_HOTSPOTS: FactHotspot[] = [
  { factIndex: 0, centerX: 28, centerY: 67, width: 17, height: 8 },
  { factIndex: 1, centerX: 42, centerY: 36, width: 12, height: 7.5 },
  { factIndex: 2, centerX: 50, centerY: 66, width: 11, height: 6 },
  { factIndex: 3, centerX: 64, centerY: 54, width: 12, height: 10 },
  { factIndex: 4, centerX: 66, centerY: 32, width: 12, height: 6 },
];

export const STANDARDS_HOTSPOTS_STORAGE_KEY = "archon-standards-hotspots";
