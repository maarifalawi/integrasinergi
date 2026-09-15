import { HairlineRow } from "@/components/motion/HairlineRow";
import { coverage } from "@/data/ports";

const rows = [
  {
    label: coverage.domestik.label,
    body: "Seluruh kota di Indonesia",
  },
  {
    label: coverage.internasional.label,
    body: "Seluruh negara di dunia",
  },
];

// Two-row summary under the map. Visible at every breakpoint: the real map
// carries no figcaption, so this is the only textual recap of the scope.
export function PortList() {
  return (
    <div className="mt-12 grid gap-12 md:grid-cols-2">
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
