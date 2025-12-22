"use client";

import { memo } from "react";
import BarChart from "../ui/charts/BarChart";

type BarChartData = { name: string; value: number }[];

type BarAreaSizeProps = {
  data: BarChartData;
};

const MARGIN = { top: 25, right: 30, left: -20, bottom: 5 } as const;

const BarAreaSize = ({ data }: BarAreaSizeProps) => {
  return (
    <BarChart
      data={data}
      layout="horizontal"
      margin={MARGIN}
      barSize={40}
      showTooltip={false}
      aria-label="Horizontal bar chart showing properties count by area size"
    />
  );
};

export default memo(BarAreaSize);
