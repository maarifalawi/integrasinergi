export type GalleryPhoto = {
  /** public path of the frame */
  src: string;
  /** what is in the frame, read out by screen readers in the viewer */
  alt: string;
  /** accessible name for the enlarge-photo button; not a visible caption */
  title: string;
  /** visible caption: the activity and service line or shift */
  meta: string;
};

// Field photography, in the order the rail presents it: container work first,
// then warehouse checks, then trucking after dark. Every frame is one of ours,
// nothing here is a stock or staged shot.
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/img/about/field-01.jpg",
    alt: "Pintu kontainer hijau terbuka memperlihatkan tumpukan pelat baja yang tersusun rapat sampai ujung, dilihat dari luar gudang beratap bening",
    title: "Muat Baja",
    meta: "Stuffing · Sea Freight",
  },
  {
    src: "/img/about/field-02.jpg",
    alt: "Barisan kardus putih tersusun penuh memenuhi bak truk, dilihat dari ujung bak dengan plat nomor kendaraan di bagian bawah",
    title: "Kardus Penuh",
    meta: "Loading · Inland",
  },
  {
    src: "/img/about/field-03.jpg",
    alt: "Dua pekerja mengarahkan ekskavator kuning saat dinaikkan ke atas trailer lowbed di halaman terbuka",
    title: "Alat Berat",
    meta: "Project Cargo · Inland",
  },
  {
    src: "/img/about/field-05.jpg",
    alt: "Petugas gudang berbaju putih dan bertopi jongkok memeriksa label pada tumpukan kardus di atas palet, berlatar lantai gudang biru",
    title: "Cek Fisik",
    meta: "Gudang · Verifikasi",
  },
  {
    src: "/img/about/field-06.jpg",
    alt: "Dua tumpukan kardus berlabel fragile di atas palet, dibungkus plastik dan diikat tali, berdiri di dalam bak truk",
    title: "Fragile",
    meta: "Stuffing · Sea Freight",
  },
  {
    src: "/img/about/field-07.jpg",
    alt: "Kontainer biru terbuka pada malam hari memperlihatkan palet berisi karung material yang siap ditutup, dilihat dari belakang truk",
    title: "Muat Malam",
    meta: "Stuffing · Night Shift",
  },
  {
    src: "/img/about/field-08.jpg",
    alt: "Truk bak terbuka bermuatan palet terbungkus plastik terparkir di halaman berlampu pada malam hari",
    title: "Berangkat Malam",
    meta: "Trucking · Night Run",
  },
  {
    src: "/img/about/field-09.jpg",
    alt: "Tiga pekerja menurunkan ember plastik putih dan kardus dari bak truk berwarna biru muda di depan gudang",
    title: "Bongkar Bergilir",
    meta: "Loading · Inland",
  },
  {
    src: "/img/about/field-10.jpg",
    alt: "Interior kontainer dilihat dari pintu: dua palet ember putih terbungkus plastik dan tumpukan kardus di belakangnya",
    title: "Isi Kontainer",
    meta: "Stuffing · Sea Freight",
  },
  {
    src: "/img/about/field-11.jpg",
    alt: "Truk bak merah bermuatan ember putih dan kardus terbungkus plastik, terparkir di halaman dengan kontainer dan pepohonan di belakang",
    title: "Siap Jalan",
    meta: "Trucking · Inland",
  },
  {
    src: "/img/about/field-12.jpg",
    alt: "Empat palet karung putih terbungkus plastik dan diikat tali hijau, tersusun dua lapis di dalam kontainer",
    title: "Palet Terikat",
    meta: "Stuffing · Sea Freight",
  },
  {
    src: "/img/about/field-13.jpg",
    alt: "Forklift hijau dengan pengemudi berhelm naik melintasi dock leveler menuju pintu kontainer, diarahkan petugas berbaju rompi",
    title: "Forklift",
    meta: "Loading Dock · Inland",
  },
];
