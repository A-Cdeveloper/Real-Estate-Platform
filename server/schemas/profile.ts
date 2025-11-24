import { z } from "zod";
import { emailSchema } from "./auth";

/**
 * Update profile schema (for user - no role)
 */
export const updateProfileSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
