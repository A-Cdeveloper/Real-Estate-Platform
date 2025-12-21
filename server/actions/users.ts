"use server";

import { PropertyStatus, Role, User } from "@prisma/client";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";
import { CurrentUser } from "@/types/user";
import { hashPassword } from "../auth/password";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormData,
  type UpdateUserFormData,
} from "../schemas/user";
import { formatZodErrors } from "../utils/zod";
import { ensureAdminAccess } from "../auth/ensureAdminAccess";
import { getCurrentUserFromSession } from "../auth/getCurrentUserFromSession";
import { createNotification } from "../utils/notifications";

export type UserActionState<TData = unknown> =
  | { success: true; user?: CurrentUser }
  | {
      success: false;
      errors?: Record<string, string[]>;
      error?: string;
      data?: TData;
    };

/**
 * Helper function to parse user form data from FormData
 * @param formData - The form data containing the user information
 * @returns The parsed user data
 */
function parseUserFormData(formData: FormData) {
  return {
    email: formData.get("email"),
    name: formData.get("name"),
    role: formData.get("role"),
    password: formData.get("password") || undefined,
    isActive: formData.get("isActive") === "true",
  };
}

/**
 * Helper function to convert User to CurrentUser (removes sensitive fields)
 * @param user - The user to convert
 * @returns The current user
 */
function toCurrentUser(user: User): CurrentUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    isOnline: user.isOnline,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
  };
}

/**
 * Server Action: Create a new user
 * @param prevState - The previous state of the user
 * @param formData - The form data containing the user information
 * @returns The result of the creation
 */
export async function createUser(
  prevState: UserActionState<CreateUserFormData> | null,
  formData: FormData
): Promise<UserActionState<CreateUserFormData> | null> {
  await ensureAdminAccess();
  const rawData = parseUserFormData(formData);
  const result = createUserSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        email: rawData.email as string,
        name: rawData.name as string,
        role: rawData.role as Role,
        password: rawData.password as string,
        isActive: rawData.isActive as boolean,
      },
    };
  }
  const { email, name, role, password, isActive } = result.data;

  if (await prisma.user.findUnique({ where: { email } })) {
    return {
      success: false,
      errors: {
        email: ["User with this email already exists."],
      },
      data: {
        email: rawData.email as string,
        name: rawData.name as string,
        role: rawData.role as Role,
        password: rawData.password as string,
        isActive: rawData.isActive as boolean,
      },
    };
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role,
        password: await hashPassword(password),
        isActive,
      },
    });
    revalidatePath("/users");

    return { success: true, user: toCurrentUser(newUser) };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        email: rawData.email as string,
        name: rawData.name as string,
        role: rawData.role as Role,
        password: rawData.password as string,
        isActive: rawData.isActive as boolean,
      },
    };
  }
}

/**
 * Server Action: Update a user (admin - includes role)
 * @param prevState - The previous state of the user
 * @param formData - The form data containing the user information
 * @returns The result of the update
 */
export async function updateUser(
  prevState: UserActionState<UpdateUserFormData & { id: string }> | null,
  formData: FormData
): Promise<UserActionState<UpdateUserFormData & { id: string }> | null> {
  await ensureAdminAccess();
  const userId = formData.get("id") as string;
  if (!userId) {
    return {
      success: false,
      error: "User ID is required.",
    };
  }

  const rawData = parseUserFormData(formData);

  const result = updateUserSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: userId,
        email: rawData.email as string,
        name: rawData.name as string,
        role: rawData.role as Role,
        password: undefined,
        isActive: rawData.isActive as boolean,
      } as UpdateUserFormData & { id: string },
    };
  }

  const { email, name, role, password, isActive } = result.data;

  if (
    await prisma.user.findFirst({
      where: { email, id: { not: userId } },
    })
  ) {
    return {
      success: false,
      errors: {
        email: ["User with this email already exists."],
      },
      data: {
        id: userId,
        email: rawData.email as string,
        name: rawData.name as string,
        role: rawData.role as Role,
        password: rawData.password as string,
        isActive: rawData.isActive as boolean,
      },
    };
  }

  // Get current user to compare isActive status
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { isActive: true },
  });

  if (!currentUser) {
    return {
      success: false,
      error: "User not found.",
    };
  }

  // If user is being deactivated (isActive: true -> false), update their properties
  const isBeingDeactivated =
    currentUser.isActive === true && isActive === false;

  if (isBeingDeactivated) {
    await prisma.property.updateMany({
      where: {
        ownerId: userId,
        status: {
          in: [PropertyStatus.APPROVED, PropertyStatus.IN_REVIEW],
        },
      },
      data: {
        status: PropertyStatus.INACTIVE,
        promoted: false,
      },
    });
  }

  try {
    const updateData: {
      email: string;
      name: string | null;
      role: Role;
      password?: string;
      isActive: boolean;
    } = {
      email,
      name,
      role,
      isActive,
    };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Send notification to agent if admin updated their profile
    // Skip if admin is updating themselves
    const currentAdmin = await getCurrentUserFromSession();
    if (
      updatedUser.role === Role.AGENT &&
      currentAdmin &&
      currentAdmin.id !== userId
    ) {
      const adminName = currentAdmin.name || currentAdmin.email;
      createNotification(
        userId,
        "Profile Updated",
        `Admin ${adminName} updated your profile`,
        "/profile"
      ).catch((error) => {
        console.error("Error creating notification:", error);
      });
    }

    revalidatePath("/users");

    return { success: true, user: toCurrentUser(updatedUser) };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        id: userId,
        email,
        name,
        role,
        password: undefined,
        isActive,
      },
    };
  }
}

/**
 * Server Action: Delete a user (admin)
 * @param id - The ID of the user
 * @returns The result of the deletion
 * all properties of the user are transferred to the current admin
 * @throws {Error} If the user is not an admin
 * @throws {Error} If the user ID is required
 * @throws {Error} If the current admin is not found
 * @throws {Error} If you cannot delete your own account
 * @throws {Error} If the user is not found
 * @throws {Error} If the user is not the current admin
 * @throws {Error} If the user is not the current admin
 */
export async function deleteUser(id: string) {
  await ensureAdminAccess();

  if (!id) {
    return {
      success: false,
      error: "User ID is required.",
    };
  }

  // Get current admin who is deleting the user
  const currentAdmin = await getCurrentUserFromSession();
  if (!currentAdmin) {
    return {
      success: false,
      error: "Unauthorized: Admin access required.",
    };
  }

  // Prevent deleting yourself
  if (currentAdmin.id === id) {
    return {
      success: false,
      error: "You cannot delete your own account.",
    };
  }

  try {
    // 1. Update all user's properties: set status to DELETED and transfer to current admin
    await prisma.property.updateMany({
      where: {
        ownerId: id,
      },
      data: {
        status: PropertyStatus.DELETED,
        promoted: false,
        ownerId: currentAdmin.id, // Transfer to the admin who is deleting
      },
    });

    // 2. Delete the user
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/users");
    revalidatePath("/proprietes-area");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}
