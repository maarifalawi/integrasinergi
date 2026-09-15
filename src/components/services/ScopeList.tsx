type ScopeListProps = {
  items: string[];
  columns?: 1 | 2;
  numbered?: boolean;
};

export function ScopeList({ items, columns = 1, numbered = false }: ScopeListProps) {
  if (columns === 2) {
    const half = Math.ceil(items.length / 2);
    return (
      <div className="grid gap-x-12 md:grid-cols-2">
        {[items.slice(0, half), items.slice(half)].map((column, index) => (
          <ul key={index} className="divide-border divide-y">
            {column.map((item) => (
              <li
                key={item}
                className="text-foreground py-4 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }

  return (
    <ul className="divide-border divide-y">
      {items.map((item, index) => (
        <li
          key={item}
          className={
            numbered
              ? "group/scope grid grid-cols-[28px_1fr] items-start gap-3 py-3.5"
              : "text-foreground py-4 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]"
          }
        >
          {numbered ? (
            <>
              <span className="text-primary pt-0.5 font-mono text-[10px] tracking-[0.08em] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground text-[1rem] leading-[1.35] font-semibold tracking-[-0.02em] transition-transform duration-300 ease-out group-hover/scope:translate-x-1">
                {item}
              </span>
            </>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}
