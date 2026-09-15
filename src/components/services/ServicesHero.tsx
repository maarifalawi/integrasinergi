import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Sub-768px fallback: identical single column, the index grid drops to two
// columns, padding tightens with px-6.
export function ServicesHero() {
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
            Layanan
          </motion.p>
          <div className="mt-6">
            <LineReveal
              as="h1"
              onMount
              lines={headingLines.servicesH1}
              className="text-foreground text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            />
          </div>
          <motion.p
            className="text-muted-foreground mt-8 max-w-[620px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]"
            {...up(0.45)}
          >
            Menggunakan SOC dari mitra pelayaran internasional, kami kendalikan ketersediaan ruang
            dan biaya untuk ekspor, impor, dan domestik.
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <motion.div {...up(0.65)}>
              <Button to="/kontak" hash="penawaran" variant="primaryLarge" arrow>
                Minta Penawaran
              </Button>
            </motion.div>
            <motion.div {...up(0.78)}>
              <Button to="/layanan" hash="alur" variant="secondary" arrow>
                Lihat Alur Operasional
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Anchor index: five long blocks need a table of contents. */}
        <motion.nav
          aria-label="Indeks layanan"
          className="border-border mt-12 border-t pt-10 md:mt-20"
          {...up(0.9)}
        >
          <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
            Tiga Lini Layanan
          </p>
          <ul className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link to="/layanan" hash={service.slug} className="group block">
                  <span className="text-muted-foreground group-hover:text-primary font-mono text-[11px] tracking-[0.08em] transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground group-hover:text-primary mt-2 flex items-center gap-1.5 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em] transition-colors duration-300">
                    {service.name}
                    <ArrowUpRight
                      aria-hidden
                      size={14}
                      weight="bold"
                      className="text-primary -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
