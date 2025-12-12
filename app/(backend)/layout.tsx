import BackHeader from "@/components/backend/layout/header/BackHeader";
import MainContent from "@/components/backend/layout/MainContent";
import React from "react";
import dynamic from "next/dynamic";
import SidebarWrapper from "@/components/backend/layout/sidebar/SidebarWrapper";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { getSession } from "@/server/auth/session";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

const BackendLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUserFromSession();
  const session = await getSession();

  // If user was deleted (session exists but user doesn't), redirect to deleted page
  if (!currentUser && session) {
    redirect("/deleted");
  }

  // If no user and no session, redirect handled by middleware
  if (!currentUser) {
    redirect("/login");
  }

  const isAdmin = currentUser.role === Role.ADMIN;

  // If user is inactive, redirect to inactive page
  if (!currentUser.isActive) {
    redirect("/inactive");
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
