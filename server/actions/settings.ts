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
import { LOGO_ALLOWED_TYPES, LOGO_MAX_FILE_SIZE } from "@/lib/constants";
import { reverseGeocode } from "@/lib/geocoding";
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
    // Note: logo_dark, logo_light, and address are updated via separate actions
    const updateData = {
      appName: data.appName ?? existingSettings.appName,
      appDescription: data.appDescription ?? existingSettings.appDescription,
      phone: data.phone ?? existingSettings.phone,
      email: data.email ?? existingSettings.email,
      lat: data.lat ?? existingSettings.lat,
      lng: data.lng ?? existingSettings.lng,
      // Keep these for validation, but they're updated via separate actions
      address: data.address ?? existingSettings.address,
      logo_dark: data.logo_dark ?? existingSettings.logo_dark,
      logo_light: data.logo_light ?? existingSettings.logo_light,
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
export const uploadLogo = async (
  file: File,
  type: "dark" | "light"
): Promise<string | null> => {
  try {
    // Server-side validation
    if (
      !LOGO_ALLOWED_TYPES.includes(
        file.type as (typeof LOGO_ALLOWED_TYPES)[number]
      )
    ) {
      console.error("Invalid file type:", file.type);
      return null;
    }

    if (file.size > LOGO_MAX_FILE_SIZE) {
      console.error("File size too large:", file.size);
      return null;
    }

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

    // Update settings with logo URL for the specified type
    const existingSettings = await prisma.settings.findFirst();
    if (existingSettings) {
      await prisma.settings.update({
        where: { id: existingSettings.id },
        data: type === "dark" ? { logo_dark: url } : { logo_light: url },
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
export const removeLogo = async (type: "dark" | "light") => {
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
      data: type === "dark" ? { logo_dark: null } : { logo_light: null },
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

/**
 * Server Action: Update location
 */
export const updateLocation = async (
  lat: number,
  lng: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const existingSettings = await prisma.settings.findFirst();
    if (!existingSettings) {
      return { success: false, error: "Settings not found" };
    }

    // Get address from reverse geocoding
    const address = await reverseGeocode(lat, lng);

    // Update both coordinates and address in a single database call
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: {
        lat,
        lng,
        ...(address && { address }), // Only update address if geocoding was successful
      },
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating location:", error);
    return { success: false, error: "Failed to update location" };
  }
};
