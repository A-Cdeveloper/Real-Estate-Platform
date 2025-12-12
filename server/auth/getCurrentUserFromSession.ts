import { cache } from "react";
import prisma from "@/server/prisma";
import { getSession } from "@/server/auth/session";
import type { CurrentUser } from "@/types/user";

/**
 * Get current user from session
 * Cached function - will only fetch once per request
 * @returns CurrentUser or null if not authenticated
 */
export const getCurrentUserFromSession = cache(
  async (): Promise<CurrentUser | null> => {
    const session = await getSession();

    if (!session?.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });

    return user;
  }
);
