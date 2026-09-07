import { CalendarCheck, Eye, UserCheck } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { headingLines } from "@/data/headings";

// Every claim here is already backed elsewhere on the site: visibility by the
// hero copy, one desk by socAdvantages, schedule by the SOC and trucking lines.
const values: { icon: Icon; title: string; description: string }[] = [
  {
    icon: Eye,
    title: "Visibilitas Penuh",
    description:
      "Setiap leg perjalanan kargo terpantau, dari pelabuhan asal sampai gudang tujuan. Tidak ada titik buta di rantai kami.",
  },
  {
    icon: UserCheck,
    title: "Satu Penanggung Jawab",
    description:
      "Dokumen, pelabuhan, dan trucking dikoordinasikan satu tim commercial. Anda tidak dilempar antar vendor.",
  },
  {
    icon: CalendarCheck,
    title: "Jadwal, Bukan Janji",
    description:
      "Kontainer SOC dan trucking yang dijadwalkan mengikuti closing time kapal. Komitmen kami berdiri di atas aset, bukan harapan.",
  },
];

// Sub-768px fallback: the three cards stack at full width.
export function Values() {
  return (
    <section className="bg-parchment px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.nilai}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <div className="group border-border bg-background relative h-full rounded-[var(--radius-card)] border p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.22)]">
                <div className="flex items-start justify-between">
                  <value.icon
                    aria-hidden
                    size={28}
                    className="text-primary transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                  />
                  <span className="text-muted-foreground font-mono text-[11px] tracking-[0.08em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-foreground mt-8 text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                  {value.title}
                </p>
                <p className="text-muted-foreground mt-3 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
