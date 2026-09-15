import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Scroll-linked drift for photos inside the service cards. The parent owns a
 * single useScroll and shares its progress; each card passes a slightly
 * different range so the photos drift at different speeds and the grid reads
 * as depth. Spring-damped like Parallax, disabled below 1024px and under
 * reduced motion. The child image must be oversized (e.g. scale-[1.12]) so
 * the drift never exposes the frame edges.
 */
export function CardDrift({
  progress,
  range = 4,
  children,
  className,
}: {
  progress: MotionValue<number>;
  /** drift amplitude in percent of the element height, each direction */
  range?: number;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const raw = useTransform(progress, [0, 1], [`-${range}%`, `${range}%`]);
  const y = useSpring(raw, { stiffness: 100, damping: 30, mass: 0.5 });

  const active = wide && !reduce;

  return (
    <motion.div
      className={className}
      {...(active ? { style: { y } } : {})}
      // will-change is only set while the drift is actually live.
      {...(active ? { "data-parallax": "on" } : {})}
    >
      {children}
    </motion.div>
  );
}
