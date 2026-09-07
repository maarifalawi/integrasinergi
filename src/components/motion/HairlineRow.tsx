import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One row of a divide-y list. The hairline draws left to right with scaleX
 * while the row content reveals upward, both staggered by row index.
 */
export function HairlineRow({
  children,
  index = 0,
  className,
  tone = "light",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  /** hairline colour context: on dark surfaces or on light ones */
  tone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  const delay = index * 0.08;
  const line = tone === "dark" ? "bg-white/10" : "bg-[var(--border-soft)]";

  if (reduce) {
    return (
      <div className={className}>
        <div className={`h-px w-full ${line}`} />
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        className={`h-px w-full origin-left ${line}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
