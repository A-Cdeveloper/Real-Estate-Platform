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
import { pinata } from "../pinata/config";
/**
 * App settings update
 */
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

/**
 * Upload logo
 */
export const uploadLogo = async (file: File): Promise<string | null> => {
  try {
    // First, upload the file to IPFS
    const uploadResult = await pinata.upload.public.file(file);
    const cid = uploadResult.cid;

    // Get file ID from upload result (if available) or use CID
    const fileId = uploadResult.id || cid;

    // Add file to group
    await pinata.groups.public.addFiles({
      groupId: "a4469711-f453-4073-a7d9-aa429a5d2601",
      files: [fileId],
    });

    // Convert CID to URL using gateway
    const url = await pinata.gateways.public.convert(cid);

    // Update settings with logo URL
    const existingSettings = await prisma.settings.findFirst();
    if (existingSettings) {
      await prisma.settings.update({
        where: { id: existingSettings.id },
        data: { logo: url },
      });
      revalidatePath("/settings");
    }

    return url;
  } catch (error) {
    console.error("Error uploading logo:", error);
    return null;
  }
};

/**
 * Server Action: Remove logo
 */

export const removeLogo = async () => {
  const existingSettings = await prisma.settings.findFirst();
  if (!existingSettings) {
    return {
      success: false,
      error: "Settings not found. Please create settings first.",
    };
  }
  try {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: { logo: "" },
    });
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
};
