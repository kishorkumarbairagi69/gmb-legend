"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer } from "@/components/charts/ChartContainer";

type LineChartData = {
  label: string;
  value: number;
};

type LineChartProps = {
  data: LineChartData[];
  title?: string;
  description?: string;
  height?: number;
  className?: string;
};

export function LineChart({
  data,
  title,
  description,
  height = 280,
  className = "",
}: LineChartProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
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

            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}