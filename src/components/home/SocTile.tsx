import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Anchor, ShippingContainer, Truck } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { socAdvantages } from "@/data/services";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerRibs = Array.from({ length: 9 }, (_, index) => index);

const flow = [
  { label: "Mitra pelayaran", detail: "Sumber unit", icon: Anchor },
  { label: "Distribusi", detail: "Rute domestik", icon: Truck },
];

function FlowNode({
  step,
  play,
  reduce,
  delay,
  align = "left",
}: {
  step: (typeof flow)[number];
  play: boolean;
  reduce: boolean;
  delay: number;
  align?: "left" | "right";
}) {
  return (
    <motion.div
      className={`relative z-20 max-w-[120px] ${align === "right" ? "text-right" : "text-left"}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={play ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-[#17232d] text-[var(--primary-on-dark)] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.9)] ${
          align === "right" ? "ml-auto" : ""
        }`}
      >
        <step.icon aria-hidden size={21} />
      </div>
      <p className="mt-2.5 text-[0.75rem] leading-tight font-medium text-white">{step.label}</p>
      <p className="mt-1 font-mono text-[8px] tracking-[0.1em] text-white/35 uppercase">
        {step.detail}
      </p>
    </motion.div>
  );
}

/** A diagram of how ISLI controls SOC allocation from source to delivery. */
function SocControlPanel() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const play = reduce || inView;

  return (
    <div ref={ref} className="relative isolate h-full">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.16),transparent_68%)] blur-2xl"
      />
      <motion.div
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/12 bg-[#101820] shadow-[0_28px_80px_-32px_rgba(0,0,0,0.7)]"
        initial={reduce ? false : { clipPath: "inset(14% 8% 14% 8% round 18px)", opacity: 0 }}
        animate={play ? { clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            Model Operasional
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-[1.125rem] leading-tight font-semibold tracking-[-0.02em] text-white">
              Kendali Ruang SOC
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-on-dark)]/25 bg-[var(--primary-on-dark)]/10 px-3 py-1 font-mono text-[9px] tracking-[0.12em] text-[var(--primary-on-dark)] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-on-dark)]" />
              Terkelola
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">
              Dari sumber ke tujuan
            </p>
            <p className="font-mono text-[9px] tracking-[0.14em] text-[var(--primary-on-dark)] uppercase">
              Alokasi dikendalikan ISLI
            </p>
          </div>

          <div className="relative mt-5 min-h-[330px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_43%,rgba(41,151,255,0.14),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] sm:min-h-[380px]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
            />

            <div className="absolute inset-x-5 top-5 flex items-start justify-between sm:inset-x-7 sm:top-7">
              <FlowNode step={flow[0]!} play={play} reduce={Boolean(reduce)} delay={0.15} />
              <FlowNode
                step={flow[1]!}
                play={play}
                reduce={Boolean(reduce)}
                delay={0.55}
                align="right"
              />
            </div>

            <svg
              aria-hidden
              viewBox="0 0 600 350"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <motion.path
                d="M88 82 C 120 150, 175 170, 242 184"
                fill="none"
                stroke="var(--primary-on-dark)"
                strokeWidth="1.5"
                strokeDasharray="3 8"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={play ? { pathLength: 1, opacity: 0.8 } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: 0.28 }}
              />
              <motion.path
                d="M358 184 C 425 170, 480 150, 512 82"
                fill="none"
                stroke="var(--primary-on-dark)"
                strokeWidth="1.5"
                strokeDasharray="3 8"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={play ? { pathLength: 1, opacity: 0.8 } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: 0.52 }}
              />
            </svg>

            <div className="absolute top-[38%] left-1/2 z-10 w-[58%] max-w-[320px] -translate-x-1/2">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
                animate={play ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-5 top-5 h-full rounded-xl border border-white/8 bg-[#0b1218] opacity-40"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-2.5 top-2.5 h-full rounded-xl border border-white/10 bg-[#111c25] opacity-70"
                />
                <div className="relative overflow-hidden rounded-xl border border-[var(--primary-on-dark)]/55 bg-[#17324a] shadow-[0_24px_60px_-20px_rgba(41,151,255,0.65)]">
                  <div className="flex items-center justify-between border-b border-white/12 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShippingContainer
                        aria-hidden
                        size={18}
                        className="text-[var(--primary-on-dark)]"
                      />
                      <span className="font-mono text-[9px] tracking-[0.13em] text-white/60 uppercase">
                        Unit SOC
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--primary-on-dark)] uppercase">
                      Dikelola ISLI
                    </span>
                  </div>
                  <div className="relative h-[92px] sm:h-[112px]">
                    <div className="absolute inset-y-0 inset-x-4 grid grid-cols-9">
                      {containerRibs.map((rib) => (
                        <motion.span
                          key={rib}
                          className="h-full w-px justify-self-center bg-white/12"
                          initial={reduce ? false : { scaleY: 0 }}
                          animate={play ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.45 + rib * 0.035 }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-y-4 left-4 w-px bg-white/25" />
                    <div className="absolute inset-y-4 right-4 w-px bg-white/25" />
                    <div className="absolute right-4 bottom-3 font-mono text-[8px] tracking-[0.15em] text-white/35 uppercase">
                      Ruang terjamin
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[var(--primary-on-dark)]"
                        animate={{ opacity: [0.7, 0], scale: [1, 2.4] }}
                        transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
                      />
                    )}
                    <span className="relative h-2 w-2 rounded-full bg-[var(--primary-on-dark)]" />
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.12em] text-white/45 uppercase">
                    Siap dialokasikan
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-5">
            {[
              ["Sumber", "Mitra pelayaran"],
              ["Kendali", "Satu meja ISLI"],
              ["Tujuan", "Distribusi domestik"],
            ].map(([label, value]) => (
              <div key={label} className="px-3 first:pl-0 last:pr-0">
                <p className="font-mono text-[8px] tracking-[0.12em] text-white/30 uppercase">
                  {label}
                </p>
                <p className="mt-1.5 text-[0.6875rem] leading-tight font-medium text-white/75 sm:text-[0.75rem]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// The proof cards live inside the narrative column, removing the dead space
// that a separate full-width list created beneath the two-column composition.
export function SocTile() {
  return (
    <section id="soc" className="bg-tile-dark scroll-mt-14 px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-stretch gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col">
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

            <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/10 sm:grid-cols-2">
              {socAdvantages.map((item, index) => (
                <Reveal key={item.title} delay={0.1 + index * 0.05} className="h-full">
                  <div className="group relative h-full min-h-[150px] overflow-hidden bg-[#1d1d1f] p-5 transition-colors duration-300 hover:bg-[#232326] sm:p-6">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--primary-on-dark)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--primary-on-dark)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[var(--primary-on-dark)]" />
                    </div>
                    <p className="mt-6 text-[0.9375rem] leading-[1.25] font-semibold tracking-[-0.018em] text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-[1.45] tracking-[-0.014em] text-white/45 transition-colors duration-300 group-hover:text-white/65">
                      {item.description}
                    </p>
                    <span className="pointer-events-none absolute -right-3 -bottom-6 font-mono text-[4.5rem] leading-none tracking-[-0.08em] text-white/[0.018] transition-colors duration-300 group-hover:text-white/[0.035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <SocControlPanel />
        </div>
      </div>
    </section>
  );
}
