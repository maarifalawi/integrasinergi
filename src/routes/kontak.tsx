import { createFileRoute } from "@tanstack/react-router";
import { ContactHero } from "@/components/contact/ContactHero";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { ExpectSteps } from "@/components/contact/ExpectSteps";
import { OfficeMap } from "@/components/contact/OfficeMap";
import { Faq } from "@/components/contact/Faq";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Kontak ISLI, Minta Penawaran Pengiriman Kargo";
const description =
  "Hubungi Sales Dept., Manajer Operasional, atau Commercial Dept. ISLI. Sampaikan rute, jenis barang, volume, dan jadwal untuk permintaan penawaran.";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

// Surface sequence: white, parchment, pearl, white, parchment, photographic.
function Contact() {
  return (
    <>
      <ContactHero />
      <QuoteForm />
      <ExpectSteps />
      <OfficeMap />
      <Faq />
      <ClosingBand />
    </>
  );
}
