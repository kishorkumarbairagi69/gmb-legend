import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function MetricCard({
  label,
  value,
  description,
  icon,
  className = "",
}: MetricCardProps) {
  return (
    <article
      className={`rounded-2xl border border-border bg-white p-5 shadow-card ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-text-secondary">
            {icon}
          </div>
        ) : null}

        <div className="min-w-0">
          <p className="text-secondary">
            {label}
          </p>

          <p className="text-card-title mt-2 text-text-primary">
            {value}
          </p>

          {description ? (
            <p className="text-table mt-1 text-text-secondary">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}