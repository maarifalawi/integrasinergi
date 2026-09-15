import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LineReveal } from "@/components/motion/LineReveal";
import { Button } from "@/components/ui/Button";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Sub-768px fallback: identical single column, padding tightens with px-6.
export function AboutHero() {
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
    <section className="bg-background px-6 pt-24 pb-16 md:px-10 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[860px]">
          <motion.p
            className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase"
            {...up(0)}
          >
            <span aria-hidden className="bg-primary h-px w-8" />
            Tentang ISLI
          </motion.p>
          <div className="mt-6">
            <LineReveal
              as="h1"
              onMount
              lines={headingLines.aboutH1}
              className="text-foreground text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            />
          </div>
          <motion.p
            className="text-muted-foreground mt-8 max-w-[620px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]"
            {...up(0.45)}
          >
            Forwarding laut, udara, dan domestik untuk kargo Indonesia
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <motion.div {...up(0.65)}>
              <Button to="/kontak" hash="penawaran" variant="primaryLarge" arrow>
                Minta Penawaran
              </Button>
            </motion.div>
            <motion.div {...up(0.78)}>
              <Button to="/layanan" variant="secondary" arrow>
                Lihat Layanan
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Letterhead strip: the verifiable facts, before anyone asks. */}
        <motion.div
          className="border-border mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-6 md:mt-20"
          {...up(0.9)}
        >
          {["BERDIRI 2024", "BEKASI, INDONESIA", "INTEGRA GROUP"].map((item) => (
            <span
              key={item}
              className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
