import { cache } from "react";
import { Scale } from "lucide-react";
import StatBox from "../shared/StatBox";
import { getPropertyStats } from "@/server/queries/properties";

const getCachedPropertyStats = cache(getPropertyStats);

const AvgPrice = async () => {
  const { avgPricePerSqm } = await getCachedPropertyStats();
  return (
    <StatBox
      title="Avg price / m²"
      count={`€${avgPricePerSqm.toLocaleString()}`}
      icon={<Scale className="h-6 w-6" aria-hidden="true" />}
      extraText="For approved properties"
      className="bg-amber-500/5"
    />
  );
};

export default AvgPrice;

