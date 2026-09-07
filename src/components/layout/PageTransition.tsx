import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/** 180ms opacity cross-fade on the outlet. Justification: state transition. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
