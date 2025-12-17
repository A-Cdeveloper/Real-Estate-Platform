import { cache } from "react";
import { Building } from "lucide-react";
import StatBox from "../shared/StatBox";
import { getPropertyStats } from "@/server/queries/properties";

const getCachedPropertyStats = cache(getPropertyStats);

const TotalProperties = async () => {
  const { total, addedLastWeek } = await getCachedPropertyStats();
  return (
    <StatBox
      title="Total properties"
      count={total}
      icon={<Building className="h-6 w-6" aria-hidden="true" />}
      extraText={`+${addedLastWeek} in the last 7 days`}
      className="bg-primary/5"
      href="/proprietes-area?sort=createdAt_desc"
    />
  );
};

export default TotalProperties;

