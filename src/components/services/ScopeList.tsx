export function ScopeList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
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
      {items.map((item) => (
        <li
          key={item}
          className="text-foreground py-4 text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
