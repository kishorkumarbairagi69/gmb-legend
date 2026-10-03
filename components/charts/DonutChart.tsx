"use client";

import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer } from "@/components/charts/ChartContainer";

type DonutChartData = {
  label: string;
  value: number;
};

type DonutChartProps = {
  data: DonutChartData[];
  title?: string;
  description?: string;
  height?: number;
  className?: string;
};

const segmentColors = [
  "var(--primary)",
  "var(--blue)",
  "var(--green)",
  "var(--orange)",
  "var(--pink)",
  "var(--cyan)",
];

export function DonutChart({
  data,
  title,
  description,
  height = 280,
  className = "",
}: DonutChartProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="78%"
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`${entry.label}-${index}`}
                  fill={segmentColors[index % segmentColors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                background: "var(--card)",
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}