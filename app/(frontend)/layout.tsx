import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FrontFooter from "@/components/frontend/layout/footer/FrontFooter";
import FrontHeader from "@/components/frontend/layout/header/FrontHeader";
import { generateBaseMetadata } from "@/lib/metadata";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

export async function generateMetadata(): Promise<Metadata> {
  return await generateBaseMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <FrontHeader />
      <main id="main-content" className="min-h-screen" role="main">
        {children}
      </main>
      <FrontFooter />
      <Toaster />
    </>
  );
}
