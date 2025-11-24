import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings } from "@/server/queries/settings";
import { UpdateSettings } from "@/types/settings";
import SettingsForm from "./SettingsForm";

const SettingsView = async () => {
  const settings = await getSettings();

  return (
    <div className="w-full xl:w-2/3">
      <Card>
        <CardHeader>
          <CardTitle>Edit Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm settings={settings as UpdateSettings} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
