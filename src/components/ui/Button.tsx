import { Link } from "@tanstack/react-router";
import { ArrowRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "primaryLarge" | "secondary" | "secondaryOnDark";

// One interaction system for every button on the site: a small lift, a soft
// tinted shadow, a press settle, and — when `arrow` is set — an arrow that
// slides in on hover. Nothing louder than that.
const base =
  "group/btn inline-flex items-center justify-center rounded-full min-h-[44px] whitespace-nowrap font-normal transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground px-[22px] py-[11px] text-[17px] hover:bg-primary/90 hover:shadow-[0_12px_30px_-10px_rgba(0,102,204,0.5)]",
  primaryLarge:
    "bg-primary text-primary-foreground px-8 py-4 text-[19px] hover:bg-primary/90 hover:shadow-[0_14px_36px_-10px_rgba(0,102,204,0.55)]",
  secondary:
    "border border-primary text-primary bg-transparent px-[22px] py-[11px] text-[17px] hover:bg-primary/[0.08] hover:shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)]",
  secondaryOnDark:
    "border border-white/30 text-foreground-on-dark bg-transparent px-[22px] py-[11px] text-[17px] hover:border-white/60 hover:bg-white/[0.10]",
};

export function Button({
  children,
  to,
  hash,
  variant = "primary",
  className,
  arrow = false,
}: {
  children: ReactNode;
  to: string;
  hash?: string;
  variant?: Variant;
  className?: string;
  /** reveal an arrow sliding in on hover */
  arrow?: boolean;
}) {
  return (
    <Link to={to} {...(hash ? { hash } : {})} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          size={16}
          weight="bold"
          className="w-0 -translate-x-1 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:ml-2 group-hover/btn:w-4 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
        />
      )}
    </Link>
  );
}
