"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { ProfileActionState, UpdateProfile } from "@/types/profile";
import { CurrentUser } from "@/types/user";
import { revalidatePath } from "next/cache";
import { hashPassword } from "../auth/password";
import { deleteSession, getSession } from "../auth/session";
import { updateProfileSchema } from "../schemas/profile";
import { formatZodErrors } from "../utils/zod";
import { PropertyStatus, Role } from "@prisma/client";
import { MASTER_ADMIN_EMAIL } from "@/lib/constants";
import { getCurrentUserFromSession } from "../auth/getCurrentUserFromSession";
import { createNotificationForAdmins } from "../utils/notifications";

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Server Action: Update user profile (no role change)
 * @param prevState - The previous state of the profile
 * @param formData - The form data containing the profile information
 * @returns The result of the update
 */
export async function updateProfile(
  prevState: ProfileActionState<UpdateProfile> | null,
  formData: FormData
): Promise<ProfileActionState<UpdateProfile> | null> {
  // Get user ID from session
  const session = await getSession();
  if (!session?.userId) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  const rawData = {
    email: formData.get("email"),
    name: formData.get("name") || null,
    password: formData.get("password") || undefined,
  };

  const result = updateProfileSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: session.userId,
        email: String(rawData.email || ""),
        name: rawData.name ? String(rawData.name) : null,
        password: undefined,
      },
    };
  }

  const { email, name, password } = result.data;
  const userId = session.userId;

  try {
    const updateData: {
      email: string;
      name: string | null;
      password?: string;
    } = {
      email,
      name,
    };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/profile");
    revalidatePath("/users");

    // Remove sensitive fields
    const currentUser: CurrentUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
      isOnline: updatedUser.isOnline,
    };

    return { success: true, user: currentUser };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        id: userId,
        email,
        name,
        password: undefined,
      },
    };
  }
}

/**
 * Server Action: Delete user profile
 * All properties of the user are transferred to master admin and set to DELETED status
 * Master admin cannot delete their own profile
 * @returns The result of the deletion
 */
export async function deleteProfile() {
  const session = await getSession();
  const userId = session?.userId;
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  // Get current user to check if they are master admin
  const currentUser = await getCurrentUserFromSession();
  if (!currentUser) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  // Prevent master admin from deleting their own profile
  if (currentUser.email === MASTER_ADMIN_EMAIL) {
    return {
      success: false,
      error: "Master admin cannot delete their own profile.",
    };
  }

  try {
    // Save user data before deleting (needed for notifications)
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true },
    });

    if (!userToDelete) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    // Find master admin
    const masterAdmin = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
        email: MASTER_ADMIN_EMAIL,
      },
      select: { id: true },
    });

    if (!masterAdmin) {
      return {
        success: false,
        error: "Master admin not found. Cannot delete profile.",
      };
    }

    // 1. Update all user's properties: set status to DELETED and transfer to master admin
    await prisma.property.updateMany({
      where: {
        ownerId: userId,
      },
      data: {
        status: PropertyStatus.DELETED,
        promoted: false,
        ownerId: masterAdmin.id, // Transfer to master admin
      },
    });

    // 2. Send notification to admins if agent deleted their profile
    if (userToDelete.role === Role.AGENT) {
      const agentName = userToDelete.name || userToDelete.email;
      createNotificationForAdmins(
        "Profile Deleted",
        `Agent ${agentName} deleted their profile`,
        "/users"
      ).catch((error) => {
        console.error("Error creating notification:", error);
      });
    }

    // 3. Delete session FIRST (before deleting user)
    await deleteSession();

    // 4. Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/profile");
    revalidatePath("/users");
    revalidatePath("/proprietes-area");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: getPrismaErrorMessage(error) };
  }
}
