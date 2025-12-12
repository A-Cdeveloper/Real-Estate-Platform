import Sidebar from "./Sidebar";
import { navigationLinks } from "./links";
import { Suspense } from "react";
import { Spinner } from "@/components/shared/ui/Spinner";

const SidebarWrapper = ({ isAdmin }: { isAdmin: boolean }) => {
  const filteredLinks = navigationLinks.filter(
    (link) => !link.adminOnly || (link.adminOnly && isAdmin)
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Sidebar links={filteredLinks} />
    </Suspense>
  );
};

export default SidebarWrapper;
