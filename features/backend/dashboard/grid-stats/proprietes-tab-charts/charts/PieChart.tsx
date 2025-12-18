"use client";

import React, { memo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PieChartData = { name: string; value: number }[];

type PieChartProps = {
  data: PieChartData;
  colors?: string[];
  height?: number;
  outerRadius?: number;
  innerRadius?: number;
  cx?: string;
  cy?: string;
  labelLine?: boolean;
  label?: (props: {
    name?: string;
    percent?: number;
    value?: number;
  }) => string | React.ReactNode;
  showTooltip?: boolean;
  labelStyle?: React.CSSProperties;
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
};

// Default colors using CSS variables - vibrant and distinct colors for pie chart
const DEFAULT_COLORS = [
  "var(--primary)",
  "var(--success)",
  "var(--muted-foreground)",
  "var(--destructive)",
  "var(--warning)",
  "var(--secondary)",
];

/**
 * Generic and flexible Pie Chart component
 * Can be customized with various props for different use cases
 */
const PieChart = ({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
  outerRadius = 80,
  innerRadius = 0,
  cx = "50%",
  cy = "50%",
  labelLine = true,
  label,
  showTooltip = true,
  labelStyle,
  emptyMessage = "No data available",
  className,
  "aria-label": ariaLabel,
}: PieChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  // Default label formatter if not provided
  const defaultLabel = ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`;

  const labelFormatter = label || defaultLabel;

  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsPieChart
        role="img"
        aria-label={ariaLabel || "Pie chart displaying data distribution"}
      >
        {labelStyle && (
          <style>
            {`
              .recharts-pie-label-text {
                ${Object.entries(labelStyle)
                  .map(([key, value]) => {
                    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return `${cssKey}: ${value} !important;`;
                  })
                  .join("\n                ")}
              }
            `}
          </style>
        )}
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          labelLine={labelLine}
          label={labelFormatter}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default memo(PieChart);
