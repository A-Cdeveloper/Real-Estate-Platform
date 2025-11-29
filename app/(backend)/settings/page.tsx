import PageHeader from "@/components/backend/layout/PageHeader";
import { SettingsIcon } from "lucide-react";
import SettingsView from "@/features/backend/settings/SettingsView";
import { adminGuard } from "@/server/auth/adminGuard";

const SettingsPage = async () => {
  // Check if the user is an admin
  await adminGuard();
  return (
    <div>
      <PageHeader title="Settings" icon={SettingsIcon} />
      <SettingsView />
    </div>
  );
};

export default SettingsPage;
