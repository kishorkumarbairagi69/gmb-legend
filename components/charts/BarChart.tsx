"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer } from "@/components/charts/ChartContainer";

type BarChartData = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartData[];
  title?: string;
  description?: string;
  height?: number;
  className?: string;
};

export function BarChart({
  data,
  title,
  description,
  height = 280,
  className = "",
}: BarChartProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: 0,
              bottom: 8,
            }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={36}
              tick={{
                fill: "var(--text-secondary)",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                background: "var(--card)",
              }}
            />

            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}