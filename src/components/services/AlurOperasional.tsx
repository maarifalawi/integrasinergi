import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { operationalStages } from "@/data/serviceScopes";
import { headingLines } from "@/data/headings";

// Sub-768px fallback: each row stacks number, title, and body in one column.
export function AlurOperasional() {
  return (
    <section id="alur" className="bg-parchment scroll-mt-20 px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.alur}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
          <Reveal delay={0.06}>
            <p className="text-muted-foreground mt-8 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
              Dari penarikan kontainer kosong sampai rotasi berikutnya, satu tim memegang seluruh
              tahap. Anda selalu tahu siapa yang bertanggung jawab di setiap titik.
            </p>
          </Reveal>
        </div>

        <div className="divide-border mt-16 divide-y">
          {operationalStages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 0.06}>
              <div className="group relative -mx-3 px-3 sm:-mx-4 sm:px-4">
                {/* hover card: padded on all sides so the sweep never clips */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 rounded-xl bg-white transition-all duration-300 ease-out group-hover:scale-y-100 group-hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.22)]"
                />
                {/* accent bar floating inside the card's left edge */}
                <span
                  aria-hidden
                  className="bg-primary absolute top-2.5 bottom-2.5 left-0 w-[3px] origin-top scale-y-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-y-100"
                />

                <div className="relative grid items-baseline gap-2 py-8 lg:grid-cols-[64px_minmax(0,280px)_1fr] lg:gap-10">
                  <p className="text-primary font-mono text-[11px] tracking-[0.08em]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-foreground text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em] transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    {stage.title}
                  </h3>
                  <p className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                    {stage.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
