import { z } from "zod";
import { emailSchema } from "./auth";

/**
 * Update profile schema (for user - no role)
 */
export const updateProfileSchema = z.object({
  email: emailSchema,
  name: z.string().nullable(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

