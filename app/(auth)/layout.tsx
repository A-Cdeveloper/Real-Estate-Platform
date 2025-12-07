// app/(auth)/layout.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getSettings } from "@/server/queries/settings";
import Logo from "@/components/shared/ui/Logo";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { generateBaseMetadata } from "@/lib/metadata";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata = await generateBaseMetadata();
  return {
    title: `${baseMetadata.title} - Login`,
    description: baseMetadata.description,
  };
}

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Try to get settings, but use fallback values if it fails
  let settings = null;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error("Failed to load settings in auth layout:", error);
    // Continue with fallback values
  }

  const logoLight =
    settings?.logo_light && settings.logo_light.trim() !== ""
      ? settings.logo_light
      : "/real-estate-logo.png";
  const logoDark =
    settings?.logo_dark && settings.logo_dark.trim() !== ""
      ? settings.logo_dark
      : "/real-estate-logo_light.png";
  const appName = settings?.appName || "Real Estate";

  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main
        id="main-content"
        className="min-h-screen grid place-items-center px-4 py-8"
        role="main"
      >
        <div className="w-full max-w-[350px] space-y-8">
          <div className="flex justify-center">
            <Logo
              width={130}
              height={130}
              appName={appName}
              logoLight={logoLight}
              logoDark={logoDark}
            />
          </div>
          {children}
        </div>
      </main>

      <Toaster />
    </>
  );
}
