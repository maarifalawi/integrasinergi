import { motion, useReducedMotion } from "motion/react";
import { SlowScale } from "@/components/motion/SlowScale";
import { Parallax } from "@/components/motion/Parallax";
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
      <span className="text-muted-foreground font-mono text-[10px] tracking-[0.24em]">SCROLL</span>
      <span className="bg-border relative h-10 w-px overflow-hidden">
        <motion.span
          className="bg-primary absolute top-0 left-0 h-3 w-px"
          animate={{ y: [-12, 40] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        />
      </span>
    </motion.div>
  );
}

// Sub-768px fallback: one column, and the photograph switches from a wide
// 21:9 band to a 4:5 crop because the wide crop loses the yard at 390px.
export function Hero() {
  const reduce = useReducedMotion();

  const up = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-20">
        {reduce ? (
          <h1 className="text-foreground max-w-[16ch] text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            {headingLines.heroH1.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        ) : (
          // Hand-rolled line masks (same timing as LineReveal) so the second
          // line can carry an underline that draws itself under the key phrase.
          <h1 className="text-foreground max-w-[16ch] text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            <span className="block overflow-hidden pb-[0.08em] [margin-bottom:-0.08em]">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.25, ease: EASE }}
              >
                {headingLines.heroH1[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] [margin-bottom:-0.08em]">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.25, ease: EASE, delay: 0.11 }}
              >
                Kami yang{" "}
                <span className="relative inline-block">
                  Menjamin Ruangnya
                  <motion.svg
                    aria-hidden
                    className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-full"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M1 6 C 30 2, 65 2, 99 5"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
                    />
                  </motion.svg>
                </span>
                .
              </motion.span>
            </span>
          </h1>
        )}
        <motion.p
          className="text-muted-foreground mt-8 max-w-[560px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20, filter: "blur(8px)" },
                animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                transition: { duration: 1, ease: EASE, delay: 0.45 },
              })}
        >
          Akses langsung ke jaringan pelayaran global. Kontainer tersedia saat rute lain penuh.
        </motion.p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <motion.div {...up(0.65)}>
            <Button to="/kontak" hash="penawaran" variant="primaryLarge" arrow>
              Minta Penawaran
            </Button>
          </motion.div>
          <motion.div {...up(0.78)}>
            <Button to="/layanan" variant="secondary" arrow>
              Lihat Layanan
            </Button>
          </motion.div>
        </div>
        {!reduce && <ScrollCue delay={1.3} />}
      </div>

      {/* Height is reserved by the aspect-ratio wrapper, so nothing shifts. */}
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[21/9]"
        initial={reduce ? false : { clipPath: "inset(6% 3% 6% 3%)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
      >
        <Parallax className="h-full w-full" range={6}>
          <SlowScale className="h-full w-full">
            <img
              src="/img/hero-container-yard.jpg"
              width={1584}
              height={672}
              alt="Terminal kontainer dilihat dari udara, deretan kontainer tersusun sampai ke dermaga"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full scale-110 object-cover object-[center_60%]"
            />
          </SlowScale>
        </Parallax>
        {!reduce && <RoutesOverlay />}
      </motion.div>
    </section>
  );
}
