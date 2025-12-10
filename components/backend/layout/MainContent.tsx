"use client";

import { useSidebarStore } from "./sidebar/sidebarStore";
import { cn } from "@/lib/utils";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  return (
    <main
      // components/backend/layout/MainContent.tsx
      // Linija 11 - ukloni overflow-y-auto i promeni height na min-height
      className={cn(
        "mt-12 min-h-[calc(100vh-4rem)] bg-muted/20 px-4 py-8 transition-[margin-left] duration-300 lg:px-8",
        // Mobile: always ml-16 (sidebar is overlay when expanded)
        // Desktop: toggle between ml-16 and ml-64
        "ml-16",
        isCollapsed ? "md:ml-16" : "md:ml-64"
      )}
    >
      <div className="rounded-2xl bg-background/60 p-6 text-left">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
