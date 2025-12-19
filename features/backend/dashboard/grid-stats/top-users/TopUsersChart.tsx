import { getTopUsersByPropertiesCount } from "@/server/queries/dashboard-grid";
import BarTopUsersByProprietes from "./BarTopUsersByProprietes";

/**
 * Server component that fetches top users by properties count
 * Displays stacked bar chart with properties grouped by status
 */
const TopUsersChart = async () => {
  const data = await getTopUsersByPropertiesCount();

  return <BarTopUsersByProprietes data={data} />;
};

export default TopUsersChart;
