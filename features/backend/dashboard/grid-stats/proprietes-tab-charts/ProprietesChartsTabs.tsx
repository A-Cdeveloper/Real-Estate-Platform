"use client";

import { useMemo, useState } from "react";
import GridCard from "../shared/GridCard";
import PieProprietesStatus from "./PieProprietesStatus";
import PieProprietesType from "./PieProprietesType";
import BarProprietesLocation from "./BarProprietesLocation";
import TabsButtons from "../ui/tabs/TabsButtons";
import TabsContent from "../ui/tabs/TabsContent";

type ChartData = { name: string; value: number }[];

type ProprietesChartsTabsProps = {
  statusData: ChartData;
  typeData: ChartData;
  locationData: ChartData;
};

const TABS = [
  { value: "status", label: "Status" },
  { value: "type", label: "Type" },
  { value: "location", label: "Top Locations" },
] as const;

const ProprietesChartsTabs = ({
  statusData,
  typeData,
  locationData,
}: ProprietesChartsTabsProps) => {
  const [activeTab, setActiveTab] = useState<"status" | "type" | "location">(
    "status"
  );

  const tabsContent = useMemo(
    () => [
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
    ],
    [statusData, typeData, locationData]
  );

  return (
    <GridCard
      title="Properties statistics"
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

export default ProprietesChartsTabs;
