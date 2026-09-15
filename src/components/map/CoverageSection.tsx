import { Suspense, lazy, useRef, useState } from "react";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PortList } from "@/components/map/PortList";
import { coverage, type TabId } from "@/data/ports";
import { headingLines } from "@/data/headings";

// The only lazy-loaded component on the site. The fallback below is exactly
// the same height as the loaded map, so arrival costs zero layout shift.
const CoverageMap = lazy(() => import("@/components/map/CoverageMap"));

const tabs: TabId[] = ["domestik", "internasional"];

// The real Leaflet map runs at every breakpoint, so there is no separate
// mobile figure anymore — the same map simply renders taller on small screens.
export function CoverageSection() {
  const [tab, setTab] = useState<TabId>("domestik");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

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
              {coverage[id].label}
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
              <figure className="mt-12">
                <Suspense
                  fallback={
                    <div className="aspect-[4/3] w-full rounded-[var(--radius-card)] bg-white md:aspect-[1000/420]" />
                  }
                >
                  <CoverageMap tab={id} />
                </Suspense>
              </figure>
            ) : null}
          </div>
        ))}

        <PortList />
      </div>
    </section>
  );
}
