import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .refine((val) => val.length > 0, "Name is required")
    .refine((val) => val.length >= 2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Invalid email address"
    ),
  phone: z.string().optional(),
  message: z
    .string()
    .refine((val) => val.length > 0, "Message is required")
    .refine(
      (val) => val.length >= 10,
      "Message must be at least 10 characters"
    ),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
