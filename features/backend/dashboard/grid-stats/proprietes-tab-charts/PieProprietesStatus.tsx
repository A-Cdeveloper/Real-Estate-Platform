"use client";

import React, { memo, useCallback } from "react";
import PieChart from "./charts/PieChart";

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

  return (
    <PieChart
      data={data}
      cx="45%"
      cy="50%"
      labelLine={true}
      label={labelFormatter}
      labelStyle={LABEL_STYLE}
      aria-label="Pie chart showing property status distribution"
    />
  );
};

export default memo(PieProprietesStatus);
