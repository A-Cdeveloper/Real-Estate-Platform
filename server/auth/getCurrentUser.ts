import prisma from "@/server/prisma";
import { getSession } from "@/server/auth/session";
import type { CurrentUser } from "@/types/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}
