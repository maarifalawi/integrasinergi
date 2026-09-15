import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { ScopeList } from "@/components/services/ScopeList";
import { FclLcl } from "@/components/services/FclLcl";
import { services, type Service, type ServiceSlug } from "@/data/services";
import { serviceScopes } from "@/data/serviceScopes";

const EASE = [0.16, 1, 0.3, 1] as const;

const bySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<
  ServiceSlug,
  Service
>;

// Mono eyebrow per block: catalogue number (mirrors the hero index) + mode.
const tags: Record<ServiceSlug, string> = {
  "sea-freight": "LAUT",
  "air-freight": "UDARA",
  inland: "DARAT",
};

const indexOf = (slug: ServiceSlug) =>
  String(services.findIndex((service) => service.slug === slug) + 1).padStart(2, "0");

/** Photograph: a clipped frame opens while the image settles out of a zoom,
 *  then keeps a slow hover zoom afterwards. All motion is off under reduced
 *  motion — same treatment as the SOC photograph on the home page. */
function Photo({ service, number }: { service: Service; number: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="group/photo relative aspect-[4/3] min-h-0 overflow-hidden bg-tile-dark lg:aspect-auto lg:h-full"
      initial={reduce ? false : { clipPath: "inset(8% 5% 8% 5% round 18px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
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
          className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/photo:scale-[1.045]"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.58)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white sm:p-7">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/70 uppercase">
            Moda Pengiriman
          </p>
          <p className="mt-1.5 text-[1.0625rem] leading-none font-semibold tracking-[-0.02em]">
            {tags[service.slug]}
          </p>
        </div>
        <p className="font-mono text-[2rem] leading-none tracking-[-0.06em] text-white/85 tabular-nums sm:text-[2.5rem]">
          {number}
        </p>
      </div>
    </motion.div>
  );
}

function Heading({ service, number }: { service: Service; number: string }) {
  const Title = service.slug === "sea-freight" ? "h1" : "h2";
  return (
    <>
      <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
        <span aria-hidden className="bg-primary h-px w-8" />
        Layanan {number} · {tags[service.slug]}
      </p>
      <Title className="text-foreground mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]">
        {service.name}
      </Title>
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
      className="group/cta border-border text-foreground hover:border-primary hover:text-primary mt-8 flex min-h-[56px] w-full items-center justify-between gap-4 border-t pt-5 text-[0.9375rem] leading-[1.43] font-semibold tracking-[-0.016em] transition-colors duration-300"
    >
      Minta penawaran untuk layanan ini
      <ArrowUpRight
        aria-hidden
        size={16}
        weight="bold"
        className="text-primary transition-transform duration-300 ease-out group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
      />
    </Link>
  );
}

// scroll-mt keeps the eyebrow clear of the transparent nav on anchor jumps.
const section = "scroll-mt-10 px-6 py-16 md:px-10 md:py-[7.5rem]";

type ServiceOverviewProps = {
  slug: ServiceSlug;
  imageSide?: "left" | "right";
};

/**
 * Shared overview for all three service lines. Mobile keeps a stable 4:3
 * photograph; on desktop the grid row is content-driven and the photograph
 * stretches with it, so longer scope lists never leave an empty lower half.
 */
function ServiceOverview({ slug, imageSide = "right" }: ServiceOverviewProps) {
  const service = bySlug[slug];
  const scopes = serviceScopes[slug]!;
  const number = indexOf(slug);
  const contentOrder = imageSide === "left" ? "lg:order-last" : "lg:order-first";
  const imageOrder = imageSide === "left" ? "lg:order-first" : "lg:order-last";
  const panelSurface = slug === "air-freight" ? "bg-background" : "bg-pearl";

  return (
    <div
      className={`border-border relative isolate overflow-hidden rounded-[var(--radius-card)] border ${panelSurface}`}
    >
      <span aria-hidden className="bg-primary absolute inset-x-0 top-0 z-10 h-[3px]" />
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          className={`order-last flex min-w-0 flex-col p-6 sm:p-8 lg:p-10 xl:p-12 ${contentOrder}`}
        >
          <Reveal>
            <Heading service={service} number={number} />
          </Reveal>

          <Reveal delay={0.06} className="mt-10 md:mt-12">
            <div className="border-border flex items-center justify-between gap-4 border-b pb-3">
              <p className="text-muted-foreground font-mono text-[10px] tracking-[0.16em] uppercase">
                Cakupan Layanan
              </p>
              <p className="text-muted-foreground font-mono text-[10px] tracking-[0.08em] tabular-nums uppercase">
                {String(scopes.length).padStart(2, "0")} Cakupan
              </p>
            </div>
            <ScopeList items={scopes} numbered />
            <BlockCta />
          </Reveal>
        </div>

        <div className={`order-first min-h-0 ${imageOrder}`}>
          <Photo service={service} number={number} />
        </div>
      </div>
    </div>
  );
}

export function SeaFreightBlock() {
  return (
    <section id="sea-freight" className={`bg-background ${section}`}>
      <div className="mx-auto max-w-[1200px]">
        <ServiceOverview slug="sea-freight" />
        <FclLcl />
      </div>
    </section>
  );
}

export function AirFreightBlock() {
  return (
    <section id="air-freight" className={`bg-parchment ${section}`}>
      <div className="mx-auto max-w-[1200px]">
        <ServiceOverview slug="air-freight" imageSide="left" />
      </div>
    </section>
  );
}

export function InlandBlock() {
  return (
    <section id="inland" className={`bg-background ${section}`}>
      <div className="mx-auto max-w-[1200px]">
        <ServiceOverview slug="inland" />
      </div>
    </section>
  );
}
