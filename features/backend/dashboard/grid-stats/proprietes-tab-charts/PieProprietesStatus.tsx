"use client";

import { memo, useCallback, useMemo } from "react";
import PieChart from "../ui/charts/PieChart";
import { getStatusColor } from "../shared/statusColors";
import { PropertyStatus } from "@prisma/client";

type PieChartData = { name: string; value: number }[];

type PieProprietesStatusProps = {
  data: PieChartData;
};

const LABEL_STYLE = {
  fontSize: "12px",
  fontWeight: "700",
  transform: "translate(5px, 5px)",
} as const;

const PieProprietesStatus = ({ data }: PieProprietesStatusProps) => {
  const labelFormatter = useCallback(
    ({
      name,
      percent,
      value,
    }: {
      name?: string;
      percent?: number;
      value?: number;
    }) => `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`,
    []
  );

  // Map colors based on status name - ensure same order as data
  const colors = useMemo(
    () =>
      data.map((item) => {
        const status = item.name as PropertyStatus;
        return getStatusColor(status);
      }),
    [data]
  );

  return (
    <PieChart
      data={data}
      colors={colors}
      cx="45%"
      cy="50%"
      labelLine={true}
      label={labelFormatter}
      labelStyle={LABEL_STYLE}
      aria-label="Pie chart showing property status distribution"
      showTooltip={false}
    />
  );
};

export default memo(PieProprietesStatus);
