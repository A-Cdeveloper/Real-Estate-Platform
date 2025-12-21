"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { markAsRead } from "@/server/actions/notifications";
import { Notification } from "@prisma/client";
import { useCallback } from "react";
import NotificationButton from "./dropdown/NotificationButton";
import NotificationItem from "./dropdown/NotificationItem";

type NotificationDropdownProps = {
  /** Array of notifications to display */
  notifications: Notification[];
  /** Number of unread notifications (used for badge display) */
  unreadCount: number;
  /** Callback fired when a notification is marked as read (for optimistic updates) */
  onNotificationClick?: (notificationId: string) => void;
  /** Callback fired after marking all notifications as read (for refreshing the list) */
  onMarkAllAsRead?: () => void;
};

/**
 * NotificationDropdown component
 *
 * Main container component for the notifications dropdown menu.
 * Handles the dropdown state, displays notifications list, and manages
 * marking notifications as read (both individual and bulk operations).
 *
 * Features:
 * - Optimistic UI updates for better UX
 * - Automatic rollback on server action failure
 * - Non-modal dropdown (doesn't block page interaction)
 * - Scrollable list for many notifications
 *
 * @param notifications - Array of notifications to display
 * @param unreadCount - Number of unread notifications (for badge)
 * @param onNotificationClick - Callback for optimistic updates
 * @param onMarkAllAsRead - Callback to refresh notifications list
 */
const NotificationDropdown = ({
  notifications,
  unreadCount,
  onNotificationClick,
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  /**
   * Handles marking a single notification as read
   * Uses optimistic updates for immediate UI feedback
   * Rolls back on server action failure by refreshing the list
   *
   * Memoized with useCallback to prevent unnecessary re-renders
   * of NotificationItem components when parent re-renders
   */
  const handleMarkAsRead = useCallback(
    async (notification: Notification) => {
      // Only process if notification is unread
      if (!notification.isRead) {
        // Optimistic update: remove notification from UI immediately
        onNotificationClick?.(notification.id);

        try {
          // Server action: mark notification as read in database
          await markAsRead(notification.id);
        } catch (error) {
          // If server action fails, refresh notifications to restore state
          console.error("Failed to mark notification as read:", error);
          onMarkAllAsRead?.();
        }
      }
    },
    [onNotificationClick, onMarkAllAsRead]
  );

  /**
   * Handles marking all notifications as read
   * Refreshes the notifications list after completion
   */
  const handleMarkAllAsRead = async () => {
    await markAsRead();
    // Refresh notifications list to reflect changes
    onMarkAllAsRead?.();
  };

  return (
    <DropdownMenu modal={false}>
      {/* Trigger button with unread count badge */}
      <NotificationButton unreadCount={unreadCount} />

      {/* Dropdown content */}
      <DropdownMenuContent
        align="start"
        className="w-full max-w-[375px] min-w-[375px] z-60 mt-[7px] rounded-none"
        sideOffset={8}
        // Prevent closing on outside click for better UX
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header with "Mark all as read" button */}
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-[15px]">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-muted-foreground hover:text-foreground h-auto py-0 px-2"
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Notifications list or empty state */}
        {notifications.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                handleMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
