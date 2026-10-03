type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100),
  );

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) ? (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label ? (
            <span className="text-table font-medium text-text-primary">
              {label}
            </span>
          ) : (
            <span />
          )}

          {showValue ? (
            <span className="text-table text-text-secondary">
              {Math.round(percentage)}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}