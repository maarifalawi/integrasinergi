import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Parallax } from "@/components/motion/Parallax";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Editorial photograph: a clipped frame opens while the image settles. */
function LatarPhoto() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]"
      initial={reduce ? false : { clipPath: "inset(10% 6% 10% 6% round 18px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {/* Second and last Parallax instance on this page (ClosingBand is first). */}
      <Parallax className="h-full w-full" range={4}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.18 }}
          whileInView={{ scale: 1.08 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <img
            src="/img/soc-container-grid.jpg"
            width={1376}
            height={768}
            alt="Susunan kontainer bertumpuk dilihat dari atas, membentuk pola geometris"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </Parallax>
    </motion.div>
  );
}

// Sub-768px fallback: single stacked column, sticky column behaves normally.
export function Latar() {
  return (
    <section className="bg-parchment px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24">
            <LineReveal
              as="h2"
              lines={headingLines.latar}
              className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
            />
            <Reveal delay={0.1}>
              <blockquote className="border-border mt-10 border-y py-6">
                <p className="text-foreground text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.35] font-medium tracking-[-0.022em]">
                  &ldquo;Kami tidak memulai dari nol. Kami memulai dari jaringan grup yang sudah
                  berjalan.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.06}>
              <p className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                PT Integra Sinergi Logitama Indonesia berdiri pada 2024 sebagai penyedia jasa
                forwarding internasional dan domestik. Kami merupakan bagian dari kelompok usaha
                lokal Indonesia yang bergerak di bidang trading, konstruksi, dan transportasi.
              </p>
              <p className="text-muted-foreground mt-6 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                Bagi klien, posisi itu berarti satu hal: alokasi kontainer, armada trucking, dan
                meja koordinasi yang tidak bergantung penuh pada pihak ketiga.
              </p>
            </Reveal>
            <LatarPhoto />
          </div>
        </div>
      </div>
    </section>
  );
}
