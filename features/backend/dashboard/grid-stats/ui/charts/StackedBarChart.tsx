"use client";

import React, { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

type StackedBarChartData = Record<string, string | number>[];

type StackedBarChartProps = {
  data: StackedBarChartData;
  stackKeys: string[]; // Keys for stacked bars (e.g., ["APPROVED", "IN_REVIEW", "REJECTED"])
  colors?: string[];
  height?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  emptyMessage?: string;
  className?: string;
  barSize?: number;
  "aria-label"?: string;
};

// Default colors for stacked bars
const DEFAULT_COLORS = [
  "var(--success)",
  "var(--warning)",
  "var(--destructive)",
  "var(--info)",
  "var(--muted-foreground)",
];

/**
 * Stacked Bar Chart component
 * Displays multiple data series as stacked bars
 * Based on Recharts Stacked Bar Chart example
 */
const StackedBarChart = ({
  data,
  stackKeys,
  colors = DEFAULT_COLORS,
  height = 300,
  margin = { top: 5, right: 30, left: 0, bottom: 5 },
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  emptyMessage = "No data available",
  className,
  barSize,
  "aria-label": ariaLabel,
}: StackedBarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsBarChart
        data={data}
        margin={margin}
        role="img"
        aria-label={ariaLabel || "Stacked bar chart"}
        barCategoryGap="20%"
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        )}
        {showXAxis && (
          <XAxis
            dataKey="name"
            fontSize={12}
            tickMargin={20}
            angle={-30}
            textAnchor="middle"
            height={80}
          />
        )}
        {showYAxis && <YAxis fontSize={12} />}
        {showTooltip && (
          <Tooltip
            contentStyle={{ fontSize: "12px", fontWeight: "semibold" }}
          />
        )}
        {showLegend && (
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            iconSize={12}
            formatter={(value) => (
              <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                {value}
              </span>
            )}
          />
        )}
        {stackKeys.map((key, index) => {
          return (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[index % colors.length]}
              isAnimationActive={false}
              {...(barSize ? { barSize } : {})}
            >
              {/* Show value label on each segment */}
              <LabelList
                dataKey={key}
                position="center"
                style={{
                  fontSize: "12px",
                  fill: "rgba(0, 0, 0, 0.8)",
                  fontWeight: "bold",
                }}
                formatter={(value: unknown) => {
                  const numValue = typeof value === "number" ? value : 0;
                  return numValue > 0 ? String(numValue) : "";
                }}
              />
            </Bar>
          );
        })}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default memo(StackedBarChart);
