import {
  getPropertiesLocationCountForBar,
  getPropertiesStatusCountForPie,
  getPropertiesTypeCountForPie,
} from "@/server/queries/dashboard-grid";
import ProprietesChartsTabs from "./ProprietesChartsTabs";

/**
 * Server component that fetches properties statistics data for charts
 * Uses Promise.all to fetch all three queries in parallel for better performance
 */
const ProprietesCharts = async () => {
  const [statusData, typeData, locationData] = await Promise.all([
    getPropertiesStatusCountForPie(),
    getPropertiesTypeCountForPie(),
    getPropertiesLocationCountForBar(),
  ]);

  return (
    <ProprietesChartsTabs
      statusData={statusData}
      typeData={typeData}
      locationData={locationData}
    />
  );
};

export default ProprietesCharts;
