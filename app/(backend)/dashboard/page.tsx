import GeneralStats from "@/features/backend/dashboard/general-stats/GeneralStats";
import GridWrapper from "@/features/backend/dashboard/grid-stats/GridWrapper";
import { adminGuard } from "@/server/auth/adminGuard";

export default async function DashboardPage() {
  await adminGuard();

  return (
    <div className="space-y-6">
      <GeneralStats />
      <div className="w-full max-w-screen-2xl px-4 py-6">
        <GridWrapper />
      </div>
    </div>
  );
}
