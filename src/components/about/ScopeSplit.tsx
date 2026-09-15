import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { headingLines } from "@/data/headings";
import { services } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One row of the services list. Entrance: the hairline draws left to right,
 * then the row slides in from the left. Hover/focus: a padded white card
 * sweeps up (with lift shadow, so nothing sits flush against the edges), an
 * accent bar grows inside its left edge, the label shifts and an arrow lands
 * top-right. The whole row is a working link to its anchor on /layanan.
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
  slug: string;
}) {
  const num = String(index + 1).padStart(2, "0");

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
      <span
        className="text-muted-foreground group-hover:text-primary group-focus-within:text-primary relative font-mono text-[11px] tracking-[0.08em] transition-colors duration-300"
        children={num}
      />
      <span
        className="text-foreground group-hover:text-primary group-focus-within:text-primary relative text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em] transition-all duration-300 ease-out group-hover:translate-x-1.5 group-focus-within:translate-x-1.5"
        children={label}
      />
      <span
        className="text-muted-foreground relative ml-auto hidden font-mono text-[11px] tracking-[0.1em] uppercase sm:inline"
        children={"Domestik · Ekspor · Impor"}
      />
      <ArrowUpRight
        aria-hidden
        size={16}
        weight="bold"
        className="text-primary relative translate-y-1 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:ml-4"
      />
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
        <Link
          to="/layanan"
          hash={slug}
          className={`${rowClass} transition-transform duration-150 ease-out active:scale-[0.99]`}
          children={inner}
        />
      </motion.div>
    </div>
  );
}

// Sub-768px fallback: the rows stack full-width, the route note hides.
export function ScopeSplit() {
  const reduce = useReducedMotion();

  const rows = services.map((service, index) => (
    <ScopeRow
      key={service.slug}
      label={service.name}
      slug={service.slug}
      index={index}
      delay={index * 0.08}
      reduce={reduce ?? false}
    />
  ));

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

        <div className="mt-16">
          {rows}
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
              delay: services.length * 0.08,
            }}
          />
        </div>
      </div>
    </section>
  );
}
