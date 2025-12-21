"use client";

import React, { useMemo, useState } from "react";
import GridCard from "../shared/GridCard";
import BarPriceRange from "./BarPriceRange";
import BarAreaSize from "./BarAreaSize";
import TabsButtons from "../ui/tabs/TabsButtons";
import TabsContent from "../ui/tabs/TabsContent";

type ChartData = { name: string; value: number }[];

type ProprietesRangeTabsProps = {
  priceData: ChartData;
  areaData: ChartData;
};

const TABS = [
  { value: "price", label: "Price range" },
  { value: "area", label: "Area size" },
] as const;

const ProprietesRangeTabs = ({
  priceData,
  areaData,
}: ProprietesRangeTabsProps) => {
  const [activeTab, setActiveTab] = useState<"price" | "area">("price");

  const tabsContent = useMemo(
    () => [
      {
        value: "price" as const,
        content: <BarPriceRange data={priceData} />,
      },
      {
        value: "area" as const,
        content: <BarAreaSize data={areaData} />,
      },
    ],
    [priceData, areaData]
  );

  return (
    <GridCard
      title="Properties by"
      className="max-h-[500px]"
      headerExtra={
        <TabsButtons
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
    >
      <TabsContent activeTab={activeTab} tabs={tabsContent} />
    </GridCard>
  );
};

export default ProprietesRangeTabs;
