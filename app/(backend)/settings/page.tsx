import PageHeader from "@/components/backend/layout/PageHeader";
import { SettingsIcon } from "lucide-react";
import SettingsView from "@/features/backend/settings/SettingsView";

const SettingsPage = () => {
  return (
    <div>
      <PageHeader title="Settings" icon={SettingsIcon} />
      <SettingsView />
    </div>
  );
};

export default SettingsPage;
