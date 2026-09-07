import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { clients } from "@/data/clients";
import { headingLines } from "@/data/headings";

// Renders client logos, matching the LogoWall treatment: grayscale at rest,
// full color on hover. Brands without a logo asset fall back to plain text.
// Sub-768px fallback: the grid drops to two columns.
export function SocialProof() {
  return (
    <section className="bg-background px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.clients}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
          <Reveal delay={0.06}>
            <p className="text-muted-foreground mt-8 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              Sebagian perusahaan yang kargonya kami tangani, dari produsen kabel sampai consumer
              goods.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap justify-center gap-y-8">
            {clients.map((brand) => (
              <div
                key={brand.slug}
                className="flex h-14 w-1/2 items-center justify-center px-5 sm:w-1/3 lg:w-[calc(100%/7)]"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
