import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * The only entrance animation on the site. Justification: hierarchy, it lets
 * the eye arrive at one block at a time instead of the whole tile at once.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as as "div"] ?? motion.div;

  if (reduce) {
    return (
      <Component initial={false} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.24, 1], delay }}
    >
      {children}
    </Component>
  );
}
