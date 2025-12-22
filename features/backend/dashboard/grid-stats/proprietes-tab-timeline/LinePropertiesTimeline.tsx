"use client";

import { memo } from "react";
import LineChart from "../ui/charts/LineChart";

type TimelineData = Array<{ name: string; value: number; date: Date }>;

type LinePropertiesTimelineProps = {
  data: TimelineData;
};

const MARGIN = { top: 25, right: 30, left: -20, bottom: 0 } as const;

// Custom tooltip for timeline chart
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload?: TimelineData[0];
  }>;
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as TimelineData[0];
    const value = payload[0].value as number;
    const date = data.date;

    // Format date nicely
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="text-sm font-medium text-foreground">{formattedDate}</p>
        <p className="text-sm text-muted-foreground">
          Properties:{" "}
          <span className="font-semibold text-foreground">{value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const LinePropertiesTimeline = ({ data }: LinePropertiesTimelineProps) => {
  return (
    <LineChart
      data={data}
      margin={MARGIN}
      color="var(--primary)"
      strokeWidth={2}
      dot={false}
      showTooltip={true}
      tooltipContent={CustomTooltip}
      aria-label="Line chart showing properties added over time"
    />
  );
};

export default memo(LinePropertiesTimeline);
