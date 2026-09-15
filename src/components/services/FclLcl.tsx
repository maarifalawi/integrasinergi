import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";

// The two ways a sea container is booked. The cards lead directly with each
// mode's definition so clients can compare them without an introductory layer.
const modes: { name: string; body: string; analogy: string; advantage: string }[] = [
  {
    name: "FCL — Full Container Load",
    body: "Anda menyewa satu kontainer penuh secara eksklusif hanya untuk barang Anda sendiri. Kontainer disegel dari pabrik Anda dan baru dibuka saat sampai di tujuan.",
    analogy:
      "Ibaratnya memesan taksi sendiri: Anda membayar penuh satu mobil, terserah mau diisi penuh atau hanya duduk sendiri.",
    advantage:
      "Pengiriman lebih cepat dan barang jauh lebih aman, karena kontainer tidak dibongkar-muat di tengah jalan atau dicampur dengan barang orang lain.",
  },
  {
    name: "LCL — Less than Container Load",
    body: "Volume barang Anda terlalu sedikit untuk menyewa satu kontainer penuh, sehingga barang digabungkan (dikonsolidasi) dengan barang milik pengirim lain ke dalam satu kontainer yang sama.",
    analogy:
      "Ibaratnya naik angkot atau bus kota: Anda berbagi ruang dengan penumpang lain dan hanya membayar kursi (ruang) yang Anda tempati.",
    advantage:
      "Jauh lebih murah untuk pengiriman skala kecil. Prosesnya lebih lambat karena pihak logistik perlu mengumpulkan barang dari banyak pengirim sebelum kapal berangkat, lalu memilahnya kembali saat tiba.",
  },
];

const rows: { feature: string; fcl: string; lcl: string }[] = [
  {
    feature: "Volume Barang",
    fcl: "Besar (biasanya di atas 15 CBM)",
    lcl: "Kecil (biasanya di bawah 15 CBM)",
  },
  {
    feature: "Biaya",
    fcl: "Bayar flat harga 1 kontainer",
    lcl: "Bayar per meter kubik (CBM) yang dipakai",
  },
  {
    feature: "Kecepatan",
    fcl: "Cepat (langsung masuk kapal)",
    lcl: "Lambat (ada proses gabung dan pisah barang)",
  },
  {
    feature: "Keamanan",
    fcl: "Sangat aman (segel utuh)",
    lcl: "Rentan lecet/tertukar (sering dibongkar muat)",
  },
];

const thClass =
  "text-muted-foreground py-4 pr-6 font-mono text-[11px] font-normal tracking-[0.14em] uppercase whitespace-nowrap";

/** FCL vs LCL primer at the foot of the Sea Freight block: two definition
 *  cards, then the full comparison table. */
export function FclLcl() {
  return (
    <div className="border-border mt-20 border-t pt-16 md:mt-24 md:pt-20">
      <Reveal>
        <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
          <span aria-hidden className="bg-primary h-px w-8" />
          FCL atau LCL
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {modes.map((mode, index) => (
          <Reveal key={mode.name} delay={index * 0.08} className="h-full">
            <Card className="group relative h-full overflow-hidden p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.18)] sm:p-8">
              <span
                aria-hidden
                className="bg-primary absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-foreground text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em]">
                  {mode.name}
                </h3>
                <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-muted-foreground mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                {mode.body}
              </p>
              <p className="border-border text-foreground mt-6 border-l-2 pl-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                {mode.analogy}
              </p>
              <p className="text-muted-foreground mt-6 text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                <span className="text-foreground font-semibold">Kelebihan: </span>
                {mode.advantage}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={0.1}
        className="border-border bg-background mt-12 overflow-x-auto rounded-[var(--radius-card)] border px-6 sm:px-8"
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-border border-b">
              <th className={thClass}>Fitur</th>
              <th className={thClass}>FCL (Full Container Load)</th>
              <th className={`${thClass} pr-0`}>LCL (Less than Container Load)</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {rows.map((row) => (
              <tr
                key={row.feature}
                className="transition-colors duration-200 hover:bg-parchment/70"
              >
                <th
                  scope="row"
                  className="text-foreground py-4 pr-6 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em] whitespace-nowrap"
                >
                  {row.feature}
                </th>
                <td className="text-muted-foreground py-4 pr-6 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                  {row.fcl}
                </td>
                <td className="text-muted-foreground py-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                  {row.lcl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </div>
  );
}
