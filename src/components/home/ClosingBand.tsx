import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { LineReveal } from "@/components/motion/LineReveal";
import { Button } from "@/components/ui/Button";
import { headingLines } from "@/data/headings";

// Sub-768px fallback: identical single-column composition, parallax is off
// below 1024px so the photograph simply sits still.
export function ClosingBand() {
  return (
    <section className="relative flex min-h-[72svh] items-center overflow-hidden">
      {/* Height is reserved by the section's min-h, so the image never shifts layout. */}
      <Parallax className="absolute inset-0" range={6}>
        <img
          src="/img/cta-port-night.jpg"
          width={1584}
          height={672}
          alt="Pelabuhan pada malam hari dengan siluet crane gantry dan pantulan cahaya di dermaga"
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-110 object-cover object-[center_70%]"
        />
      </Parallax>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.15)_45%,rgba(0,0,0,0.55))]" />

      <div className="relative mx-auto max-w-[760px] px-6 pb-24 text-center">
        <LineReveal
          as="h2"
          lines={headingLines.closing}
          className="text-foreground-on-dark text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
        />
        <Reveal delay={0.06} className="mt-12">
          <Button to="/kontak" hash="penawaran" variant="primaryLarge" arrow>
            Minta Penawaran
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
