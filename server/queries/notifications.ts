import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { parseSort } from "@/lib/utils/parseSort";
import { Notification } from "@prisma/client";

const NOTIFICATIONS_PER_PAGE = 15;

/**
 * Get all notifications for current user with pagination and sorting
 * @param page - The page number
 * @param limit - The number of notifications per page
 * @param sort - The sorting order
 * @param includeRead - If true, returns all notifications (read and unread). If false, returns only unread. Defaults to true.
 * @param userId - The user ID to get notifications for (optional, defaults to current user from session)
 * @returns Object containing notifications, total, page, limit, and totalPages
 */
export async function getAllNotifications({
  page = 1,
  limit = NOTIFICATIONS_PER_PAGE,
  sort = "createdAt_desc",
  includeRead = true,
  userId,
}: {
  page?: number;
  limit?: number;
  sort?: string;
  includeRead?: boolean;
  userId?: string;
}): Promise<{
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  try {
    if (!userId) {
      return {
        notifications: [],
        total: 0,
        page: 1,
        limit,
        totalPages: 0,
      };
    }

    const orderBy = parseSort(sort);

    const where = {
      userId,
      ...(includeRead ? {} : { isRead: false }),
    };

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      notifications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
