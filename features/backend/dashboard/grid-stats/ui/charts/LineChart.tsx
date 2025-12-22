"use client";

import React, { memo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type LineChartData =
  | { name: string; value: number }[]
  | Record<string, string | number>[];

type LineChartProps = {
  data: LineChartData;
  dataKey?: string;
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
  showTooltip?: boolean;
  tooltipContent?: React.ComponentType<TooltipProps<number, string>>;
  tooltipContentStyle?: React.CSSProperties;
  emptyMessage?: string;
  className?: string;
  strokeWidth?: number;
  dot?: boolean;
  "aria-label"?: string;
};

// Default color for line chart
const DEFAULT_COLOR = "var(--primary)";

/**
 * Generic and flexible Line Chart component
 * Can be customized with various props for different use cases
 */
const LineChart = ({
  data,
  dataKey = "value",
  color = DEFAULT_COLOR,
  height = 300,
  margin = { top: 5, right: 30, left: 0, bottom: 5 },
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  xAxisKey,
  showTooltip = true,
  tooltipContent,
  tooltipContentStyle,
  emptyMessage = "No data available",
  className,
  strokeWidth = 2,
  dot = false,
  "aria-label": ariaLabel,
}: LineChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const xAxisDataKey = xAxisKey || "name";

  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsLineChart
        data={data}
        margin={margin}
        role="img"
        aria-label={ariaLabel || "Line chart displaying data over time"}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        )}
        {showXAxis && (
          <XAxis
            dataKey={xAxisDataKey}
            fontSize={12}
            tickMargin={10}
            angle={-45}
            textAnchor="end"
            height={80}
          />
        )}
        {showYAxis && <YAxis fontSize={12} />}
        {showTooltip && (
          <Tooltip
            // @ts-expect-error - recharts Tooltip content prop type is not fully compatible with React.ComponentType
            content={tooltipContent}
            contentStyle={
              tooltipContentStyle || {
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "8px 12px",
              }
            }
          />
        )}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={strokeWidth}
          dot={dot}
          isAnimationActive={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default memo(LineChart);
