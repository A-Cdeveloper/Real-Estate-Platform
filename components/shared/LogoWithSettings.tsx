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
  const settings = await getSettings();

  // Check for empty string as well as null/undefined
  const logoLight =
    settings?.logo_light && settings.logo_light.trim() !== ""
      ? settings.logo_light
      : "/real-estate-logo.png";
  const logoDark =
    settings?.logo_dark && settings.logo_dark.trim() !== ""
      ? settings.logo_dark
      : "/real-estate-logo_light.png";

  return (
    <Logo
      width={width}
      height={height}
      appName={settings?.appName || "Real Estate"}
      logoLight={logoLight}
      logoDark={logoDark}
    />
  );
};

export default LogoWithSettings;
