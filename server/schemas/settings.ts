import { z } from "zod";
import { emailSchema } from "./auth";

/**
 * Update Settings schema - for application-wide configuration
 */
export const updateSettingsFormSchema = z.object({
  appName: z
    .string()
    .min(1, "App name is required")
    .max(100, "App name must be less than 100 characters"),
  appDescription: z
    .string()
    .min(1, "App description is required")
    .max(500, "App description must be less than 500 characters"),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .nullish(), // Optional - updated via map click (reverse geocoding)
  lat: z.number().optional(),
  lng: z.number().optional(),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(50, "Phone must be less than 50 characters"),
  email: emailSchema,
  logo_dark: z.string().nullish(), // Optional dark mode logo URL or path (can be null or undefined)
  logo_light: z.string().nullish(), // Optional light mode logo URL or path (can be null or undefined)
});

export type UpdateSettingsFormData = z.infer<typeof updateSettingsFormSchema>;

// Partial schema for single-field updates (auto-save)
export const updateSettingsSchema = updateSettingsFormSchema.partial();
