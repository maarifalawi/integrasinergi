import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "@phosphor-icons/react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { CardDrift } from "@/components/motion/CardDrift";
import { services, type Service } from "@/data/services";
import { headingLines } from "@/data/headings";

// One shared vertical scroll listener still drives every card photo; each
// drifts at a slightly different speed so the row reads as depth.
const DRIFT_RANGES = [3, 5, 4];

function ServiceSlide({
  service,
  index,
  progress,
  className,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  className: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="group flex h-full flex-col">
        <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-chip)]">
          {/* Two separate transform layers, so none fights the other:
              CardDrift = vertical parallax, img = hover zoom on oversize. */}
          <CardDrift
            progress={progress}
            range={DRIFT_RANGES[index % DRIFT_RANGES.length] ?? 4}
            className="h-full w-full"
          >
            <img
              src={service.image}
              width={1200}
              height={896}
              alt={service.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full scale-[1.12] object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none motion-safe:group-hover:scale-[1.18] [@media(hover:none)]:group-hover:scale-[1.12]"
            />
          </CardDrift>
        </div>
        <p className="text-muted-foreground mt-5 font-mono text-[11px] tracking-[0.08em]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-foreground group-hover:text-primary mt-2 text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em] transition-colors duration-200">
          {service.name}
        </h3>
        <p className="text-muted-foreground mt-2 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
          {service.description}
        </p>
        <Link
          to="/layanan"
          hash={service.slug}
          className="text-primary group/link mt-4 inline-flex items-center gap-2 text-[1.0625rem] leading-[1.47] tracking-[-0.022em] transition-colors duration-200 hover:text-primary/80"
        >
          Selengkapnya
          <ArrowRight
            size={15}
            className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-1 motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

/** Touch / reduced-motion fallback: a plain swipeable strip with snap. */
function NativeStrip({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <div ref={ref} className={className}>
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((service, index) => (
          <ServiceSlide
            key={service.slug}
            service={service}
            index={index}
            progress={scrollYProgress}
            className="flex-[0_0_88%] snap-start sm:flex-[0_0_52%] lg:flex-[0_0_44%]"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Desktop (lg+): the row pins and slides sideways as the page scrolls —
 * vertical scroll distance becomes horizontal travel. The sticky run is as
 * long as the track's overflow, so the pace feels one-to-one. Under reduced
 * motion it falls back to the native swipeable row.
 */
function ScrollLinked() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSelected(Math.min(services.length - 1, Math.floor(v * services.length)));
  });

  if (reduce) {
    return (
      <Reveal className="hidden lg:block">
        <NativeStrip />
      </Reveal>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{
        height: distance > 0 ? `calc(100svh + ${distance}px)` : "300svh",
      }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* The frame clips at the 1200px grid, so cards never bleed to the
            screen edges. */}
        <div ref={viewportRef} className="mx-auto w-full max-w-[1200px] overflow-hidden">
          {/* px-16 inside the track: the first and last card never sit flush
              against the frame, and the travel distance (measured from
              scrollWidth) already includes this breathing room. */}
          <motion.div ref={trackRef} className="flex gap-6 px-16" style={{ x }}>
            {services.map((service, index) => (
              <ServiceSlide
                key={service.slug}
                service={service}
                index={index}
                progress={scrollYProgress}
                className="flex-[0_0_44%]"
              />
            ))}
          </motion.div>

          {/* Hairline progress: fills as the row travels sideways. */}
          <div className="bg-border mt-12 h-px w-full">
            <motion.div
              aria-hidden
              className="bg-primary h-px w-full origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="mt-6 flex items-center justify-between gap-6">
            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] tabular-nums">
              {String(selected + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.24em] uppercase">
              Scroll
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// The three services now travel sideways with the page scroll on lg+; below lg
// the same cards sit in a swipeable snap strip.
export function ServiceGrid() {
  return (
    <section className="bg-parchment px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto mb-16 max-w-[692px] text-center">
        <LineReveal
          as="h2"
          lines={headingLines.services}
          className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
        />
      </div>

      {/* -mx-6 lets the strip bleed to the screen edges; the inner px-6 keeps
          the first card aligned with the section gutter. */}
      <Reveal className="-mx-6 lg:hidden">
        <NativeStrip />
      </Reveal>
      <ScrollLinked />
    </section>
  );
}
