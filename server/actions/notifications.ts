"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { getCurrentUserFromSession } from "../auth/getCurrentUserFromSession";
import { Notification } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Get notifications for current user
 * @param includeRead - If true, returns all notifications (read and unread). If false, returns only unread. Defaults to false.
 * @returns Array of notifications
 */
export async function getNotifications(
  includeRead: boolean = false
): Promise<Notification[]> {
  const user = await getCurrentUserFromSession();
  if (!user) {
    return [];
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        ...(includeRead ? {} : { isRead: false }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Server Action: Mark notification(s) as read
 * @param notificationId - Optional. If provided, marks specific notification as read. If not provided, marks all unread notifications as read.
 * @returns If notificationId provided: The updated notification or null if not found/unauthorized. If not provided: The count of updated notifications.
 */
export async function markAsRead(
  notificationId?: string
): Promise<Notification | number | null> {
  const user = await getCurrentUserFromSession();
  if (!user) {
    return notificationId ? null : 0;
  }

  try {
    // Mark specific notification
    if (notificationId) {
      // First check if notification exists and belongs to current user
      const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification || notification.userId !== user.id) {
        return null;
      }

      // If already read, return it as is
      if (notification.isRead) {
        return notification;
      }

      // Mark as read
      const updatedNotification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      // Revalidate notifications page to sync with dropdown
      revalidatePath("/notifications");

      return updatedNotification;
    }

    // Mark all as read
    const result = await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    // Revalidate notifications page to sync with dropdown
    revalidatePath("/notifications");

    return result.count;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Server Action: Delete a notification
 * @param notificationId - The ID of the notification to delete
 * @returns The result of the deletion
 */
export async function deleteNotification(
  notificationId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUserFromSession();
  if (!user) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  if (!notificationId) {
    return {
      success: false,
      error: "Notification ID is required.",
    };
  }

  try {
    // First check if notification exists and belongs to current user
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== user.id) {
      return {
        success: false,
        error: "Notification not found or unauthorized.",
      };
    }

    // Delete the notification
    await prisma.notification.delete({
      where: { id: notificationId },
    });

    // Revalidate notifications page to sync with dropdown
    revalidatePath("/notifications");

    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}
