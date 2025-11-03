import type { Metadata } from "next";

import FrontFooter from "@/components/frontend/layout/footer/FrontFooter";
import FrontHeader from "@/components/frontend/layout/header/FrontHeader";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FrontHeader />
      <main className="min-h-screen">{children}</main>
      <FrontFooter />
    </>
  );
}
