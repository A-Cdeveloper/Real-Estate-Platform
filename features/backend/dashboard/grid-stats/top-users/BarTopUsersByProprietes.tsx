"use client";

import React, { memo } from "react";
import StackedBarChart from "../ui/charts/StackedBarChart";
import GridCard from "../shared/GridCard";
import { PropertyStatus } from "@prisma/client";
import { STATUS_COLORS } from "../shared/statusColors";

type TopUsersChartData = Array<{
  name: string;
  APPROVED: number;
  IN_REVIEW: number;
  REJECTED: number;
  INACTIVE: number;
  DELETED: number;
}>;

type TopUsersChartContentProps = {
  data: TopUsersChartData;
};

const STACK_KEYS: string[] = [
  PropertyStatus.APPROVED,
  PropertyStatus.IN_REVIEW,
  PropertyStatus.REJECTED,
  PropertyStatus.INACTIVE,
  PropertyStatus.DELETED,
];

const COLORS: string[] = [
  STATUS_COLORS[PropertyStatus.APPROVED],
  STATUS_COLORS[PropertyStatus.IN_REVIEW],
  STATUS_COLORS[PropertyStatus.REJECTED],
  STATUS_COLORS[PropertyStatus.INACTIVE],
  STATUS_COLORS[PropertyStatus.DELETED],
];

const MARGIN = { top: 20, right: 30, left: -20, bottom: 20 } as const;

const BarTopUsersByProprietes = ({ data }: TopUsersChartContentProps) => {
  return (
    <GridCard title="Top agents" className="max-h-[500px]">
      <StackedBarChart
        data={data}
        stackKeys={STACK_KEYS}
        colors={COLORS}
        height={350}
        margin={MARGIN}
        showLegend={true}
        showTooltip={false}
        aria-label="Stacked bar chart showing top 5 users by properties count grouped by status"
      />
    </GridCard>
  );
};

export default memo(BarTopUsersByProprietes);
