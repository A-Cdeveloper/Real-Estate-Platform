import prisma from "@/server/prisma";
import { CurrentUser, UserWithProperties } from "@/types/user";
import { getPrismaErrorMessage } from "../prisma-errors";

/**
 * Fetches all users with the fields needed for backend profile views, including property counts.
 */
export const getUsers = async (): Promise<{
  users: UserWithProperties[];
  total: number;
}> => {
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        include: {
          properties: true,
          _count: {
            select: {
              properties: true,
            },
          },
        },
        orderBy: {
          role: "asc",
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users: users.map(({ _count, ...user }) => ({
        ...user,
        propertyCount: _count?.properties ?? 0,
      })),
      total,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
};
/**
 * Fetches a user profile by id with the fields needed for backend profile views.
 */
export async function getUserById(userId: string): Promise<CurrentUser | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
