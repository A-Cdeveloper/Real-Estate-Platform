"use client";

import React, { useState } from "react";
import GridCard from "../shared/GridCard";
import PieProprietesStatus from "./PieProprietesStatus";
import PieProprietesType from "./PieProprietesType";
import BarProprietesLocation from "./BarProprietesLocation";
import TabsButtons from "./tabs/TabsButtons";
import TabsContent from "./tabs/TabsContent";

type ChartData = { name: string; value: number }[];

type ProprietesChartsTabsProps = {
  statusData: ChartData;
  typeData: ChartData;
  locationData: ChartData;
};

const ProprietesChartsTabs = ({
  statusData,
  typeData,
  locationData,
}: ProprietesChartsTabsProps) => {
  const [activeTab, setActiveTab] = useState<"status" | "type" | "location">(
    "status"
  );

  const tabs = [
    { value: "status", label: "Status" },
    { value: "type", label: "Type" },
    { value: "location", label: "Top Locations" },
  ] as const;

  const tabsContent = [
    {
      value: "status" as const,
      content: <PieProprietesStatus data={statusData} />,
    },
    {
      value: "type" as const,
      content: <PieProprietesType data={typeData} />,
    },
    {
      value: "location" as const,
      content: <BarProprietesLocation data={locationData} />,
    },
  ];

  return (
    <GridCard
      title="Properties statistics"
      headerExtra={
        <TabsButtons
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
    >
      <TabsContent activeTab={activeTab} tabs={tabsContent} />
    </GridCard>
  );
};

export default ProprietesChartsTabs;
