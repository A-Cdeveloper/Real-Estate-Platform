"use client";

import React, { memo } from "react";
import PieChart from "./charts/PieChart";

type PieChartData = { name: string; value: number }[];

type PieProprietesTypeProps = {
  data: PieChartData;
};

const PieProprietesType = ({ data }: PieProprietesTypeProps) => {
  return (
    <PieChart
      data={data}
      cx="50%"
      cy="50%"
      label={({ name, percent }) =>
        `${name}: ${((percent || 0) * 100).toFixed(0)}%`
      }
      aria-label="Pie chart showing property type distribution"
    />
  );
};

export default memo(PieProprietesType);
