import { z } from "zod";

export const baseNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const createNewsSchema = baseNewsSchema;

export const updateNewsSchema = baseNewsSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

export type CreateNewsFormData = z.infer<typeof createNewsSchema>;
export type UpdateNewsFormData = z.infer<typeof updateNewsSchema>;
