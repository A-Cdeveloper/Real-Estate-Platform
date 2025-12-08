import { PropertyType } from "@prisma/client";
import { z } from "zod";

export const basePropertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(Object.values(PropertyType) as [string, ...string[]]),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  area: z.coerce.number().positive("Area must be positive"),
  address: z.string().min(1, "Address is required"),
  lat: z.coerce.number({
    error: "Please select a location on the map",
  }),
  lng: z.coerce.number({
    error: "Please select a location on the map",
  }),
});

export const createPropertySchema = basePropertySchema;

export const updatePropertySchema = basePropertySchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;
export type UpdatePropertyFormData = z.infer<typeof updatePropertySchema>;
