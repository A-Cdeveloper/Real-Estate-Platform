import { cache } from "react";
import { CheckCircle2 } from "lucide-react";
import StatBox from "../shared/StatBox";
import { getPropertyStats } from "@/server/queries/properties";
import { PropertyStatus } from "@prisma/client";

const getCachedPropertyStats = cache(getPropertyStats);

const ApprovedProperties = async () => {
  const { total } = await getCachedPropertyStats();
  return (
    <StatBox
      title="Approved properties"
      count={total}
      icon={<CheckCircle2 className="h-6 w-6" aria-hidden="true" />}
      extraText="Visible on frontend"
      className="bg-emerald-500/5"
      href={`/proprietes-area?status=${PropertyStatus.APPROVED}&sort=createdAt_desc`}
    />
  );
};

export default ApprovedProperties;
