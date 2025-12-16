import { cache } from "react";
import { Users } from "lucide-react";
import StatBox from "./StatBox";
import { getUserStats } from "@/server/queries/users";

const getCachedUserStats = cache(getUserStats);

const UserStats = async () => {
  const {
    total: userTotal,
    adminCount,
    agentCount,
  } = await getCachedUserStats();
  return (
    <StatBox
      title="Users"
      count={userTotal}
      icon={<Users className="h-6 w-6" aria-hidden="true" />}
      extraText={`${adminCount} admins • ${agentCount} agents`}
      className="bg-sky-500/5"
    />
  );
};

export default UserStats;
