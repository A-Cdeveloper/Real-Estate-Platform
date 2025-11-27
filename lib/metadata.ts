import type { Metadata } from "next";
import { getSettings } from "@/server/queries/settings";
import { SITE_URL } from "@/lib/constants";

/**
 * Fallback values if settings are not available
 */
const FALLBACK_APP_NAME = "Real Estate";
const FALLBACK_APP_DESCRIPTION =
  "Find your perfect property with Real Estate Pro. Browse listings, explore neighborhoods, and connect with expert agents.";

/**
 * Get app settings with fallback values
 * Cached via getSettings() - will only fetch once per request
 */
async function getAppSettings() {
  try {
    const settings = await getSettings();
    return {
      appName: settings?.appName || FALLBACK_APP_NAME,
      appDescription: settings?.appDescription || FALLBACK_APP_DESCRIPTION,
    };
  } catch {
    return {
      appName: FALLBACK_APP_NAME,
      appDescription: FALLBACK_APP_DESCRIPTION,
    };
  }
}

/**
 * Generate metadata for pages
 * @param title - Page title (will be prefixed with app name)
 * @param description - Page description (optional, defaults to app description)
 * @param url - Page URL (optional, for OpenGraph)
 * @param type - OpenGraph type (optional, defaults to "website")
 * @returns Metadata object
 */
export async function generatePageMetadata(
  title: string,
  description?: string,
  url?: string,
  type: "website" | "article" = "website"
): Promise<Metadata> {
  const { appName, appDescription } = await getAppSettings();
  const pageTitle = `${title} | ${appName}`;
  const pageDescription = description || appDescription;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
  };

  // Add OpenGraph if URL is provided
  if (url) {
    metadata.openGraph = {
      title: pageTitle,
      description: pageDescription,
      url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
      type,
    };
  }

  return metadata;
}

/**
 * Generate base metadata (for layout)
 * @returns Metadata object with app name and description
 */
export async function generateBaseMetadata(): Promise<Metadata> {
  const { appName, appDescription } = await getAppSettings();
  return {
    title: appName,
    description: appDescription,
  };
}
