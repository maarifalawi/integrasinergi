import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { services } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

// Only numbers the company profile actually supports. Nothing inflated.
const grupLines = 3; // International Trading, Construction, Transportation

const stats: { value: number; label: string; caption: string }[] = [
  {
    value: 2024,
    label: "TAHUN BERDIRI",
    caption: "Muda di kertas, di atas grup yang lebih tua.",
  },
  {
    value: services.length,
    label: "LINI LAYANAN",
    caption: "Laut, udara, dan darat.",
  },
  {
    value: grupLines,
    label: "LINI GRUP",
    caption: "Trading, konstruksi, dan transportasi.",
  },
  {
    value: 1,
    label: "PENANGGUNG JAWAB",
    caption: "Satu tim commercial dari awal sampai akhir.",
  },
];

/** Number that ticks up from zero when the band enters view. */
function CountUp({ value, delay, reduce }: { value: number; delay: number; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: EASE,
      delay,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

// Sub-768px fallback: two columns, the drawing hairlines stay.
export function TrustBar() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-pearl px-6 py-12 md:px-10 md:py-20">
      <h2 className="sr-only">Fakta singkat ISLI</h2>
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative">
            {/* hairline draws left to right above every stat */}
            <motion.div
              aria-hidden
              className="bg-border h-px w-full origin-left"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
            />
            <motion.div
              className="pt-6"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: index * 0.08 + 0.1,
              }}
            >
              <p className="text-foreground text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.03em]">
                <CountUp value={stat.value} delay={index * 0.08 + 0.2} reduce={reduce ?? false} />
              </p>
              <p className="text-muted-foreground mt-3 font-mono text-[11px] tracking-[0.14em] uppercase">
                {stat.label}
              </p>
              <p className="text-muted-foreground mt-2 text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                {stat.caption}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
