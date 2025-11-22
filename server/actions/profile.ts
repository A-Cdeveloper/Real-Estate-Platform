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

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Server Action: Update user profile (no role change)
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
 */

//

export async function deleteProfile() {
  const session = await getSession();
  const userId = session?.userId;
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    await deleteSession();
    revalidatePath("/profile");
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: getPrismaErrorMessage(error) };
  }
}
