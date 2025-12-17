import GeneralStats from "@/features/backend/dashboard/general-stats/GeneralStats";
import GridWrapper from "@/features/backend/dashboard/grid-stats/GridWrapper";
import { adminGuard } from "@/server/auth/adminGuard";

export default async function DashboardPage() {
  await adminGuard();

  return (
    <div className="space-y-6">
      <GeneralStats />

      <GridWrapper />
    </div>
  );
}
