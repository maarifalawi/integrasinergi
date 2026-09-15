export const departments = ["Sales Dept.", "Manajer Operasional", "Commercial Dept."] as const;

export type Contact = {
  name: string;
  role: (typeof departments)[number];
  /** Only supplied mobile numbers are used for WhatsApp, never the office landline. */
  whatsapp?: string;
  email: string;
};

export const contacts: Contact[] = [
  {
    name: "Mustakim (KIM)",
    role: "Sales Dept.",
    whatsapp: "+62 852 8269 1388",
    email: "kim@integrafreight.com",
  },
  {
    name: "Kamal Sinurat",
    role: "Sales Dept.",
    whatsapp: "+62 812 9408 8818",
    email: "sales02@integrafreight.com",
  },
  {
    name: "Niken",
    role: "Manajer Operasional",
    // Retain the existing email. No WhatsApp number has been supplied for Niken.
    email: "niken@integrafreight.com",
  },
  {
    name: "Svetlana Dwyra",
    role: "Commercial Dept.",
    whatsapp: "+62 812 1144 0516",
    email: "svetlana@integrafreight.com",
  },
  {
    name: "Fairul Ikhsan",
    role: "Commercial Dept.",
    whatsapp: "+62 817 7634 0110",
    email: "fairul@integrafreight.com",
  },
];

// Explicit defaults: rearranging the directory must not silently redirect enquiries.
export const salesContact = contacts.find((contact) => contact.email === "kim@integrafreight.com")!;
export const commercialContact = contacts.find(
  (contact) => contact.email === "svetlana@integrafreight.com",
)!;

export const whatsappHref = (number: string) => `https://wa.me/${number.replace(/\D/g, "")}`;

export const office = {
  line1: "Ruko Symphoni Blok HX1 No. 33",
  line2: "Harapan Indah, Bekasi",
};

export const legal = {
  company: "PT Integra Sinergi Logitama Indonesia",
  copyright: "© 2026 PT Integra Sinergi Logitama Indonesia. Seluruh hak dilindungi.",
};
