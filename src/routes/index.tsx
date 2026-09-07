import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { SocTile } from "@/components/home/SocTile";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { CoverageSection } from "@/components/map/CoverageSection";
import { LogoWall } from "@/components/home/LogoWall";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Integra Sinergi";
const description =
  "PT Integra Sinergi Logitama Indonesia mengelola kontainer SOC untuk ekspor, impor, dan distribusi domestik ke seluruh Indonesia serta internasional ke semua negara.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

// Surface sequence: white, dark, parchment, dark, white, photographic.
function Home() {
  return (
    <>
      <Hero />
      <SocTile />
      <ServiceGrid />
      <CoverageSection />
      <LogoWall />
      <ClosingBand />
    </>
  );
}
