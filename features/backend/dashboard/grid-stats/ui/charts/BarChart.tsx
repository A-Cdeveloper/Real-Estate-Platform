"use client";

import { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type BarChartData =
  | { name: string; value: number }[]
  | Record<string, string | number>[];

type BarChartProps = {
  data: BarChartData;
  dataKey?: string;
  layout?: "horizontal" | "vertical";
  color?: string;
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
  xAxisKey?: string;
  yAxisKey?: string;
  showTooltip?: boolean;
  emptyMessage?: string;
  className?: string;
  barSize?: number;
  barRadius?: number | [number, number, number, number];
  "aria-label"?: string;
};

// Default color for bar chart
const DEFAULT_COLOR = "var(--chart-2)";

/**
 * Generic and flexible Bar Chart component
 * Supports both horizontal and vertical layouts
 * Can be customized with various props for different use cases
 */
const BarChart = ({
  data,
  dataKey = "value",
  layout = "vertical",
  color = DEFAULT_COLOR,
  height = 300,
  margin = { top: 5, right: 30, left: 0, bottom: 5 },
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  xAxisKey,
  yAxisKey,
  showTooltip = true,
  emptyMessage = "No data available",
  className,
  barSize,
  barRadius,
  "aria-label": ariaLabel,
}: BarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const isVertical = layout === "vertical";

  // Determine axis keys based on layout
  const xAxisDataKey = xAxisKey || (isVertical ? undefined : "name");
  const yAxisDataKey = yAxisKey || (isVertical ? "name" : undefined);

  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={margin}
        role="img"
        aria-label={ariaLabel || `Bar chart displaying ${layout} data`}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="1  1" stroke="var(--border)" />
        )}
        {showXAxis && (
          <XAxis
            type={isVertical ? "number" : "category"}
            dataKey={xAxisDataKey}
            fontSize={12}
            tickCount={data.length > 10 ? 10 : data.length}
            {...(isVertical ? {} : { width: 100, tickMargin: 10 })}
          />
        )}
        {showYAxis && (
          <YAxis
            type={isVertical ? "category" : "number"}
            dataKey={yAxisDataKey}
            interval={0}
            fontSize={12}
            {...(isVertical ? { width: 100 } : {})}
          />
        )}
        {showTooltip && <Tooltip />}
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={barRadius}
          label={
            isVertical
              ? { position: "right", fontSize: 12 }
              : { position: "top", fontSize: 12 }
          }
          {...(barSize ? { barSize } : {})}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default memo(BarChart);
