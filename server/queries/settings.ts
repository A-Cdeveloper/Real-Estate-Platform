import prisma from "../prisma";
import { getPrismaErrorMessage } from "../prisma-errors";

/**
 * Get settings
 * @returns Settings
 * @throws Error if database error occurs
 * @throws Error if settings not found
 */
export async function getSettings() {
  try {
    // Settings is a singleton - there should only be one record
    const settings = await prisma.settings.findFirst();
    return settings;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
