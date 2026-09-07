import { createFileRoute } from "@tanstack/react-router";
import { ContactHero } from "@/components/contact/ContactHero";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { ExpectSteps } from "@/components/contact/ExpectSteps";
import { OfficeMap } from "@/components/contact/OfficeMap";
import { Faq } from "@/components/contact/Faq";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Kontak ISLI, Minta Penawaran Pengiriman Kargo";
const description =
  "Kirim rute, jenis barang, volume, dan jadwal. Tim commercial ISLI di Bekasi menyiapkan penawaran pada hari kerja yang sama.";

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
