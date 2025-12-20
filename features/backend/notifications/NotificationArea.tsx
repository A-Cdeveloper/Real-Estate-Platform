"use client";

import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "./hooks/useNotifications";

/**
 * NotificationArea component
 * Displays notification dropdown with polling functionality
 */
const NotificationArea = () => {
  const {
    notifications,
    isLoading,
    unreadCount,
    handleNotificationClick,
    handleMarkAllAsRead,
  } = useNotifications();

  if (isLoading) {
    return null;
  }

  return (
    <NotificationDropdown
      notifications={notifications}
      unreadCount={unreadCount}
      onNotificationClick={handleNotificationClick}
      onMarkAllAsRead={handleMarkAllAsRead}
    />
  );
};

export default NotificationArea;
