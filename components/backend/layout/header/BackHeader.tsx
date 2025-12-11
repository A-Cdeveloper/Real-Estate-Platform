import LogoWithSettings from "@/components/shared/ui/LogoWithSettings";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { Role } from "@prisma/client";
import NotificationArea from "./NotificationArea";
import UserArea from "./UserArea";
import { CurrentUser } from "@/types/user";

/**
 * BackHeader component
 *
 * Server component that renders the backend header with authentication check.
 * Fetches current user session and determines admin status to conditionally display features.
 *
 * Features:
 * - Logo with settings link
 * - Notification area (admin only)
 * - Theme toggle
 * - User area with avatar and logout
 *
 * @returns The backend header component
 */
const BackHeader = async () => {
  const currentUser = await getCurrentUserFromSession();
  const isAdmin = currentUser?.role === Role.ADMIN;
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-8"
      aria-label="Backend header"
    >
      <div className="flex items-center gap-3">
        <LogoWithSettings />
      </div>
      <div className="flex items-center gap-1">
        {isAdmin && <NotificationArea />}
        <ThemeToggle />
        <UserArea currentUser={currentUser as CurrentUser} isAdmin={isAdmin} />
      </div>
    </header>
  );
};

export default BackHeader;
