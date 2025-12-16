import { cache } from "react";
import { CheckCircle2 } from "lucide-react";
import StatBox from "./StatBox";
import { getPropertyStats } from "@/server/queries/properties";

const getCachedPropertyStats = cache(getPropertyStats);

const ApprovedProperties = async () => {
  const { approvedCount } = await getCachedPropertyStats();
  return (
    <StatBox
      title="Approved properties"
      count={approvedCount}
      icon={<CheckCircle2 className="h-6 w-6" aria-hidden="true" />}
      extraText="Visible on frontend"
      className="bg-emerald-500/5"
    />
  );
};

export default ApprovedProperties;

