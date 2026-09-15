import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LineReveal } from "@/components/motion/LineReveal";
import { Button } from "@/components/ui/Button";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Shipping routes drifting across the aerial photograph (1440×620 space).
const ROUTES = [
  "M-20 470 C 300 380, 700 340, 1060 410 S 1380 350, 1460 330",
  "M-20 520 C 360 470, 820 430, 1220 490 S 1420 450, 1460 440",
  "M260 -20 C 420 160, 900 60, 1180 200 S 1380 120, 1460 90",
];

// Hub dots pulsing where the routes pass over the yard.
const HUBS = [
  { x: 520, y: 455 },
  { x: 1060, y: 410 },
  { x: 1180, y: 200 },
];

/**
 * Ambient route layer over the hero photograph: dashed lanes drift along
 * their own length forever while hub dots pulse. Decorative, aria-hidden,
 * and never rendered under reduced motion.
 */
function RoutesOverlay() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {ROUTES.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="white"
          strokeOpacity={0.4}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="1 10"
          vectorEffect="non-scaling-stroke"
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={{ strokeDashoffset: -220, opacity: 1 }}
          transition={{
            strokeDashoffset: {
              duration: 14 + index * 5,
              ease: "linear",
              repeat: Infinity,
            },
            opacity: { duration: 1.2, ease: EASE, delay: 1 + index * 0.3 },
          }}
        />
      ))}
      {HUBS.map((hub, index) => (
        <motion.circle
          key={`${hub.x}-${hub.y}`}
          cx={hub.x}
          cy={hub.y}
          r={4}
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.3, 0.9], scale: [1, 1.6, 1] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1.6 + index * 0.7,
          }}
          style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
        />
      ))}
    </svg>
  );
}

/** Tiny mono cue with a dot travelling down a hairline, on loop. */
function ScrollCue({ delay }: { delay: number }) {
  return (
    <motion.div
      aria-hidden
      className="mt-16 flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <span className="font-mono text-[10px] tracking-[0.24em] text-white/80">SCROLL</span>
      <span className="relative h-10 w-px overflow-hidden bg-white/30">
        <motion.span
          className="bg-primary absolute top-0 left-0 h-3 w-px"
          animate={{ y: [-12, 40] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        />
      </span>
    </motion.div>
  );
}

// The supplied artwork fills the opening hero, with a darker text-side overlay.
export function Hero() {
  const reduce = useReducedMotion();

  const up = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section id="beranda" className="bg-tile-dark relative isolate overflow-hidden">
      <img
        src="/img/home.png"
        width={2934}
        height={1600}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center] md:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,16,32,0.86)_0%,rgba(3,16,32,0.72)_45%,rgba(3,16,32,0.18)_100%)]"
      />
      {!reduce && <RoutesOverlay />}
      <div className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-[1200px] flex-col justify-center px-6 py-20 md:px-10 md:py-24 lg:min-h-[min(900px,calc(100svh-3rem))]">
        <LineReveal
          as="h1"
          onMount
          lines={headingLines.heroH1}
          className="max-w-[16ch] text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white"
        />
        <motion.p
          className="mt-8 max-w-[560px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] text-white/90"
          {...(reduce
            ? {
                initial: false as const,
                animate: { opacity: 1, y: 0, filter: "none" },
                transition: { duration: 0 },
              }
            : {
                initial: { opacity: 0, y: 20, filter: "blur(8px)" },
                animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                transition: { duration: 1, ease: EASE, delay: 0.45 },
              })}
        >
          Akses langsung ke jaringan pelayaran global. Melayani ekspor, impor, dan domestik melalui
          FCL, LCL, Air Freight, dan Inland.
        </motion.p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <motion.div {...up(0.65)}>
            <Button to="/kontak" hash="penawaran" variant="primaryLarge" arrow>
              Minta Penawaran
            </Button>
          </motion.div>
          <motion.div {...up(0.78)}>
            <Button to="/layanan" variant="secondaryOnDark" arrow>
              Lihat Layanan
            </Button>
          </motion.div>
        </div>
        {!reduce && <ScrollCue delay={1.3} />}
      </div>
    </section>
  );
}
