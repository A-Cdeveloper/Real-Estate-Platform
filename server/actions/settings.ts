"use server";

import { PartialUpdateSettings, CurrentSettings } from "@/types/settings";
import prisma from "../prisma";
import { getPrismaErrorMessage } from "../prisma-errors";
import {
  updateSettingsSchema,
  updateSettingsFormSchema,
} from "../schemas/settings";
import { formatZodErrors } from "../utils/zod";
import { revalidatePath } from "next/cache";
import { SettingsActionState } from "@/types/settings";

export async function updateSettings(
  data: PartialUpdateSettings
): Promise<SettingsActionState<CurrentSettings>> {
  // Validate partial data
  const partialResult = updateSettingsSchema.safeParse(data);

  if (!partialResult.success) {
    return {
      success: false,
      errors: formatZodErrors(partialResult.error),
    };
  }

  try {
    // Get existing settings
    const existingSettings = await prisma.settings.findFirst();

    if (!existingSettings) {
      return {
        success: false,
        error: "Settings not found. Please create settings first.",
      };
    }

    // Merge partial update with existing settings
    const updateData = {
      appName: data.appName ?? existingSettings.appName,
      appDescription: data.appDescription ?? existingSettings.appDescription,
      address: data.address ?? existingSettings.address,
      phone: data.phone ?? existingSettings.phone,
      email: data.email ?? existingSettings.email,
      logo: data.logo ?? existingSettings.logo,
    };

    // Validate merged data with full schema
    const fullValidation = updateSettingsFormSchema.safeParse(updateData);
    if (!fullValidation.success) {
      return {
        success: false,
        errors: formatZodErrors(fullValidation.error),
      };
    }

    // Update settings
    const updatedSettings = await prisma.settings.update({
      where: { id: existingSettings.id },
      data: updateData,
    });

    revalidatePath("/settings");

    return { success: true, settings: updatedSettings };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}
