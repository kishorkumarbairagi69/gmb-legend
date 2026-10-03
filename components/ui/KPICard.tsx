import type { ReactNode } from "react";

type KPICardProps = {
  label: string;
  value: string;
  supportingText?: string;
  icon?: ReactNode;
  trend?: ReactNode;
  className?: string;
};

export function KPICard({
  label,
  value,
  supportingText,
  icon,
  trend,
  className = "",
}: KPICardProps) {
  return (
    <article
      className={`rounded-2xl border border-border bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-hover ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-secondary">{label}</p>

          <p className="text-kpi mt-2 text-text-primary">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            {icon}
          </div>
        ) : null}
      </div>

      {(supportingText || trend) ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          {supportingText ? (
            <p className="text-table text-text-secondary">
              {supportingText}
            </p>
          ) : (
            <span />
          )}

          {trend}
        </div>
      ) : null}
    </article>
  );
}