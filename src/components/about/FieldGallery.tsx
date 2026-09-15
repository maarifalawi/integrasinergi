import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { CardDrift } from "@/components/motion/CardDrift";
import { FieldLightbox } from "@/components/about/FieldLightbox";
import { galleryPhotos, type GalleryPhoto } from "@/data/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;
const PHOTO_WIDTH = 1080;
const PHOTO_HEIGHT = 1350;

// One shared vertical scroll listener still drives every frame; each photo
// drifts at a slightly different speed so the rail reads as depth.
const DRIFT_RANGES = [3, 5, 4];

type OpenHandler = (index: number, trigger: HTMLButtonElement | null) => void;

/**
 * One frame of the rail. Three transform layers, so none fights the other:
 * the aspect box clips a curtain open, CardDrift carries the vertical
 * parallax, and the image keeps a hover zoom on its oversize.
 */
function GallerySlide({
  photo,
  index,
  progress,
  onOpen,
  className,
}: {
  photo: GalleryPhoto;
  index: number;
  progress: MotionValue<number>;
  onOpen: OpenHandler;
  className: string;
}) {
  const reduce = useReducedMotion();

  return (
    <figure className={`min-w-0 ${className}`}>
      <button
        type="button"
        onClick={(event) => onOpen(index, event.currentTarget)}
        aria-label={`Perbesar foto: ${photo.title}`}
        className="group block w-full text-left"
      >
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]"
          initial={reduce ? false : { clipPath: "inset(12% 8% 12% 8% round 18px)", opacity: 0 }}
          animate={reduce ? { clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 } : false}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduce ? 0 : 1.05, ease: EASE, delay: reduce ? 0 : index * 0.06 }}
        >
          <CardDrift
            progress={progress}
            range={DRIFT_RANGES[index % DRIFT_RANGES.length] ?? 4}
            className="h-full w-full"
          >
            {/* Lazy like ServiceGrid: the rail travels a full frame before a
                photo enters the clip, which is more lead time than the browser
                needs. The oversize covers the drift and the hover zoom. */}
            <img
              src={photo.src}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full scale-[1.12] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none motion-safe:group-hover:scale-[1.16] [@media(hover:none)]:group-hover:scale-[1.12]"
            />
          </CardDrift>
          <div className="pointer-events-none absolute right-5 bottom-5 sm:right-6 sm:bottom-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight aria-hidden size={15} />
            </span>
          </div>
        </motion.div>
      </button>
      <figcaption className="text-muted-foreground-on-dark mt-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] sm:text-xs">
        {photo.meta}
      </figcaption>
    </figure>
  );
}

/** Touch / reduced-motion fallback: a plain swipeable strip with snap. */
function NativeStrip({ className, onOpen }: { className?: string; onOpen: OpenHandler }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={className}>
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {galleryPhotos.map((photo, index) => (
          <GallerySlide
            key={photo.src}
            photo={photo}
            index={index}
            progress={scrollYProgress}
            onOpen={onOpen}
            className="flex-[0_0_78%] snap-start sm:flex-[0_0_46%] lg:flex-[0_0_32%]"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Desktop (lg+): the rail pins and travels sideways as the page scrolls —
 * vertical scroll distance becomes horizontal travel. The sticky run is as
 * long as the track's overflow, so the pace feels one-to-one. Under reduced
 * motion it falls back to the native swipeable row.
 */
function ScrollLinkedRail({ onOpen }: { onOpen: OpenHandler }) {
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
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSelected(Math.min(galleryPhotos.length - 1, Math.floor(v * galleryPhotos.length)));
  });

  if (reduce) {
    return (
      <Reveal className="mt-12 hidden lg:block">
        <NativeStrip onOpen={onOpen} />
      </Reveal>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative mt-16 hidden lg:block"
      // The sticky run is exactly as tall as the track's overflow, so one
      // pixel of vertical scroll buys one pixel of horizontal travel.
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div ref={viewportRef} className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* The left padding mirrors the centered header above (max-w-1200 +
            px-10), so the first frame starts exactly under the heading. The
            mask fades frames out at both edges instead of hard-clipping
            them. Frames leave room for a single activity caption below. */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex gap-8 pr-10 pl-[max(2.5rem,calc((100vw-75rem)/2_+_2.5rem))] will-change-transform [mask-image:linear-gradient(to_right,transparent,black_4rem,calc(100%_-_3rem),transparent)]"
        >
          {galleryPhotos.map((photo, index) => (
            <GallerySlide
              key={photo.src}
              photo={photo}
              index={index}
              progress={scrollYProgress}
              onOpen={onOpen}
              className="flex-[0_0_48svh] xl:flex-[0_0_52svh]"
            />
          ))}
        </motion.div>

        {/* The counter is navigation, not a per-photo documentation label. */}
        <div className="absolute inset-x-10 bottom-8">
          <div className="flex justify-end">
            <p className="text-muted-foreground-on-dark shrink-0 font-mono text-[11px] tracking-[0.14em] tabular-nums">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(galleryPhotos.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-4 h-px bg-white/10">
            <motion.div
              className="h-full origin-left bg-[var(--primary-on-dark)]"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Field gallery — the dark section between Timeline and OfficeSection. Touch
 * and reduced motion get the swipeable strip; desktop gets the scroll-linked
 * rail. The gallery owns the lightbox state and the trigger ref, so closing
 * the viewer hands focus back to the exact thumbnail that opened it.
 */
export function FieldGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = useCallback<OpenHandler>((index, trigger) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const handleNavigate = useCallback((next: number) => {
    setOpenIndex(next);
  }, []);

  return (
    // overflow-x-clip (not hidden) so the sticky rail inside keeps working.
    <section
      id="dokumentasi"
      aria-labelledby="dokumentasi-title"
      className="bg-tile-dark overflow-x-clip py-16 md:py-[7.5rem]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="border-t border-white/10 pt-8">
          <Reveal>
            <h2
              id="dokumentasi-title"
              className="text-foreground-on-dark text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.025em]"
            >
              Dokumentasi Operasional
            </h2>
            <p className="text-muted-foreground-on-dark mt-4 text-[0.9375rem]">
              Sumber: Dokumentasi
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 lg:hidden">
        <NativeStrip onOpen={handleOpen} />
      </div>
      <ScrollLinkedRail onOpen={handleOpen} />

      <FieldLightbox index={openIndex} onClose={handleClose} onNavigate={handleNavigate} />
    </section>
  );
}
