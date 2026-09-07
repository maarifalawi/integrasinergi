import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Flat card. Hairline only, never a shadow. Inner imagery uses --radius-chip. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-background border-border rounded-[var(--radius-card)] border p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
