import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/data/partners";

// Slim proof band between the service blocks and the coverage map: the
// partner names are the reason the SOC claim above them holds.
// Sub-768px fallback: label, caption, and name list stack in one column.
export function PartnerStrip() {
  return (
    <section className="bg-pearl px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-[420px]">
            <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span aria-hidden className="bg-primary h-px w-8" />
              Didukung Jaringan Pelayaran
            </p>
            <p className="text-foreground mt-5 text-[1.25rem] leading-[1.35] font-medium tracking-[-0.022em]">
              Alokasi ruang langsung dari pelayaran mitra, bukan lewat perantara.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:max-w-[640px]">
            <ul className="flex flex-wrap justify-center gap-y-6 sm:justify-start lg:justify-end">
              {partners.map((brand) => (
                <li
                  key={brand.slug}
                  className="flex h-12 w-1/2 items-center justify-center px-4 sm:w-1/4"
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                      {brand.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
