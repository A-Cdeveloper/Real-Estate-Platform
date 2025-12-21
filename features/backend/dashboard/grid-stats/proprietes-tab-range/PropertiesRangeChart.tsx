import {
  getPropertiesPriceRangeCount,
  getPropertiesAreaSizeCount,
} from "@/server/queries/dashboard-grid";
import ProprietesRangeTabs from "./ProprietesRangeTabs";

/**
 * Server component that fetches properties count grouped by price range and area size
 * Displays tabs with price range and area size charts
 */
const PropertiesRangeChart = async () => {
  const [priceData, areaData] = await Promise.all([
    getPropertiesPriceRangeCount(),
    getPropertiesAreaSizeCount(),
  ]);

  return <ProprietesRangeTabs priceData={priceData} areaData={areaData} />;
};

export default PropertiesRangeChart;
