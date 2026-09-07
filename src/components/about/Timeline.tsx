import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Three milestones, all traceable to the approved company profile. The middle
// one is the company itself, so it is the only one drawn in --primary.
const milestones: { year: string; title: string; description: string }[] = [
  {
    year: "SEBELUM 2024",
    title: "Grup berjalan duluan",
    description:
      "Kelompok usaha bergerak di trading internasional, konstruksi, dan transportasi, tiga lini yang semuanya hidup di atas logistik.",
  },
  {
    year: "2024",
    title: "ISLI resmi berdiri",
    description:
      "PT Integra Sinergi Logitama Indonesia berdiri di Bekasi sebagai perusahaan forwarding tersendiri di dalam grup.",
  },
  {
    year: "KINI",
    title: "Lima lini, satu meja",
    description:
      "Sea freight, air freight, domestic forwarding, project cargo, dan trucking, dikoordinasikan satu tim commercial.",
  },
];

// Sub-768px fallback: the milestones stack as hairline-divided rows and the
// drawing rail is hidden.
export function Timeline() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-parchment px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.timeline}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div className="relative mt-16">
          {/* The rail draws itself left to right on wide screens. */}
          <motion.div
            aria-hidden
            className="bg-border absolute top-0 left-0 hidden h-px w-full origin-left md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />

          <div className="divide-border grid divide-y md:grid-cols-3 md:gap-12 md:divide-y-0">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative py-8 md:py-0">
                {/* dot sitting on the rail */}
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 hidden h-[9px] w-[9px] -translate-y-1/2 rounded-full md:block ${
                    index === 1 ? "bg-primary" : "bg-foreground/25"
                  }`}
                />
                <Reveal delay={index * 0.1}>
                  <div className="md:pt-10">
                    <p
                      className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
                        index === 1 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {milestone.year}
                    </p>
                    <p className="text-foreground mt-3 text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                      {milestone.title}
                    </p>
                    <p className="text-muted-foreground mt-3 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                      {milestone.description}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
