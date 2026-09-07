export type Service = {
  slug: string;
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
      "Pengiriman laut FCL dan LCL untuk ekspor dan impor, memakai alokasi langsung dari pelayaran mitra.",
    image: "/img/service-sea-freight.jpg",
    alt: "Kapal kontainer di laut tenang menjelang senja",
    span: 3,
  },
  {
    slug: "air-freight",
    name: "Air Freight",
    description:
      "Kargo yang tidak bisa menunggu kapal, ditangani dari bandara asal sampai gudang tujuan.",
    image: "/img/service-air-freight.jpg",
    alt: "Pesawat kargo di apron bandara pada pagi hari, pintu kargo terbuka",
    span: 3,
  },
  {
    slug: "domestic-forwarding",
    name: "Domestic Forwarding",
    description:
      "Distribusi antar pulau dengan kontainer SOC, sehingga jadwal Anda tidak menempel pada alokasi liner.",
    image: "/img/service-domestic-forwarding.jpg",
    alt: "Kapal feeder kontainer bersandar di pelabuhan pesisir Indonesia pada pagi berkabut",
    span: 2,
  },
  {
    slug: "project-cargo",
    name: "Project Cargo",
    description:
      "Alat berat dan muatan berdimensi khusus, termasuk survei rute, perizinan, dan pengawasan bongkar muat.",
    image: "/img/service-project-cargo.jpg",
    alt: "Bejana baja berukuran besar dan alat berat terikat di atas trailer lowbed di dermaga",
    span: 2,
  },
  {
    slug: "transportation",
    name: "Transportation",
    description:
      "Trucking dari dan ke pelabuhan, dijadwalkan mengikuti closing time kapal, bukan sebaliknya.",
    image: "/img/service-transportation.jpg",
    alt: "Truk kontainer melintas di jalan tol layang menjelang malam dengan latar pelabuhan",
    span: 2,
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
