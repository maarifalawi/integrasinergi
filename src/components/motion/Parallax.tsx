import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Spring-damped translateY within +/-6%. Justification: storytelling, the
 * closing photograph drifts slightly behind the page so the band reads as
 * depth rather than a pasted image. Disabled below 1024px and under reduced
 * motion. Maximum two instances per page.
 */
export function Parallax({
  children,
  className,
  range = 5,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  const y = useSpring(raw, { stiffness: 100, damping: 30, mass: 0.5 });

  const active = wide && !reduce;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        {...(active ? { style: { y } } : {})}
        // will-change is only set while the parallax is actually live.
        {...(active ? { "data-parallax": "on" } : {})}
      >
        {children}
      </motion.div>
    </div>
  );
}
