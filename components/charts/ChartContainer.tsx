import type { ReactNode } from "react";

type ChartContainerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function ChartContainer({
  children,
  title,
  description,
  className = "",
}: ChartContainerProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-white p-5 shadow-card ${className}`}
    >
      {(title || description) ? (
        <div className="mb-5">
          {title ? (
            <h2 className="text-card-title text-text-primary">
              {title}
            </h2>
          ) : null}

          {description ? (
            <p className="text-secondary mt-1">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="w-full">
        {children}
      </div>
    </section>
  );
}