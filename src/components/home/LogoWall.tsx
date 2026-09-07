import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { clients } from "@/data/clients";
import { headingLines } from "@/data/headings";

// The partners ("Didukung Jaringan Pelayaran.") block is hidden for now —
// it duplicated the clients logo wall. Data lives on in src/data/partners.ts
// if it ever needs restoring.
// Sub-768px fallback: the brand grid drops to two columns at px-6.
// Brands with a logo asset render the image (grayscale until hovered); the
// rest fall back to plain text until their logo is supplied.
function Logo({ name, logo }: { name: string; logo?: string | undefined }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={`Logo ${name}`}
        loading="lazy"
        className="max-h-full max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    );
  }
  return (
    <span className="text-muted-foreground text-center text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
      {name}
    </span>
  );
}

export function LogoWall() {
  return (
    <section className="bg-background px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1440px]">
        <LineReveal
          as="h2"
          lines={headingLines.clients}
          className="text-foreground mx-auto max-w-[692px] text-center text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
        />
        <Reveal delay={0.06}>
          <div className="mx-auto mt-16 flex max-w-[1200px] flex-wrap justify-center gap-y-8">
            {clients.map((brand) => (
              <div
                key={brand.slug}
                className="flex h-14 w-1/2 items-center justify-center px-5 sm:w-1/4 lg:w-[calc(100%/7)]"
              >
                <Logo name={brand.name} logo={brand.logo} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
