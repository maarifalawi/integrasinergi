export const serviceScopes: Record<string, string[]> = {
  "sea-freight": [
    "Ekspor dan impor FCL",
    "Konsolidasi LCL",
    "Alokasi ruang dari pelayaran mitra",
    "Dokumen ekspor dan impor",
  ],
  "air-freight": [
    "Kargo umum dan kargo prioritas",
    "Penanganan di bandara asal",
    "Dokumen dan kepabeanan",
    "Pengiriman lanjutan ke gudang tujuan",
  ],
  "domestic-forwarding": [
    "Distribusi antar pulau",
    "Kontainer SOC",
    "Penjadwalan lepas dari alokasi liner",
    "Koordinasi depo dan pelabuhan",
  ],
  "project-cargo": [
    "Muatan berdimensi khusus",
    "Survei rute",
    "Perizinan jalan dan pelabuhan",
    "Pengawasan bongkar muat",
  ],
  transportation: [
    "Trucking pelabuhan ke gudang",
    "Trucking gudang ke pelabuhan",
    "Penjadwalan mengikuti closing time",
    "Pengembalian kontainer kosong ke depo",
  ],
};

export const operationalStages: { title: string; body: string }[] = [
  {
    title: "Penarikan dan Stuffing",
    body: "Kontainer kosong ditarik dari depo, barang dimuat di gudang Anda, dokumen disiapkan, lalu kontainer laden dikirim ke pelabuhan.",
  },
  {
    title: "Pelayaran",
    body: "Dokumen dan operasi diurus di pelabuhan muat, kontainer berlayar, lalu ditangani kembali begitu tiba di pelabuhan bongkar.",
  },
  {
    title: "Pengiriman ke Penerima",
    body: "Kontainer laden diantar ke gudang tujuan, barang dibongkar, kontainer kosong dikembalikan ke depo pelayaran.",
  },
  {
    title: "Pengembalian dan Rotasi",
    body: "Kontainer kosong masuk kembali ke rotasi, siap dipakai untuk muatan ekspor berikutnya.",
  },
];
