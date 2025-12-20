"use client";

import { getNotifications } from "@/server/actions/notifications";
import { Notification } from "@prisma/client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

/**
 * Custom hook for managing notifications with polling functionality
 * Polls for new notifications every 30 seconds when tab is active
 * @returns Object containing notifications state, unread count, and handler functions
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications(true);
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

    // Start polling initially
    startPolling();

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      pausePolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchNotifications, startPolling, pausePolling]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleNotificationClick = useCallback((notificationId: string) => {
    // Update local state to mark notification as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, isRead: true, readAt: new Date() } : n
      )
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    // Refresh notifications after marking all as read
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    unreadCount,
    handleNotificationClick,
    handleMarkAllAsRead,
  };
};
