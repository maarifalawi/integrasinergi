import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { CurrentOperationDiagram } from "@/components/home/CurrentOperationDiagram";
import { socAdvantages } from "@/data/services";
import { headingLines } from "@/data/headings";

/** SOC operating model and the current-operation flow supplied by the client. */
export function SocTile() {
  return (
    <section id="soc" className="bg-tile-dark scroll-mt-14 px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="min-w-0">
            <LineReveal
              as="h2"
              lines={headingLines.soc}
              className="text-foreground-on-dark text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
            />
            <Reveal delay={0.06}>
              <p className="text-muted-foreground-on-dark mt-8 max-w-[560px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                Kami mengoperasikan kontainer milik mitra pelayaran internasional untuk menopang
                pergerakan domestik. Skema ini memberi ruang gerak yang tidak dimiliki forwarder
                yang bergantung penuh pada alokasi liner.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/10 sm:grid-cols-2">
            {socAdvantages.map((item, index) => (
              <Reveal key={item.title} delay={0.1 + index * 0.05} className="h-full">
                <div className="group relative h-full min-h-[150px] overflow-hidden bg-[#1d1d1f] p-5 transition-colors duration-300 hover:bg-[#232326] sm:p-6">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--primary-on-dark)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--primary-on-dark)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[var(--primary-on-dark)]" />
                  </div>
                  <p className="mt-6 text-[0.9375rem] leading-[1.25] font-semibold tracking-[-0.018em] text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-[1.45] tracking-[-0.014em] text-white/45 transition-colors duration-300 group-hover:text-white/65">
                    {item.description}
                  </p>
                  <span className="pointer-events-none absolute -right-3 -bottom-6 font-mono text-[4.5rem] leading-none tracking-[-0.08em] text-white/[0.018] transition-colors duration-300 group-hover:text-white/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <CurrentOperationDiagram />
        </div>
      </div>
    </section>
  );
}
