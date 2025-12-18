"use client";

import React, { memo } from "react";
import PieChart from "./charts/PieChart";

type PieChartData = { name: string; value: number }[];

type PieProprietesStatusProps = {
  data: PieChartData;
};

const PieProprietesStatus = ({ data }: PieProprietesStatusProps) => {
  return (
    <PieChart
      data={data}
      cx="45%"
      cy="50%"
      labelLine={true}
      label={({ name, percent, value }) =>
        `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`
      }
      labelStyle={{
        fontSize: "12px",
        fontWeight: "700",
        transform: "translate(5px, 5px)",
      }}
      aria-label="Pie chart showing property status distribution"
    />
  );
};

export default memo(PieProprietesStatus);
