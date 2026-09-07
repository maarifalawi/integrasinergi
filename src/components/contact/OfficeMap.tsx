import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { office } from "@/data/contacts";
import { headingLines } from "@/data/headings";

const src =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8247565134548!2d106.98316821095986!3d-6.154219860296398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b00543fcd47%3A0xa1514ef24f44f23d!2sPT.%20Integra%20Sinergi%20Logitama!5e0!3m2!1sen!2sid!4v1788508782716!5m2!1sen!2sid";

const directions =
  "https://www.google.com/maps/search/?api=1&query=PT%20Integra%20Sinergi%20Logitama%20Indonesia";

// Sub-768px fallback: heading, address block, then the map in one column.
export function OfficeMap() {
  return (
    <section className="bg-background px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-24">
            <LineReveal
              as="h2"
              lines={headingLines.peta}
              className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
            />
            <p className="text-muted-foreground mt-10 font-mono text-[11px] tracking-[0.14em] uppercase">
              Kantor
            </p>
            <p className="text-foreground mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              {office.line1}
            </p>
            <p className="text-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              {office.line2}
            </p>
            <p className="mt-6">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta text-primary inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] leading-[1.43] tracking-[-0.016em] transition-opacity duration-200 hover:opacity-75"
              >
                Buka di Google Maps
                <ArrowUpRight
                  aria-hidden
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            {/* The aspect wrapper reserves height so the iframe never shifts layout. */}
            <div className="border-border aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border">
              <iframe
                src={src}
                title="Peta lokasi kantor ISLI di Harapan Indah, Bekasi"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                width={1200}
                height={900}
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
