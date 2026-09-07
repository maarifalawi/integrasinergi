import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PortList } from "@/components/map/PortList";
import { charts, type TabId } from "@/data/ports";
import { headingLines } from "@/data/headings";

// The only lazy-loaded component on the site. The fallback below is exactly
// the same height as the loaded chart, so arrival costs zero layout shift.
const CoverageMap = lazy(() => import("@/components/map/CoverageMap"));

const tabs: TabId[] = ["domestik", "internasional"];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Same arc math as CoverageMap, kept separate so the mobile figure never
 *  pulls in the GSAP bundle. */
function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const bow = len * 0.16 * (ny > 0 ? -1 : 1);
  return `M ${x1} ${y1} Q ${mx + nx * bow} ${my + ny * bow} ${x2} ${y2}`;
}

const mobileCaption: Record<TabId, string> = {
  domestik: "Seluruh kota di Indonesia",
  internasional: "Seluruh negara di dunia",
};

/**
 * Sub-768px figure: the same chart data as the desktop GSAP map, drawn as a
 * static SVG so switching tabs actually changes what is on screen. Remounts
 * per tab (key), so every switch fades the new chart in. No GSAP is loaded.
 */
function MobileChart({ tab }: { tab: TabId }) {
  const reduce = useReducedMotion();
  const chart = charts[tab];
  const origin = chart.origin;

  return (
    <motion.figure
      key={tab}
      className="mt-12"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="relative aspect-[1000/420] w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--tile-dark-2)]">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Peta jaringan ${chart.label} secara umum, bukan daftar lengkap rute`}
        >
          <line
            x1={0}
            y1={chart.equatorY}
            x2={chart.width}
            y2={chart.equatorY}
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="4 6"
          />
          {chart.nodes.map((point, index) => (
            <path
              key={`r${index}`}
              d={arc(origin.x, origin.y, point.x, point.y)}
              stroke="var(--primary-on-dark)"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              opacity={0.55}
            />
          ))}
          {chart.nodes.map((point, index) => (
            <circle
              key={`d${index}`}
              cx={point.x}
              cy={point.y}
              r={9}
              fill="rgba(255,255,255,0.85)"
            />
          ))}
          <circle cx={origin.x} cy={origin.y} r={16} fill="var(--primary-on-dark)" />
        </svg>
      </div>
      <figcaption className="mt-5">
        <p className="text-foreground-on-dark font-mono text-[0.9375rem] tracking-[0.02em]">
          {chart.label}
        </p>
        <p className="text-muted-foreground-on-dark mt-1 text-[0.875rem] tracking-[-0.016em]">
          {mobileCaption[tab]}
        </p>
      </figcaption>
    </motion.figure>
  );
}

// Sub-768px fallback: a static SVG chart (MobileChart) replaces the GSAP map;
// the tabs switch real content there instead of only restyling the buttons.
export function CoverageSection() {
  const [tab, setTab] = useState<TabId>("domestik");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  // Below 768px the chart is never mounted, so its bundle and its GSAP work
  // never run there. The mono port list carries the same information.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
    setTab(tabs[next]!);
    buttons.current[next]?.focus();
  };

  return (
    <section className="bg-tile-dark px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <LineReveal
          as="h2"
          lines={headingLines.coverage}
          className="text-foreground-on-dark max-w-[692px] text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
        />

        <Reveal delay={0.06}>
          <p className="text-muted-foreground-on-dark mt-8 max-w-[620px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
            Visual di bawah menggambarkan jaringan koneksi secara umum. Domestik menjangkau seluruh
            kota di Indonesia, dan ekspor–impor terbuka ke semua negara.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Cakupan pelabuhan"
          className="mt-12 inline-flex gap-1 rounded-full bg-white/8 p-1"
        >
          {tabs.map((id, index) => (
            <button
              key={id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              tabIndex={tab === id ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`inline-flex min-h-[44px] items-center rounded-full px-[22px] text-[0.875rem] tracking-[-0.016em] transition-colors duration-150 ${
                tab === id ? "text-tile-dark bg-white" : "text-white/60 hover:text-white"
              }`}
            >
              {charts[id].label}
            </button>
          ))}
        </div>

        {tabs.map((id) => (
          <div
            key={id}
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={tab !== id}
          >
            {tab === id ? (
              wide ? (
                <figure className="mt-12">
                  <Suspense
                    fallback={
                      <div className="aspect-[1000/420] w-full rounded-[var(--radius-card)] bg-[var(--tile-dark-2)]" />
                    }
                  >
                    <CoverageMap tab={id} />
                  </Suspense>
                </figure>
              ) : (
                <MobileChart tab={id} />
              )
            ) : null}
          </div>
        ))}

        <PortList />
      </div>
    </section>
  );
}
