import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { contacts, office } from "@/data/contacts";
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

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-24">
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
              Satu kantor, satu tim commercial. Mudah ditemui, mudah ditelepon.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {contacts.map((contact, index) => (
              <Reveal key={contact.email} delay={index * 0.06}>
                <div className="bg-tile-dark-2 rounded-[var(--radius-card)] border border-white/10 p-6 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/25 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <p className="text-foreground-on-dark text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                      {contact.name}
                    </p>
                    <p className="text-muted-foreground-on-dark rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase">
                      {contact.role}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-1">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="text-foreground-on-dark hover:text-[var(--primary-on-dark)] font-mono text-[0.9375rem] tracking-[0.02em] tabular-nums transition-colors duration-200"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[0.875rem] leading-[1.43] tracking-[-0.016em] text-[var(--primary-on-dark)] transition-opacity duration-200 hover:opacity-75"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
