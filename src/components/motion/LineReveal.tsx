import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRef, type ElementType } from "react";

type LineRevealProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** run on mount instead of on scroll into view */
  onMount?: boolean;
  delay?: number;
};

const EASE = [0.22, 1, 0.24, 1] as const;

/**
 * Line mask reveal. Each visual line sits in its own overflow-hidden wrapper
 * and its inner span travels from y 100% to 0. Lines are broken by hand in the
 * data file, never split programmatically.
 */
export function LineReveal({
  lines,
  as = "h2",
  className,
  onMount = false,
  delay = 0,
}: LineRevealProps) {
  const reduce = useReducedMotion();
  const Component = (motion[as as "h2"] ?? motion.h2) as typeof motion.h2;
  // The inner span starts fully outside its overflow-hidden mask, so an
  // IntersectionObserver placed on the span itself never intersects. The
  // heading element is observed instead.
  const rootRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2 });
  const play = onMount || inView;

  if (reduce) {
    return (
      <Component className={className}>
        {lines.map((line, index) => (
          <span key={line + index} className="block">
            {line}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={rootRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={line + index}
          className="block overflow-hidden pb-[0.08em] [margin-bottom:-0.08em]"
        >
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: play ? "0%" : "100%" }}
            transition={{
              duration: 1.25,
              ease: EASE,
              delay: delay + index * 0.11,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
