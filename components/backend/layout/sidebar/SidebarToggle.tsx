import { useSidebarStore } from "@/components/backend/layout/sidebar/sidebarStore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SidebarToggle = () => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsCollapsed((prev) => !prev)}
      className="mb-2 !bg-muted-foreground/10 self-end"
      aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      aria-expanded={!isCollapsed}
    >
      <span className="sr-only">
        {isCollapsed ? "Open sidebar" : "Close sidebar"}
      </span>
      {isCollapsed ? (
        <ChevronRight className="size-5" aria-hidden="true" />
      ) : (
        <ChevronLeft className="size-5" aria-hidden="true" />
      )}
    </Button>
  );
};

export default SidebarToggle;
