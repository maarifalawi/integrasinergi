export const serviceScopes: Record<string, string[]> = {
  "sea-freight": [
    "Ekspor, impor, dan domestik",
    "FCL (Full Container Load)",
    "LCL (Less than Container Load)",
    "Alokasi ruang dari pelayaran mitra",
    "Dokumen ekspor dan impor",
  ],
  "air-freight": [
    "Ekspor, impor, dan domestik",
    "Kargo umum dan kargo prioritas",
    "Penanganan di bandara asal",
    "Dokumen dan kepabeanan",
    "Pengiriman lanjutan ke gudang tujuan",
  ],
  inland: [
    "Distribusi domestik antar kota dan antar pulau",
    "Trucking pelabuhan ke gudang",
    "Trucking gudang ke pelabuhan",
    "Penjadwalan mengikuti request lead time customer",
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
