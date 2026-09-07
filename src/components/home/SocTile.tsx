import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { HairlineRow } from "@/components/motion/HairlineRow";
import { socAdvantages } from "@/data/services";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The SOC photograph. A clipped frame opens while the image settles out of a
 * zoom, an ambient glow blooms behind it and keeps breathing, and the image
 * keeps a slow hover zoom afterwards. All motion is off under reduced motion.
 */
function SocPhoto() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const play = reduce || inView;

  return (
    <div ref={ref} className="relative">
      {/* ambient glow blooming behind the frame, then breathing forever */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute -inset-8"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--primary-on-dark) 16%, transparent), transparent)",
          }}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 0.9 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
        >
          <motion.div
            className="h-full w-full"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 2,
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]"
        style={{ boxShadow: "3px 5px 30px 0 rgba(0,0,0,0.22)" }}
        initial={reduce ? false : { clipPath: "inset(14% 8% 14% 8% round 18px)", opacity: 0 }}
        animate={play ? { clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.18 }}
          animate={play ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <img
            src="/img/soc-container-grid.jpg"
            width={1376}
            height={768}
            alt="Susunan kontainer bertumpuk dilihat dari atas, membentuk pola geometris"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] hover:scale-[1.06]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Sub-768px fallback: single column, the photograph moves under the body copy
// and every list row stacks its title over its description.
export function SocTile() {
  return (
    <section className="bg-tile-dark px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <LineReveal
              as="h2"
              lines={headingLines.soc}
              className="text-foreground-on-dark text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
            />
            <Reveal delay={0.06}>
              <p className="text-muted-foreground-on-dark mt-8 max-w-[560px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                Kami mengoperasikan kontainer milik mitra pelayaran internasional untuk menopang
                pergerakan domestik. Skema ini memberi ruang gerak yang tidak dimiliki forwarder
                yang bergantung penuh pada alokasi liner.
              </p>
            </Reveal>
          </div>

          <SocPhoto />
        </div>

        <div className="mt-16">
          {socAdvantages.map((item, index) => (
            <HairlineRow key={item.title} index={index} tone="dark">
              <div className="group relative -mx-3 px-3 sm:-mx-4 sm:px-4">
                {/* hover wash: padded so it never clips the text */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 rounded-xl bg-white/5 transition-transform duration-300 ease-out group-hover:scale-y-100"
                />
                {/* accent bar floating inside the left edge */}
                <span
                  aria-hidden
                  className="absolute top-2.5 bottom-2.5 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-[var(--primary-on-dark)] transition-transform duration-300 ease-out group-hover:scale-y-100"
                />

                <div className="relative grid gap-8 py-7 lg:grid-cols-[minmax(0,340px)_1fr]">
                  <p className="text-foreground-on-dark flex items-baseline gap-3 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                    <span className="font-mono text-[11px] font-normal tracking-[0.08em] text-[var(--primary-on-dark)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--primary-on-dark)]">
                      {item.title}
                    </span>
                  </p>
                  <p className="text-muted-foreground-on-dark text-[1.0625rem] leading-[1.47] tracking-[-0.022em] transition-colors duration-300 group-hover:text-foreground-on-dark">
                    {item.description}
                  </p>
                </div>

                <Plus
                  aria-hidden
                  size={16}
                  weight="bold"
                  className="absolute top-7 right-3 rotate-0 text-[var(--primary-on-dark)] opacity-0 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:opacity-100 sm:right-4"
                />
              </div>
            </HairlineRow>
          ))}
        </div>
      </div>
    </section>
  );
}
