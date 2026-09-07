import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { ScopeList } from "@/components/services/ScopeList";
import { services } from "@/data/services";
import { serviceScopes } from "@/data/serviceScopes";

const EASE = [0.16, 1, 0.3, 1] as const;

// Sub-768px fallback: every layout family below collapses to one column,
// asset first is preserved only where the asset already leads the block.

const byslug = Object.fromEntries(services.map((s) => [s.slug, s]));

// Mono eyebrow per block: catalogue number (mirrors the hero index) + mode.
const tags: Record<string, string> = {
  "sea-freight": "LAUT",
  "air-freight": "UDARA",
  "domestic-forwarding": "DOMESTIK",
  "project-cargo": "PROYEK",
  transportation: "DARAT",
};

const indexOf = (slug: string) =>
  String(services.findIndex((s) => s.slug === slug) + 1).padStart(2, "0");

/** Photograph: a clipped frame opens while the image settles out of a zoom,
 *  then keeps a slow hover zoom afterwards. All motion is off under reduced
 *  motion — same treatment as the SOC photograph on the home page. */
function Photo({ slug, ratio }: { slug: string; ratio: "4/3" | "21/9" | "16/9" }) {
  const service = byslug[slug]!;
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden rounded-[var(--radius-card)] ${
        ratio === "4/3" ? "aspect-[4/3]" : ratio === "21/9" ? "aspect-[21/9]" : "aspect-[16/9]"
      }`}
      initial={reduce ? false : { clipPath: "inset(8% 5% 8% 5% round 18px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.7, ease: EASE }}
      >
        <img
          src={service.image}
          width={1200}
          height={896}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] hover:scale-[1.05]"
        />
      </motion.div>
    </motion.div>
  );
}

function Heading({ slug }: { slug: string }) {
  const service = byslug[slug]!;
  return (
    <>
      <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
        <span aria-hidden className="bg-primary h-px w-8" />
        {indexOf(slug)} · {tags[slug]}
      </p>
      <h2 className="text-foreground mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]">
        {service.name}
      </h2>
      <p className="text-muted-foreground mt-6 max-w-[620px] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25]">
        {service.description}
      </p>
    </>
  );
}

/** Conversion exit at the bottom of every block, so a convinced reader never
 *  has to scroll back up to act. */
function BlockCta() {
  return (
    <Link
      to="/kontak"
      hash="penawaran"
      className="group/cta text-primary mt-10 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] leading-[1.43] tracking-[-0.016em] transition-opacity duration-200 hover:opacity-75"
    >
      Minta penawaran untuk layanan ini
      <ArrowUpRight
        aria-hidden
        size={16}
        weight="bold"
        className="transition-transform duration-300 ease-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
      />
    </Link>
  );
}

// scroll-mt keeps the eyebrow clear of the transparent nav on anchor jumps.
const section = "scroll-mt-10 px-6 py-16 md:px-10 md:py-[7.5rem]";

/** Family A: copy left, asset right. */
export function SeaFreightBlock() {
  return (
    <section id="sea-freight" className={`bg-background ${section}`}>
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <Heading slug="sea-freight" />
          </Reveal>
          <Reveal delay={0.06} className="mt-12">
            <ScopeList items={serviceScopes["sea-freight"]!} />
            <BlockCta />
          </Reveal>
        </div>
        <Photo slug="sea-freight" ratio="4/3" />
      </div>
    </section>
  );
}

/** Family B: wide asset above, copy in two columns below. */
export function AirFreightBlock() {
  return (
    <section id="air-freight" className={`bg-parchment ${section}`}>
      <div className="mx-auto max-w-[1200px]">
        <Photo slug="air-freight" ratio="21/9" />
        <div className="mt-16 grid items-start gap-16 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <Heading slug="air-freight" />
          </Reveal>
          <Reveal delay={0.12}>
            <ScopeList items={serviceScopes["air-freight"]!} />
            <BlockCta />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Family C: asset left, copy right. */
export function DomesticForwardingBlock() {
  return (
    <section id="domestic-forwarding" className={`bg-background ${section}`}>
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="order-last lg:order-first">
          <Photo slug="domestic-forwarding" ratio="4/3" />
        </div>
        <div>
          <Reveal>
            <Heading slug="domestic-forwarding" />
          </Reveal>
          <Reveal delay={0.06} className="mt-12">
            <ScopeList items={serviceScopes["domestic-forwarding"]!} />
            <BlockCta />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Family D: centred stack. */
export function ProjectCargoBlock() {
  return (
    <section id="project-cargo" className={`bg-parchment ${section}`}>
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-[692px] text-center">
          <Heading slug="project-cargo" />
        </Reveal>
        <div className="mt-16">
          <Photo slug="project-cargo" ratio="16/9" />
        </div>
        <Reveal delay={0.12} className="mt-16">
          <ScopeList items={serviceScopes["project-cargo"]!} columns={2} />
          <div className="text-center">
            <BlockCta />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Family E: three-column sub-grid, copy in column one. */
export function TransportationBlock() {
  return (
    <section id="transportation" className={`bg-background ${section}`}>
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 lg:grid-cols-3">
        <div>
          <Reveal>
            <Heading slug="transportation" />
          </Reveal>
          <Reveal delay={0.06} className="mt-12">
            <ScopeList items={serviceScopes["transportation"]!} />
            <BlockCta />
          </Reveal>
        </div>
        <div className="lg:col-span-2">
          <Photo slug="transportation" ratio="16/9" />
        </div>
      </div>
    </section>
  );
}
