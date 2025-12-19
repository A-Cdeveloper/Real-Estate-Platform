import { getPropertiesPriceRangeCount } from "@/server/queries/dashboard-grid";
import BarPriceRange from "./BarPriceRange";

/**
 * Server component that fetches properties count grouped by price range
 * Displays vertical bar chart with price ranges on X-axis and count on Y-axis
 */
const PriceRangeChart = async () => {
  const data = await getPropertiesPriceRangeCount();

  return <BarPriceRange data={data} />;
};

export default PriceRangeChart;

