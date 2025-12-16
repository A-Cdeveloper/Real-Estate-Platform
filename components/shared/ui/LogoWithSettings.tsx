import { getSettings } from "@/server/queries/settings";
import Logo from "./Logo";

type LogoWithSettingsProps = {
  width?: number;
  height?: number;
};

/**
 * Server Component wrapper for Logo
 * Fetches settings and passes logo paths and app name to Logo component
 */
const LogoWithSettings = async ({
  width = 100,
  height = 100,
}: LogoWithSettingsProps) => {
  let settings = null;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error("Error in LogoWithSettings:", error);
  }

  return (
    <Logo
      width={width}
      height={height}
      appName={settings?.appName || "Real Estate"}
      logoLight={settings?.logo_light || "/real-estate-logo.png"}
      logoDark={settings?.logo_dark || "/real-estate-logo_light.png"}
    />
  );
};

export default LogoWithSettings;
