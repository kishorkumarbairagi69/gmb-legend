"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
} from "recharts";

type SparklineData = {
  value: number;
};

type SparklineProps = {
  data: SparklineData[];
  width?: number;
  height?: number;
  className?: string;
};

export function Sparkline({
  data,
  width = 120,
  height = 40,
  className = "",
}: SparklineProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 4,
            right: 2,
            left: 2,
            bottom: 4,
          }}
        >
          <defs>
            <linearGradient
              id="sparkline-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#sparkline-gradient)"
            dot={false}
            activeDot={false}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}