import { Prisma, Notification } from "@prisma/client";

/**
 * Notification with user information
 * Used when fetching notifications with user details
 */
export type NotificationWithUser = Prisma.NotificationGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
  };
}>;

/**
 * Type for creating a notification
 */
export type CreateNotification = Pick<
  Notification,
  "title" | "message" | "userId"
> & {
  link?: string | null;
};
