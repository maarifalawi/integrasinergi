import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/AboutHero";
import { TrustBar } from "@/components/about/TrustBar";
import { Latar } from "@/components/about/Latar";
import { ScopeSplit } from "@/components/about/ScopeSplit";
import { Values } from "@/components/about/Values";
import { Timeline } from "@/components/about/Timeline";
import { FieldGallery } from "@/components/about/FieldGallery";
import { OfficeSection } from "@/components/about/OfficeSection";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Tentang ISLI, Forwarder Laut, Udara, dan Darat";
const description =
  "PT Integra Sinergi Logitama Indonesia, forwarder yang berdiri 2024 di Bekasi, dengan tiga lini layanan: sea freight, air freight, dan inland.";

export const Route = createFileRoute("/tentang-kami")({
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
  component: About,
});

// Surface sequence: white, pearl, parchment, white, parchment, white,
// dark, dark, photographic.
function About() {
  return (
    <>
      <AboutHero />
      <TrustBar />
      <Latar />
      <ScopeSplit />
      <Values />
      <Timeline />
      <FieldGallery />
      <OfficeSection />
      <ClosingBand />
    </>
  );
}
