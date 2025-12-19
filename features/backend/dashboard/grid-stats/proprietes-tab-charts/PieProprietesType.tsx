"use client";

import React, { memo, useCallback } from "react";
import PieChart from "../ui/charts/PieChart";

type PieChartData = { name: string; value: number }[];

type PieProprietesTypeProps = {
  data: PieChartData;
};

const PieProprietesType = ({ data }: PieProprietesTypeProps) => {
  const labelFormatter = useCallback(
    ({ name, percent }: { name?: string; percent?: number }) =>
      `${name}: ${((percent || 0) * 100).toFixed(0)}%`,
    []
  );

  return (
    <PieChart
      data={data}
      cx="50%"
      cy="50%"
      label={labelFormatter}
      aria-label="Pie chart showing property type distribution"
    />
  );
};

export default memo(PieProprietesType);
