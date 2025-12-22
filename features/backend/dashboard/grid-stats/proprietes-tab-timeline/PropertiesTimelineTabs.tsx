"use client";

import { memo, useMemo, useState } from "react";
import GridCard from "../shared/GridCard";
import TabsButtons from "../ui/tabs/TabsButtons";
import TabsContent from "../ui/tabs/TabsContent";
import LinePropertiesTimeline from "./LinePropertiesTimeline";

type TimelineData = Array<{ name: string; value: number; date: Date }>;

type PropertiesTimelineTabsProps = {
  data: TimelineData;
};

const TABS = [
  { value: "all", label: "All time" },
  { value: "6months", label: "Last 6 months" },
  { value: "month", label: "Last month" },
  { value: "week", label: "Last week" },
] as const;

const PropertiesTimelineTabs = ({ data }: PropertiesTimelineTabsProps) => {
  const [activeTab, setActiveTab] = useState<
    "all" | "week" | "month" | "6months"
  >("week");

  // Calculate filtered data for each tab
  const lastWeekData = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    return data.filter((item) => item.date >= startDate);
  }, [data]);

  const lastMonthData = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 1);
    return data.filter((item) => item.date >= startDate);
  }, [data]);

  const last6MonthsData = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 6);
    return data.filter((item) => item.date >= startDate);
  }, [data]);

  const tabsContent = useMemo(
    () => [
      {
        value: "all" as const,
        content: <LinePropertiesTimeline data={data} />,
      },
      {
        value: "week" as const,
        content: <LinePropertiesTimeline data={lastWeekData} />,
      },
      {
        value: "month" as const,
        content: <LinePropertiesTimeline data={lastMonthData} />,
      },
      {
        value: "6months" as const,
        content: <LinePropertiesTimeline data={last6MonthsData} />,
      },
    ],
    [data, lastWeekData, lastMonthData, last6MonthsData]
  );

  return (
    <GridCard
      title="Online Properties added over time"
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

export default memo(PropertiesTimelineTabs);
