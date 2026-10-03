type HeatmapData = {
  row: string;
  column: string;
  value: number;
};

type HeatmapProps = {
  data: HeatmapData[];
  rows: string[];
  columns: string[];
  title?: string;
  description?: string;
  className?: string;
};

function getCellIntensity(value: number, min: number, max: number) {
  if (max === min) {
    return 0.5;
  }

  return (value - min) / (max - min);
}

function getCellBackground(intensity: number) {
  if (intensity >= 0.8) {
    return "var(--primary)";
  }

  if (intensity >= 0.6) {
    return "var(--primary-dark)";
  }

  if (intensity >= 0.4) {
    return "var(--primary-light)";
  }

  if (intensity >= 0.2) {
    return "var(--secondary)";
  }

  return "var(--card)";
}

function getCellTextColor(intensity: number) {
  return intensity >= 0.6
    ? "white"
    : "var(--text-primary)";
}

export function Heatmap({
  data,
  rows,
  columns,
  title,
  description,
  className = "",
}: HeatmapProps) {
  const values = data.map((item) => item.value);
  const min = values.length > 0 ? Math.min(...values) : 0;
  const max = values.length > 0 ? Math.max(...values) : 0;

  const lookup = new Map(
    data.map((item) => [`${item.row}::${item.column}`, item.value]),
  );

  return (
    <section
      className={`rounded-2xl border border-border bg-white p-5 shadow-card ${className}`}
    >
      {title || description ? (
        <div className="mb-5">
          {title ? (
            <h2 className="text-card-title text-text-primary">{title}</h2>
          ) : null}

          {description ? (
            <p className="text-secondary mt-1">{description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <div
          className="grid min-w-[520px]"
          style={{
            gridTemplateColumns: `minmax(120px, 1.4fr) repeat(${columns.length}, minmax(64px, 1fr))`,
          }}
        >
          <div className="border-b border-border px-3 py-2 text-table font-semibold text-text-secondary">
            Location
          </div>

          {columns.map((column) => (
            <div
              key={column}
              className="border-b border-border px-2 py-2 text-center text-table font-semibold text-text-secondary"
            >
              {column}
            </div>
          ))}

          {rows.map((row) => (
            <div key={row} className="contents">
              <div className="border-b border-border px-3 py-3 text-table font-medium text-text-primary">
                {row}
              </div>

              {columns.map((column) => {
                const value = lookup.get(`${row}::${column}`) ?? 0;
                const intensity = getCellIntensity(value, min, max);

                return (
                  <div
                    key={`${row}-${column}`}
                    className="border-b border-l border-border p-1"
                  >
                    <div
                      className="flex min-h-11 items-center justify-center rounded-lg text-table font-semibold transition-shadow duration-150 hover:shadow-hover"
                      style={{
                        background: getCellBackground(intensity),
                        color: getCellTextColor(intensity),
                      }}
                      title={`${row} — ${column}: ${value}`}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}