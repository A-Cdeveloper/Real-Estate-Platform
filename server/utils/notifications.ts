import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { Notification } from "@prisma/client";

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
