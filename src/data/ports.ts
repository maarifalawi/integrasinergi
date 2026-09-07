// Abstract network coordinates for the coverage map. The dots are deliberately
// not a complete or authoritative list of destinations — they illustrate the
// density of the network, while the surrounding copy states the actual scope.

export type Point = { x: number; y: number };
export type TabId = "domestik" | "internasional";

export const ORIGIN: Point = { x: 500, y: 340 };

const domesticNodes: Point[] = [
  { x: 77, y: 115.9 },
  { x: 48.4, y: 100.2 },
  { x: 141.2, y: 100.7 },
  { x: 197.8, y: 173 },
  { x: 173.2, y: 157.2 },
  { x: 189.8, y: 135.3 },
  { x: 282.3, y: 207.9 },
  { x: 290.4, y: 201 },
  { x: 329.4, y: 200 },
  { x: 344.7, y: 187.3 },
  { x: 364.1, y: 182.5 },
  { x: 369, y: 230.9 },
  { x: 384.7, y: 194.6 },
  { x: 482.6, y: 269.9 },
  { x: 418.1, y: 215.5 },
  { x: 458.7, y: 285 },
  { x: 512.9, y: 273.7 },
  { x: 510.1, y: 240.2 },
  { x: 639.8, y: 296.4 },
  { x: 564.3, y: 303.1 },
  { x: 642.1, y: 277.2 },
  { x: 641.2, y: 267.1 },
  { x: 714.4, y: 244 },
  { x: 703.9, y: 272.7 },
  { x: 801.4, y: 296.5 },
  { x: 770.8, y: 296.3 },
  { x: 772.1, y: 320.8 },
  { x: 902.6, y: 295.8 },
];

const internationalNodes: Point[] = [
  { x: 744.2, y: 348.6 },
  { x: 214.6, y: 222.9 },
  { x: 742.5, y: 340.2 },
  { x: 75.7, y: 341.8 },
  { x: 258.9, y: 328.8 },
  { x: 744.6, y: 294.5 },
  { x: 133.3, y: 236.9 },
  { x: 705.4, y: 285.9 },
  { x: 486.5, y: 154 },
  { x: 100.1, y: 177.5 },
  { x: 595.8, y: 84.4 },
  { x: 709.1, y: 131.5 },
  { x: 403.9, y: 114.2 },
  { x: 95.7, y: 336.7 },
  { x: 574.9, y: 85.5 },
  { x: 518.3, y: 64.8 },
  { x: 798.9, y: 224.4 },
  { x: 867.3, y: 301.6 },
  { x: 449.1, y: 131.4 },
  { x: 169.9, y: 314.3 },
  { x: 772, y: 167.9 },
  { x: 733.3, y: 252.6 },
  { x: 280.5, y: 354.6 },
  { x: 138.3, y: 277.5 },
  { x: 606.2, y: 96.1 },
  { x: 281.3, y: 294.2 },
  { x: 788.6, y: 238.2 },
  { x: 687.7, y: 340.7 },
  { x: 937.9, y: 98.9 },
  { x: 133.4, y: 283.4 },
  { x: 466.5, y: 78.1 },
  { x: 219.2, y: 296.1 },
  { x: 578.2, y: 156.6 },
  { x: 62.8, y: 143.4 },
  { x: 154.4, y: 122.5 },
  { x: 522.6, y: 135.8 },
];

export const charts: Record<
  TabId,
  {
    label: string;
    width: number;
    height: number;
    equatorY: number;
    origin: Point;
    nodes: Point[];
  }
> = {
  domestik: {
    label: "Domestik",
    width: 1000,
    height: 420,
    equatorY: 168,
    origin: ORIGIN,
    nodes: domesticNodes,
  },
  internasional: {
    label: "Internasional",
    width: 1000,
    height: 420,
    equatorY: 346,
    origin: ORIGIN,
    nodes: internationalNodes,
  },
};
