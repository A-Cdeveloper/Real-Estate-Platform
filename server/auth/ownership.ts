import { getCurrentUserFromSession } from "./getCurrentUserFromSession";
import { Role } from "@prisma/client";

export async function requireAuth() {
  const user = await getCurrentUserFromSession();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireOwnerOrAdmin(
  property: { ownerId: string },
  user: { id: string; role: string }
) {
  const isOwner = property.ownerId === user.id;
  const isAdmin = user.role === Role.ADMIN;
  if (!isOwner && !isAdmin) {
    throw new Error("You are not authorized to access this property");
  }
}
