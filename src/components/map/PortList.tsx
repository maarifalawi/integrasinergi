import { HairlineRow } from "@/components/motion/HairlineRow";
import { charts } from "@/data/ports";

const rows = [
  {
    label: charts.domestik.label,
    body: "Seluruh kota di Indonesia",
  },
  {
    label: charts.internasional.label,
    body: "Seluruh negara di dunia",
  },
];

// Desktop only: on mobile the CoverageSection chart has its own figcaption,
// so this static two-row summary would just repeat it.
export function PortList() {
  return (
    // Hidden below md (see PortList docblock): figcaption carries it there.
    <div className="mt-12 hidden gap-12 md:grid md:grid-cols-2">
      {rows.map((row, index) => (
        <HairlineRow key={row.label} index={index} tone="dark">
          <div className="py-3">
            <p className="text-foreground-on-dark font-mono text-[0.9375rem] tracking-[0.02em]">
              {row.label}
            </p>
            <p className="text-muted-foreground-on-dark mt-1 text-[0.875rem] tracking-[-0.016em]">
              {row.body}
            </p>
          </div>
        </HairlineRow>
      ))}
    </div>
  );
}
