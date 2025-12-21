import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type NotificationButtonProps = {
  /** Number of unread notifications (displayed as badge) */
  unreadCount: number;
};

/**
 * NotificationButton component
 *
 * Trigger button for the notifications dropdown menu.
 * Displays a bell icon with a badge showing the unread count.
 *
 * Features:
 * - Badge only shown when there are unread notifications
 * - Badge displays "99+" if count exceeds 99
 * - Accessible with proper ARIA labels
 *
 * @param unreadCount - Number of unread notifications to display in badge
 */
const NotificationButton = ({ unreadCount }: NotificationButtonProps) => {
  return (
    <DropdownMenuTrigger asChild className="">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Notifications"
      >
        {/* Bell icon */}
        <Bell className="h-5! w-5!" aria-hidden="true" />

        {/* Unread count badge - only shown when count > 0 */}
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 h-4.5 w-4.5 flex items-center justify-center p-0 text-[10px]"
          >
            {/* Display "99+" if count exceeds 99, otherwise show actual count */}
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};

export default NotificationButton;
