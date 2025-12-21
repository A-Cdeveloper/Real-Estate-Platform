import LogoWithSettings from "@/components/shared/ui/LogoWithSettings";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Role } from "@prisma/client";
import NotificationArea from "@/features/backend/notifications-area/NotificationArea";
import UserArea from "./UserArea";
import { CurrentUser } from "@/types/user";

/**
 * BackHeader component
 *
 * Server component that renders the backend header.
 * Receives current user from parent layout to avoid duplicate queries.
 *
 * Features:
 * - Logo with settings link
 * - Notification area (admin only)
 * - Theme toggle
 * - User area with avatar and logout
 *
 * @param currentUser - The current user from session
 * @returns The backend header component
 */
const BackHeader = ({ currentUser }: { currentUser: CurrentUser | null }) => {
  const isAdmin = currentUser?.role === Role.ADMIN;
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-8"
      aria-label="Backend header"
    >
      <div className="flex items-center gap-3">
        <LogoWithSettings />
      </div>
      <div className="flex items-center gap-2">
        <NotificationArea />
        <ThemeToggle />
        <UserArea currentUser={currentUser as CurrentUser} isAdmin={isAdmin} />
      </div>
    </header>
  );
};

export default BackHeader;
