import { adminGuard } from "@/server/auth/adminGuard";
import GeneralStats from "@/features/backend/dashboard/GeneralStats";
import GridWrapper from "@/features/backend/dashboard/GridWrapper";

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
