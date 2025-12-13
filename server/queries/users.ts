import prisma from "@/server/prisma";
import {
  CurrentUser,
  UserForPropertyFilters,
  UserWithProperties,
} from "@/types/user";
import { getPrismaErrorMessage } from "../prisma-errors";
import { ensureAdminAccess } from "../auth/ensureAdminAccess";
import { parseSort } from "@/lib/utils/parseSort";
import { User } from "@prisma/client";

/**
 * Fetches all users with the fields needed for backend profile views, including property counts.
 * Admin-only query - requires admin access.
 * @param page - The page number
 * @param limit - The number of users per page
 * @param sort - The sorting order
 * @returns The users
 */
export const getUsers = async ({
  page = 1,
  limit = 10,
  sort = "role_asc",
}: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<{
  users: UserWithProperties[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  await ensureAdminAccess();

  try {
    const [field, order] = sort.split("_");
    const baseOrderBy = parseSort(sort, "role", "asc");

    // Special case for propertyCount - needs nested _count structure
    const orderBy =
      field === "propertyCount"
        ? { properties: { _count: order as "asc" | "desc" } }
        : baseOrderBy;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: [orderBy],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: {
            select: {
              properties: true,
            },
          },
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
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
};
/**
 * Fetches a user profile by id with the fields needed for backend profile views.
 *
 * @param userId - The ID of the user
 * @returns The user
 */
export async function getUserById(userId: string): Promise<CurrentUser | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUsersForPropertyFilters(): Promise<
  UserForPropertyFilters[]
> {
  await ensureAdminAccess();

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return users;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
