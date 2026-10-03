type TrendBadgeProps = {
  trend: "up" | "down" | "neutral";
  value: string;
  className?: string;
};

const trendClasses = {
  up: "bg-green/10 text-green",
  down: "bg-red/10 text-red",
  neutral: "bg-secondary text-text-secondary",
};

const trendSymbols = {
  up: "↑",
  down: "↓",
  neutral: "→",
};

export function TrendBadge({
  trend,
  value,
  className = "",
}: TrendBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-table font-semibold ${trendClasses[trend]} ${className}`}
    >
      <span aria-hidden="true">{trendSymbols[trend]}</span>
      <span>{value}</span>
    </span>
  );
}