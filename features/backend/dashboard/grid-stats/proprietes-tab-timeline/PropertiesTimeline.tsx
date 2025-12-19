import { getPropertiesTimelineData } from "@/server/queries/dashboard-grid";
import PropertiesTimelineTabs from "./PropertiesTimelineTabs";

/**
 * Server component that fetches properties timeline data
 * Client component handles filtering by time period (all time, last week, last month)
 */
const PropertiesTimeline = async () => {
  const data = await getPropertiesTimelineData();

  return <PropertiesTimelineTabs data={data} />;
};

export default PropertiesTimeline;

