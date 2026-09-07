import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { headingLines } from "@/data/headings";
import { services } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

// Only three group business lines are confirmed by the company profile, so the
// right column is intentionally shorter. Nothing is invented to balance it.
const grup = ["International Trading", "Construction", "Transportation"];

// "Yang kami pegang" mirrors the services catalogue, so every row carries the
// slug of its anchor on /layanan and the whole row is a working link.
const columns: {
  title: string;
  tag: string;
  items: { label: string; slug: string | null }[];
}[] = [
  {
    title: "Yang kami pegang",
    tag: "LAYANAN",
    items: services.map((service) => ({
      label: service.name,
      slug: service.slug,
    })),
  },
  {
    title: "Yang grup sediakan",
    tag: "LINI GRUP",
    items: grup.map((label) => ({ label, slug: null })),
  },
];

/** Chip counter that ticks up from zero when the column header enters view. */
function CountUp({ value, delay, reduce }: { value: number; delay: number; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 0.9,
      ease: EASE,
      delay,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return <span ref={ref}>{display}</span>;
}

/**
 * One row of a scope column. Entrance: the hairline draws left to right, then
 * the row slides in from the left. Hover/focus: a padded white card sweeps up
 * (with lift shadow, so nothing sits flush against the edges), an accent bar
 * grows inside its left edge, the label shifts and an arrow lands top-right.
 * Rows with a slug are real links to the matching anchor on /layanan.
 */
function ScopeRow({
  label,
  index,
  delay,
  reduce,
  slug,
}: {
  label: string;
  index: number;
  delay: number;
  reduce: boolean;
  slug: string | null;
}) {
  const inner = (
    <>
      {/* hover card: padded on all sides so the sweep never clips the text */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 rounded-xl bg-white transition-all duration-300 ease-out group-hover:scale-y-100 group-hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.22)] group-focus-within:scale-y-100 group-focus-within:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.22)]"
      />
      {/* accent bar floating inside the card's left edge */}
      <span
        aria-hidden
        className="bg-primary absolute top-2.5 bottom-2.5 left-0 w-[3px] origin-top scale-y-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
      />
      <span className="text-muted-foreground group-hover:text-primary group-focus-within:text-primary relative font-mono text-[11px] tracking-[0.08em] transition-colors duration-300">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-foreground group-hover:text-primary group-focus-within:text-primary relative text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em] transition-all duration-300 ease-out group-hover:translate-x-1.5 group-focus-within:translate-x-1.5">
        {label}
      </span>
      {slug !== null && (
        <ArrowUpRight
          aria-hidden
          size={16}
          weight="bold"
          className="text-primary relative ml-auto translate-y-1 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        />
      )}
    </>
  );

  const rowClass = "relative -mx-3 flex items-center gap-4 px-3 py-4 outline-none sm:-mx-4 sm:px-4";

  return (
    <div className="group relative">
      <motion.div
        aria-hidden
        className="bg-border h-px w-full origin-left"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      />
      <motion.div
        className="relative"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE, delay: delay + 0.08 }}
      >
        {slug !== null ? (
          <Link
            to="/layanan"
            hash={slug}
            className={`${rowClass} transition-transform duration-150 ease-out active:scale-[0.99]`}
          >
            {inner}
          </Link>
        ) : (
          <div className={rowClass}>{inner}</div>
        )}
      </motion.div>
    </div>
  );
}

// Sub-768px fallback: the two columns stack, "Yang kami pegang" first.
export function ScopeSplit() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.pegang}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div className="relative mt-16 grid gap-16 lg:grid-cols-2">
          {/* Centre divider draws itself top to bottom on wide screens. */}
          <motion.div
            aria-hidden
            className="bg-border absolute top-0 left-1/2 hidden h-full w-px origin-top lg:block"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />

          {columns.map((column, columnIndex) => (
            <div key={column.title}>
              <motion.div
                className="flex items-baseline justify-between gap-4"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                  delay: columnIndex * 0.15,
                }}
              >
                <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
                  {column.title}
                </p>
                <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em]">
                  <CountUp
                    value={column.items.length}
                    delay={columnIndex * 0.15 + 0.3}
                    reduce={reduce ?? false}
                  />{" "}
                  {column.tag}
                </span>
              </motion.div>

              <div className="mt-4">
                {column.items.map((item, index) => (
                  <ScopeRow
                    key={item.label}
                    label={item.label}
                    slug={item.slug}
                    index={index}
                    delay={columnIndex * 0.15 + index * 0.08}
                    reduce={reduce ?? false}
                  />
                ))}
                {/* closing hairline under the last row */}
                <motion.div
                  aria-hidden
                  className="bg-border h-px w-full origin-left"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: columnIndex * 0.15 + column.items.length * 0.08,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
