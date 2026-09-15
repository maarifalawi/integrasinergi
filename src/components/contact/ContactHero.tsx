import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LineReveal } from "@/components/motion/LineReveal";
import { ContactList } from "./ContactList";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Each department stacks on mobile; every person has their own contact links.
export function ContactHero() {
  const reduce = useReducedMotion();
  const up = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="bg-background px-6 pt-24 pb-16 md:px-10 md:pt-36 md:pb-24">
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
            className="text-muted-foreground mt-6 max-w-[560px] text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed"
            {...up(0.45)}
          >
            Melayani ekspor impor, domestik via laut, darat dan udara.
          </motion.p>
        </div>

        <motion.div id="tim-kontak" className="mt-12 scroll-mt-20 md:mt-16" {...up(0.65)}>
          <h2 className="sr-only">Kontak per departemen</h2>
          <ContactList layout="rows" />
        </motion.div>
      </div>
    </section>
  );
}
