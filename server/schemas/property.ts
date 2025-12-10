import { PropertyType, PropertyStatus } from "@prisma/client";
import { z } from "zod";

const galleryItemSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Image URL is invalid"),
  alt: z.string().optional(),
  order: z.coerce.number().nonnegative(),
});

export const gallerySchema = z.array(galleryItemSchema);

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
  gallery: z.array(galleryItemSchema).min(1, "At least one image is required"),
});

export const createPropertySchema = basePropertySchema;

export const updatePropertySchema = basePropertySchema.extend({
  id: z.string().min(1, "ID is required"),
  status: z
    .enum(Object.values(PropertyStatus) as [string, ...string[]])
    .optional(),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;
export type UpdatePropertyFormData = z.infer<typeof updatePropertySchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type PropertyGallery = z.infer<typeof gallerySchema>;
