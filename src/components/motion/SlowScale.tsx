import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";

/**
 * Hero image only. Time-based, runs once on mount, never bound to scroll.
 * One continuous move: a 1.6s settle from 1.12 to 1, handed off without a
 * reset to the slow 8s drift from 1 to 1.06.
 * Justification: storytelling, the frame settles as the page arrives.
 */
export function SlowScale({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const total = 9.6;

  return (
    <motion.div
      className={className}
      initial={{ scale: 1.12 }}
      animate={{ scale: [1.12, 1, 1.06] }}
      transition={{
        duration: total,
        times: [0, 1.6 / total, 1],
        ease: [
          [0.16, 1, 0.3, 1],
          [0.33, 0, 0.67, 1],
        ],
      }}
    >
      {children}
    </motion.div>
  );
}
