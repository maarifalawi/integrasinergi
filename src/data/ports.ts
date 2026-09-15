// Real geographic coordinates for the coverage map. The destination lists are
// illustrative, not exhaustive — they show the density of the network on a real
// map, while the surrounding copy states the actual scope.

export type TabId = "domestik" | "internasional";

/** [latitude, longitude] */
export type LatLng = [number, number];

export type GeoPoint = {
  name: string;
  position: LatLng;
};

export type CoverageChart = {
  label: string;
  /** Initial map center, used when no bounds are set. */
  center: LatLng;
  zoom: number;
  /** When set, the map fits these bounds instead of center/zoom. */
  bounds?: [LatLng, LatLng];
  origin: GeoPoint;
  destinations: GeoPoint[];
};

// All routes on the map fan out from the home port.
const ORIGIN: GeoPoint = { name: "Jakarta · Tanjung Priok", position: [-6.104, 106.885] };

const domesticDestinations: GeoPoint[] = [
  { name: "Medan · Belawan", position: [3.784, 98.694] },
  { name: "Batam", position: [1.13, 104.053] },
  { name: "Dumai", position: [1.666, 101.4] },
  { name: "Padang · Teluk Bayur", position: [-1.0, 100.367] },
  { name: "Palembang · Boom Baru", position: [-3.0, 104.767] },
  { name: "Bandar Lampung · Panjang", position: [-5.45, 105.317] },
  { name: "Cilacap", position: [-7.73, 109.0] },
  { name: "Semarang · Tanjung Emas", position: [-6.95, 110.417] },
  { name: "Surabaya · Tanjung Perak", position: [-7.217, 112.717] },
  { name: "Denpasar · Benoa", position: [-8.75, 115.217] },
  { name: "Pontianak", position: [-0.017, 109.333] },
  { name: "Banjarmasin · Trisakti", position: [-3.317, 114.583] },
  { name: "Balikpapan · Semayang", position: [-1.267, 116.817] },
  { name: "Samarinda", position: [-0.5, 117.15] },
  { name: "Tarakan", position: [3.3, 117.633] },
  { name: "Makassar · Soekarno–Hatta", position: [-5.117, 119.417] },
  { name: "Palu · Pantoloan", position: [-0.717, 119.85] },
  { name: "Kendari", position: [-3.967, 122.583] },
  { name: "Manado", position: [1.483, 124.833] },
  { name: "Bitung", position: [1.45, 125.183] },
  { name: "Kupang · Tenau", position: [-10.2, 123.533] },
  { name: "Ambon · Yos Sudarso", position: [-3.683, 128.183] },
  { name: "Sorong", position: [-0.883, 131.25] },
  { name: "Jayapura", position: [-2.533, 140.717] },
  { name: "Merauke", position: [-8.483, 140.4] },
];

const internationalDestinations: GeoPoint[] = [
  { name: "Singapura", position: [1.264, 103.84] },
  { name: "Port Klang, Malaysia", position: [3.0, 101.4] },
  { name: "Laem Chabang, Thailand", position: [13.083, 100.883] },
  { name: "Ho Chi Minh · Cat Lai, Vietnam", position: [10.767, 106.75] },
  { name: "Manila, Filipina", position: [14.6, 120.967] },
  { name: "Kaohsiung, Taiwan", position: [22.617, 120.283] },
  { name: "Hong Kong", position: [22.317, 114.167] },
  { name: "Shenzhen · Yantian, Tiongkok", position: [22.583, 114.283] },
  { name: "Shanghai, Tiongkok", position: [31.233, 121.483] },
  { name: "Busan, Korea Selatan", position: [35.1, 129.033] },
  { name: "Tokyo, Jepang", position: [35.65, 139.767] },
  { name: "Colombo, Sri Lanka", position: [6.933, 79.85] },
  { name: "Nhava Sheva, India", position: [18.95, 72.95] },
  { name: "Chennai, India", position: [13.1, 80.3] },
  { name: "Jebel Ali, Uni Emirat Arab", position: [25.017, 55.067] },
  { name: "Dammam, Arab Saudi", position: [26.5, 50.2] },
  { name: "Jeddah, Arab Saudi", position: [21.483, 39.183] },
  { name: "Mombasa, Kenya", position: [-4.067, 39.667] },
  { name: "Durban, Afrika Selatan", position: [-29.867, 31.05] },
  { name: "Rotterdam, Belanda", position: [51.917, 4.483] },
  { name: "Antwerp, Belgia", position: [51.267, 4.4] },
  { name: "Hamburg, Jerman", position: [53.533, 9.983] },
  { name: "Felixstowe, Inggris", position: [51.95, 1.317] },
  { name: "Santos, Brasil", position: [-23.95, -46.3] },
  { name: "Buenos Aires, Argentina", position: [-34.6, -58.367] },
  { name: "Los Angeles, Amerika Serikat", position: [33.733, -118.267] },
  { name: "Houston, Amerika Serikat", position: [29.75, -95.283] },
  { name: "New York, Amerika Serikat", position: [40.683, -74.017] },
  { name: "Fremantle, Australia", position: [-32.05, 115.75] },
  { name: "Melbourne, Australia", position: [-37.817, 144.95] },
  { name: "Sydney, Australia", position: [-33.867, 151.2] },
  { name: "Auckland, Selandia Baru", position: [-36.833, 174.783] },
];

export const coverage: Record<TabId, CoverageChart> = {
  domestik: {
    label: "Domestik",
    center: [-2.2, 118],
    zoom: 4,
    bounds: [
      [-11.5, 93.5],
      [7.5, 142.5],
    ],
    origin: ORIGIN,
    destinations: domesticDestinations,
  },
  internasional: {
    label: "Internasional",
    center: [18, 112],
    zoom: 2,
    origin: ORIGIN,
    destinations: internationalDestinations,
  },
};
