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
    .min(1, "Address is required")
    .max(200, "Address must be less than 200 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(50, "Phone must be less than 50 characters"),
  email: emailSchema,
  logo: z.string().nullish(), // Optional logo URL or path (can be null or undefined)
});

export type UpdateSettingsFormData = z.infer<typeof updateSettingsFormSchema>;

// Partial schema for single-field updates (auto-save)
export const updateSettingsSchema = updateSettingsFormSchema.partial();
