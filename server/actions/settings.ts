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
import { LOGO_ALLOWED_TYPES, LOGO_MAX_FILE_SIZE } from "@/lib/constants";
import { reverseGeocode } from "@/lib/geocoding";
import { ensureAdminAccess } from "../auth/ensureAdminAccess";
import { uploadImagePinata } from "./uploadImagePinata";
/**
 * App settings update
 * @param data - The data to update the settings with
 * @returns The result of the update
 */
export async function updateSettings(
  data: PartialUpdateSettings
): Promise<SettingsActionState<CurrentSettings>> {
  await ensureAdminAccess();
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
      facebook: data.facebook ?? existingSettings.facebook,
      instagram: data.instagram ?? existingSettings.instagram,
      x: data.x ?? existingSettings.x,
      linkedin: data.linkedin ?? existingSettings.linkedin,
      youtube: data.youtube ?? existingSettings.youtube,
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
 * @param file - The file to upload
 * @param type - The type of logo to upload
 * @returns The URL of the uploaded logo
 */
/**
 * Upload a logo image and update settings
 * @param file - The file to upload
 * @param type - The type of logo ("dark" or "light")
 * @returns The URL of the uploaded image, or null if upload failed
 */
export const uploadLogo = async (
  file: File,
  type: "dark" | "light"
): Promise<string | null> => {
  // Only admins can upload logos
  await ensureAdminAccess();

  // Upload the image using the shared upload function
  const url = await uploadImagePinata(
    file,
    LOGO_ALLOWED_TYPES,
    LOGO_MAX_FILE_SIZE,
    process.env.PINATA_LOGO_GROUP_ID || ""
  );

  if (!url) {
    return null;
  }

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
};

/**
 * Server Action: Remove logo
 * @param type - The type of logo to remove
 * @returns The result of the removal
 */
export const removeLogo = async (type: "dark" | "light") => {
  await ensureAdminAccess();
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
 * @param lat - The latitude to update
 * @param lng - The longitude to update
 * @returns The result of the update
 */
export const updateLocation = async (
  lat: number,
  lng: number
): Promise<{ success: boolean; error?: string }> => {
  await ensureAdminAccess();
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
