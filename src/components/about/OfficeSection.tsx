import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { office } from "@/data/contacts";
import { ContactList } from "@/components/contact/ContactList";
import { headingLines } from "@/data/headings";

// Sub-768px fallback: address block first, then the contact list, one column.
export function OfficeSection() {
  return (
    <section className="bg-tile-dark px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.kantor}
            className="text-foreground-on-dark text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div className="mt-12 space-y-12">
          <Reveal>
            <p className="text-muted-foreground-on-dark text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
              Kantor
            </p>
            <p className="text-foreground-on-dark mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              {office.line1}
            </p>
            <p className="text-foreground-on-dark text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              {office.line2}
            </p>
            <p className="text-muted-foreground-on-dark mt-6 max-w-[320px] text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
              Sales, operasional, dan commercial dalam satu koordinasi.
            </p>
          </Reveal>

          <ContactList dark />
        </div>
      </div>
    </section>
  );
}
