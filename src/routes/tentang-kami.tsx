import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/AboutHero";
import { TrustBar } from "@/components/about/TrustBar";
import { Latar } from "@/components/about/Latar";
import { IntegraDiagram } from "@/components/about/IntegraDiagram";
import { Values } from "@/components/about/Values";
import { ScopeSplit } from "@/components/about/ScopeSplit";
import { Timeline } from "@/components/about/Timeline";
import { OfficeSection } from "@/components/about/OfficeSection";
import { SocialProof } from "@/components/about/SocialProof";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Tentang ISLI, Forwarder Laut, Udara, dan Domestik";
const description =
  "PT Integra Sinergi Logitama Indonesia, forwarder yang berdiri 2024 di Bekasi, bagian dari grup trading, konstruksi, dan transportasi.";

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
// parchment, dark, white, photographic.
function About() {
  return (
    <>
      <AboutHero />
      <TrustBar />
      <Latar />
      <IntegraDiagram />
      <Values />
      <ScopeSplit />
      <Timeline />
      <OfficeSection />
      <SocialProof />
      <ClosingBand />
    </>
  );
}
