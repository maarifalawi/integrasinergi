import { createFileRoute } from "@tanstack/react-router";
import { SeaFreightBlock, AirFreightBlock, InlandBlock } from "@/components/services/ServiceBlocks";
import { PartnerStrip } from "@/components/services/PartnerStrip";
import { CoverageSection } from "@/components/map/CoverageSection";
import { ClosingBand } from "@/components/home/ClosingBand";

const title = "Layanan Forwarding Laut, Udara dan Darat | ISLI";
const description =
  "Sea freight (FCL dan LCL), air freight, dan inland untuk pengiriman domestik maupun ekspor dan impor, dengan kontainer SOC dari mitra pelayaran internasional.";

export const Route = createFileRoute("/layanan")({
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
  component: Services,
});

// Start directly with the service catalogue; no introductory sections.
function Services() {
  return (
    <>
      <SeaFreightBlock />
      <AirFreightBlock />
      <InlandBlock />
      <PartnerStrip />
      <CoverageSection />
      <ClosingBand />
    </>
  );
}
