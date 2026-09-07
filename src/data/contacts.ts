export type Contact = {
  name: string;
  role: string;
  phone: string;
  /** wa.me deep-link number: digits only, no plus, no spaces. */
  waNumber: string;
  email: string;
};

export const contacts: Contact[] = [
  {
    name: "Svetlana Dwyra",
    role: "Commercial",
    phone: "+62 812 1144 0516",
    waNumber: "6281211440516",
    email: "svetlana@integrafreight.com",
  },
  {
    name: "Fairul Ikhsan",
    role: "Commercial",
    phone: "+62 817 7634 0110",
    waNumber: "6281776340110",
    email: "fairul@integrafreight.com",
  },
  {
    name: "Mustakim",
    role: "Sales",
    phone: "+62 852 8269 1388",
    waNumber: "6285282691388",
    email: "kim@integrafreight.com",
  },
];

export const office = {
  line1: "Ruko Symphoni Blok HX1 No. 33",
  line2: "Harapan Indah, Bekasi",
};

export const whatsapp = {
  href: "https://wa.me/6285282691388?text=Halo%20ISLI%2C%20saya%20ingin%20menanyakan%20penawaran%20pengiriman.",
};

export const legal = {
  company: "PT Integra Sinergi Logitama Indonesia",
  copyright: "© 2026 PT Integra Sinergi Logitama Indonesia. Seluruh hak dilindungi.",
};
