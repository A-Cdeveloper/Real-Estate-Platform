import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatLongDate } from "@/lib/utils/date";
import { Notification } from "@prisma/client";
import { memo } from "react";
import { CheckCircle2 } from "lucide-react";

type NotificationItemProps = {
  /** The notification to display */
  notification: Notification;
  /** Callback to mark this notification as read */
  handleMarkAsRead: (notification: Notification) => void;
};

/**
 * NotificationItem component
 *
 * Renders a single notification item in the dropdown list.
 * Displays notification title, message, creation date, and a
 * "mark as read" button for unread notifications.
 *
 * Visual features:
 * - Unread notifications have a blue left border
 * - Unread notifications have bold title
 * - Hover effect changes border color to green
 * - "mark as read" button only shown for unread notifications
 *
 * Memoized with React.memo to prevent unnecessary re-renders
 * when parent component re-renders but notification props haven't changed.
 *
 * @param notification - The notification data to display
 * @param handleMarkAsRead - Callback to mark notification as read
 */
const NotificationItem = memo(
  ({ notification, handleMarkAsRead }: NotificationItemProps) => {
    return (
      <>
        <DropdownMenuItem
          className={cn(
            "flex flex-col items-start gap-0 py-0 my-3 px-4 ms-1.5 cursor-default",
            // Visual indicator for unread notifications: blue left border
            // Hover effect: border changes to green
            !notification.isRead &&
              "border-l-4 border-blue-400 hover:bg-transparent! hover:text-inherit! hover:border-green-400! "
          )}
          // Prevent default dropdown menu item selection behavior
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            {/* Notification content */}
            <div className="flex-1 min-w-0">
              {/* Title: bold for unread notifications */}
              <p
                className={cn(
                  "text-sm font-medium",
                  !notification.isRead && "font-semibold"
                )}
              >
                {notification.title}
              </p>
              {/* Message: truncated to 2 lines */}
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {notification.message}
              </p>
              {/* Creation date */}
              <p className="text-xs text-muted-foreground mt-1">
                {formatLongDate(notification.createdAt)}
              </p>
            </div>

            {/* "Mark as read" button - only shown for unread notifications */}
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                className="self-end flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors -mb-2 h-auto py-0 px-1 group"
                onClick={(e) => {
                  // Prevent event bubbling to avoid triggering dropdown item selection
                  e.stopPropagation();
                  handleMarkAsRead(notification);
                }}
                aria-label="Mark as read"
              >
                <CheckCircle2 className="h-3.5 w-3.5 group-hover:text-green-500 transition-colors" />
                <span className="hidden sm:inline">mark as read</span>
              </Button>
            )}
          </div>
        </DropdownMenuItem>
        {/* Separator between notifications (hidden for last item) */}
        <DropdownMenuSeparator className="w-[98%] mx-auto last:hidden" />
      </>
    );
  }
);

NotificationItem.displayName = "NotificationItem";

export default NotificationItem;
