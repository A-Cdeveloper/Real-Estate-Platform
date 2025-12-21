"use client";

import React, { memo } from "react";
import BarChart from "../ui/charts/BarChart";

type BarChartData = { name: string; value: number }[];

type BarPriceRangeProps = {
  data: BarChartData;
};

const MARGIN = { top: 25, right: 30, left: -20, bottom: 5 } as const;

const BarPriceRange = ({ data }: BarPriceRangeProps) => {
  return (
    <BarChart
      data={data}
      layout="horizontal"
      margin={MARGIN}
      barSize={40}
      showTooltip={false}
      aria-label="Horizontal bar chart showing properties count by price range"
    />
  );
};

export default memo(BarPriceRange);
