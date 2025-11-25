import { getSettings } from "@/server/queries/settings";
import { UpdateSettings } from "@/types/settings";
import SettingsForm from "./SettingsForm";

const SettingsView = async () => {
  const settings = await getSettings();

  return <SettingsForm settings={settings as UpdateSettings} />;
};

export default SettingsView;
