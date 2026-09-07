import { motion, useReducedMotion } from "motion/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { contacts, whatsapp } from "@/data/contacts";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Fast lanes for visitors who do not need the form. Values come straight from
// data/contacts.ts so they can never drift from the real numbers.
const channels: { label: string; value: string; href: string; hint: string }[] = [
  {
    label: "WHATSAPP",
    value: contacts[2]!.phone,
    href: whatsapp.href,
    hint: "Respons tercepat untuk kargo mendesak.",
  },
  {
    label: "EMAIL",
    value: contacts[0]!.email,
    href: `mailto:${contacts[0]!.email}`,
    hint: "Cocok untuk dokumen dan rincian rute.",
  },
  {
    label: "TELEPON",
    value: contacts[0]!.phone,
    href: `tel:${contacts[0]!.phone.replace(/\s/g, "")}`,
    hint: "Langsung ke tim commercial.",
  },
];

// Sub-768px fallback: identical single column, the channel grid stacks.
export function ContactHero() {
  const reduce = useReducedMotion();
  const up = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="bg-background px-6 pt-24 pb-16 md:px-10 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[860px]">
          <motion.p
            className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase"
            {...up(0)}
          >
            <span aria-hidden className="bg-primary h-px w-8" />
            Kontak
          </motion.p>
          <div className="mt-6">
            <LineReveal
              as="h1"
              onMount
              lines={headingLines.contactH1}
              className="text-foreground text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            />
          </div>
          <motion.p
            className="text-muted-foreground mt-8 max-w-[620px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]"
            {...up(0.45)}
          >
            Sebutkan rute, jenis barang, volume, dan jadwal. Tim commercial menyiapkan penawaran
            pada hari kerja yang sama.
          </motion.p>
        </div>

        {/* Quick channels: some visitors never want a form. */}
        <motion.div className="border-border mt-12 border-t pt-10 md:mt-20" {...up(0.65)}>
          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.label}>
                <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
                  {channel.label}
                </p>
                <a
                  href={channel.href}
                  {...(channel.label === "WHATSAPP"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-foreground hover:text-primary mt-3 inline-flex min-h-[44px] items-center text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.022em] transition-colors duration-200"
                >
                  {channel.value}
                </a>
                <p className="text-muted-foreground mt-2 text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                  {channel.hint}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
