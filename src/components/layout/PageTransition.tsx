import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/** 180ms opacity cross-fade on the outlet. Justification: state transition. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
