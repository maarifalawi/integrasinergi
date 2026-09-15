import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

// Sets expectations right under the form, so submitting never feels like a
// black box. Every step mirrors the approved response-time copy.
const steps: { title: string; body: string }[] = [
  {
    title: "Detail masuk satu meja",
    body: "Rute, jenis barang, volume, dan jadwal diterima langsung oleh tim commercial.",
  },
  {
    title: "Rute dan ruang dicek",
    body: "Kami susun opsi jadwal dan alokasi kontainer yang paling cocok untuk kargo Anda.",
  },
  {
    title: "Penawaran kembali",
    body: "Pada hari kerja yang sama, penawaran sampai di email Anda.",
  },
];

// Sub-768px fallback: the three steps stack, the drawing hairlines stay.
export function ExpectSteps() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-pearl px-6 py-14 md:px-10 md:py-20">
      <h2 className="sr-only">Setelah Anda menekan kirim</h2>
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
            <span aria-hidden className="bg-primary h-px w-8" />
            Setelah Anda Menekan Kirim
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title}>
              {/* hairline draws left to right above every step */}
              <motion.div
                aria-hidden
                className="bg-border h-px w-full origin-left"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
              />
              <Reveal delay={index * 0.08 + 0.05}>
                <div className="pt-6">
                  <p className="text-primary font-mono text-[11px] tracking-[0.08em]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-foreground mt-3 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                    {step.title}
                  </p>
                  <p className="text-muted-foreground mt-2 text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
