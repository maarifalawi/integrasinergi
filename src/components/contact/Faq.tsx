import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Plus } from "@phosphor-icons/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { commercialContact } from "@/data/contacts";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    q: "Apakah ISLI menangani ekspor dan impor sekaligus?",
    a: "Ya. Kami menangani ekspor, impor, dan distribusi domestik, termasuk dokumen dan operasi di pelabuhan muat maupun pelabuhan bongkar.",
  },
  {
    q: "Apa itu skema SOC dan apa untungnya bagi saya?",
    a: "SOC berarti kontainer yang kami operasikan berasal dari mitra pelayaran, bukan alokasi biasa. Dampaknya, ketersediaan lebih terjaga dan struktur tarif bisa lebih kompetitif.",
  },
  {
    q: "Berapa lama proses penawaran?",
    a: "Waktu penyusunan penawaran bergantung pada rincian kargo, rute, dan ketersediaan layanan. Hubungi Commercial Dept. untuk tindak lanjut permintaan Anda.",
  },
  {
    q: "Apakah ISLI melayani pengiriman domestik antar pulau?",
    a: "Ya. Ketiga lini kami melayani rute domestik: sea freight (FCL dan LCL), air freight, dan inland untuk distribusi antar kota dan antar pulau.",
  },
];

const email = commercialContact.email;

// Sub-768px fallback: one column already, only the gutters tighten.
export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-parchment px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.faq}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div className="divide-border mt-16 max-w-[860px] divide-y">
          {items.map((item, index) => {
            const isOpen = open === index;

            const panel = isOpen ? (
              <motion.div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                className="overflow-hidden"
                {...(reduce
                  ? { initial: false as const }
                  : {
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: { duration: 0.4, ease: EASE },
                    })}
              >
                <p
                  className="text-muted-foreground max-w-[692px] pb-6 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]"
                  children={item.a}
                />
              </motion.div>
            ) : null;

            return (
              <Reveal key={item.q} delay={index * 0.05}>
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex min-h-[44px] w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className="text-foreground group-hover:text-primary text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em] transition-colors duration-200"
                      children={item.q}
                    />
                    <Plus
                      size={18}
                      aria-hidden="true"
                      className="text-muted-foreground shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false} children={panel} />
              </Reveal>
            );
          })}
        </div>

        {/* Exit for anyone whose question is not on the list. */}
        <Reveal delay={0.1}>
          <p
            className="text-muted-foreground mt-10 max-w-[860px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]"
            children={[
              "Pertanyaan lain? ",
              <a
                key="faq-email"
                href={`mailto:${email}`}
                className="text-primary transition-opacity duration-200 hover:opacity-75"
                children="Tanya langsung lewat email"
              />,
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
