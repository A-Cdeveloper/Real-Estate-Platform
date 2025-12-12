import BackHeader from "@/components/backend/layout/header/BackHeader";
import MainContent from "@/components/backend/layout/MainContent";

import React from "react";
import dynamic from "next/dynamic";
import SidebarWrapper from "@/components/backend/layout/sidebar/SidebarWrapper";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { Role } from "@prisma/client";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

const BackendLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUserFromSession();
  const isAdmin = currentUser?.role === Role.ADMIN;

  if (currentUser && !currentUser.isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <p className="text-2xl font-semibold">
          Your account is inactive. Please contact administrator.
        </p>
      </div>
    );
  }
  return (
    <>
      <BackHeader currentUser={currentUser} />
      <SidebarWrapper isAdmin={isAdmin} />
      <MainContent>{children}</MainContent>
      <Toaster />
    </>
  );
};

export default BackendLayout;
