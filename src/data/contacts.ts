export type Contact = {
  name: string;
  role: string;
  /** Office landline; mobile/WhatsApp numbers are intentionally not published. */
  phone: string;
  email: string;
};

export const contacts: Contact[] = [
  {
    name: "Niken",
    role: "Commercial",
    phone: "+62 21 8899-8723",
    email: "niken@integrafreight.com",
  },
];

export const office = {
  line1: "Ruko Symphoni Blok HX1 No. 33",
  line2: "Harapan Indah, Bekasi",
};

export const legal = {
  company: "PT Integra Sinergi Logitama Indonesia",
  copyright: "© 2026 PT Integra Sinergi Logitama Indonesia. Seluruh hak dilindungi.",
};
