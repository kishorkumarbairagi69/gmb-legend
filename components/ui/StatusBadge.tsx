type StatusBadgeProps = {
  status: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
};

const statusClasses = {
  success: "bg-green/10 text-green",
  warning: "bg-orange/10 text-orange",
  error: "bg-red/10 text-red",
  info: "bg-blue/10 text-blue",
  neutral: "bg-secondary text-text-secondary",
};

export function StatusBadge({
  status,
  children,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-table font-semibold ${statusClasses[status]} ${className}`}
    >
      {children}
    </span>
  );
}