"use client";

import React, { memo } from "react";
import BarChart from "./charts/BarChart";

type BarChartData = { name: string; value: number }[];

type BarProprietesLocationProps = {
  data: BarChartData;
};

const MARGIN = { top: 5, right: 30, left: -10, bottom: 5 } as const;

const BarProprietesLocation = ({ data }: BarProprietesLocationProps) => {
  return (
    <BarChart
      data={data}
      layout="vertical"
      margin={MARGIN}
      barSize={30}
      showTooltip={false}
      aria-label="Horizontal bar chart showing top property locations"
    />
  );
};

export default memo(BarProprietesLocation);
