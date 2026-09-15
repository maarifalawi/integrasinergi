export type ServiceSlug = "sea-freight" | "air-freight" | "inland";

export type Service = {
  slug: ServiceSlug;
  name: string;
  description: string;
  image: string;
  alt: string;
  /** column span on the lg 6-column grid */
  span: 3 | 2;
};

export const services: Service[] = [
  {
    slug: "sea-freight",
    name: "Sea Freight",
    description:
      "Pengiriman laut FCL dan LCL untuk rute domestik maupun ekspor dan impor, memakai alokasi langsung dari pelayaran mitra.",
    image: "/img/1.png",
    alt: "Kapal kontainer di laut tenang menjelang senja",
    span: 3,
  },
  {
    slug: "air-freight",
    name: "Air Freight",
    description:
      "Kargo udara domestik dan ekspor-impor yang tidak bisa menunggu kapal, ditangani dari bandara asal sampai gudang tujuan.",
    image: "/img/2.png",
    alt: "Pesawat kargo di apron bandara pada pagi hari, pintu kargo terbuka",
    span: 3,
  },
  {
    slug: "inland",
    name: "Inland",
    description:
      "Trucking dan distribusi darat untuk pengiriman domestik serta first-mile dan last-mile ekspor-impor, dijadwalkan mengikuti closing time kapal, bukan sebaliknya.",
    image: "/img/3.png",
    alt: "Truk kontainer melintas di jalan tol layang menjelang malam dengan latar pelabuhan",
    span: 3,
  },
];

export const socAdvantages: { title: string; description: string }[] = [
  {
    title: "Ketersediaan kontainer terkelola",
    description: "Stok diatur dari sisi kami, bukan menunggu giliran alokasi.",
  },
  {
    title: "Struktur tarif berbeda",
    description:
      "Penggunaan SOC membuka skema harga yang tidak tersedia pada kontainer milik pelayaran.",
  },
  {
    title: "Tarif bundling dari pelayaran",
    description: "Volume dinegosiasikan sekaligus, bukan per pengiriman.",
  },
  {
    title: "Satu meja koordinasi",
    description:
      "Dokumen, pelabuhan, dan trucking ditangani satu tim commercial. Anda tidak dilempar antar vendor.",
  },
];
