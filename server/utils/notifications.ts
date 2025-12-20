import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { Notification, Role } from "@prisma/client";

/**
 * Create a notification for a single user
 * @param userId - The ID of the user to notify
 * @param title - The title of the notification
 * @param message - The message content
 * @param link - Optional link to related page
 * @returns The created notification
 */
export async function createNotification(
  userId: string,
  title: string,
  message: string,
  link?: string
): Promise<Notification> {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        link: link || null,
      },
    });
    return notification;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Create notifications for all admin users
 * @param title - The title of the notification
 * @param message - The message content
 * @param link - Optional link to related page
 * @returns Array of created notifications
 */
export async function createNotificationForAdmins(
  title: string,
  message: string,
  link?: string
): Promise<Notification[]> {
  try {
    // Find all admin users
    const admins = await prisma.user.findMany({
      where: { role: Role.ADMIN },
      select: { id: true },
    });

    // Create notification for each admin
    const notifications = await Promise.all(
      admins.map((admin) => createNotification(admin.id, title, message, link))
    );

    return notifications;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
