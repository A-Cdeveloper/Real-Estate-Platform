"use client";

import { getNotifications } from "@/server/actions/notifications";
import { Notification } from "@prisma/client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

/**
 * Custom hook for managing notifications with polling functionality
 * Polls for new notifications every 30 seconds when tab is active
 * @returns Object containing notifications state, unread count, and handler functions
 */
export const useNotifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      // Fetch only unread notifications for dropdown
      const data = await getNotifications(false);
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startPolling = useCallback(() => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Poll every 30 seconds
    intervalRef.current = setInterval(() => {
      fetchNotifications();
    }, 30000);
  }, [fetchNotifications]);

  const pausePolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Start polling when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchNotifications(); // Fetch immediately when tab becomes active
        startPolling();
      } else {
        pausePolling();
      }
    };

    // Listen for notification deletion events to refresh dropdown
    const handleNotificationDeleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ notificationId: string }>;
      // Optimistically remove notification from dropdown immediately
      setNotifications((prev) =>
        prev.filter((n) => n.id !== customEvent.detail.notificationId)
      );
      // Then fetch fresh data to ensure sync
      fetchNotifications();
    };

    // Start polling initially
    startPolling();

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Listen for notification deletion events
    window.addEventListener("notificationDeleted", handleNotificationDeleted);

    // Cleanup
    return () => {
      pausePolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        "notificationDeleted",
        handleNotificationDeleted
      );
    };
  }, [fetchNotifications, startPolling, pausePolling]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleNotificationClick = useCallback((notificationId: string) => {
    // Optimistically remove notification immediately
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    // Refresh notifications after marking all as read
    fetchNotifications();
    // Refresh notifications page to sync changes
    router.refresh();
  }, [fetchNotifications, router]);

  return {
    notifications,
    isLoading,
    unreadCount,
    handleNotificationClick,
    handleMarkAllAsRead,
  };
};
