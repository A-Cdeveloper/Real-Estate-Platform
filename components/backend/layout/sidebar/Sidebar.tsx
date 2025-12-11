"use client";

import { useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/backend/layout/sidebar/Navigation";
import SidebarBackdrop from "@/components/backend/layout/sidebar/SidebarBackdrop";
import { useSidebarStore } from "@/components/backend/layout/sidebar/sidebarStore";
import { SidebarLink } from "./links";

const Sidebar = ({ links }: { links: SidebarLink[] }) => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);
  const [, startTransition] = useTransition();

  // Set desktop expanded after mount
  useEffect(() => {
    if (window.innerWidth >= 768) {
      startTransition(() => {
        setIsCollapsed(false);
      });
    }
  }, [setIsCollapsed, startTransition]);

  return (
    <>
      <SidebarBackdrop />

      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 flex flex-col border-r bg-secondary transition-all duration-300",
          // Mobile and desktop: toggle between w-16 and w-64
          // On mobile initially collapsed (state = true), can be opened by click
          isCollapsed ? "w-16" : "w-64",
          // Mobile expanded overlay styling
          !isCollapsed && "md:bg-secondary bg-secondary/95 backdrop-blur"
        )}
        aria-label="Sidebar navigation"
      >
        <Navigation links={links} />
      </aside>
    </>
  );
};

export default Sidebar;
