"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer } from "@/components/charts/ChartContainer";

type AreaChartData = {
  label: string;
  value: number;
};

type AreaChartProps = {
  data: AreaChartData[];
  title?: string;
  description?: string;
  height?: number;
  className?: string;
};

export function AreaChart({
  data,
  title,
  description,
  height = 280,
  className = "",
}: AreaChartProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: 0,
              bottom: 8,
            }}
          >
            <defs>
              <linearGradient
                id="area-chart-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.24}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#area-chart-gradient)"
              dot={false}
              activeDot={{
                r: 5,
              }}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}