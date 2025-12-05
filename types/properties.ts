import { Prisma, PropertyType } from "@prisma/client";

/**
 * Type for property with owner information (id, name, email) and gallery images
 * Used for getPropertyById query result
 */
export type PropertyWithOwner = Prisma.PropertyGetPayload<{
  include: {
    owner: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
    gallery: true;
  };
}>;

/**
 * Type for property with gallery images only
 * Used for components that only need gallery data
 */
export type PropertyWithGallery = Prisma.PropertyGetPayload<{
  include: {
    gallery: true;
  };
}>;

export type FullProperty = PropertyWithOwner & PropertyWithGallery;

/**
 * Type for property filters
 * Used in usePropertyFilters hook and getAllProperties query
 * Prices are strings because they come from input fields
 */
export type PropertyFilters = {
  type?: PropertyType;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
};

/**
 * Property sort options array
 * Single source of truth for sort values
 */
export const PROPERTY_SORT_OPTIONS = [
  "createdAt_desc",
  "createdAt_asc",
  "price_asc",
  "price_desc",
  "area_asc",
  "area_desc",
] as const;

/**
 * Type for property sorting
 * Generated from PROPERTY_SORT_OPTIONS array
 * Format: field_order (e.g., "price_asc", "area_desc")
 */
export type PropertySort = (typeof PROPERTY_SORT_OPTIONS)[number];

/**
 * Result type for parsed sort string
 * Used by parsePropertySort function
 */
export type SortResult = {
  field: "price" | "area" | "createdAt";
  order: "asc" | "desc";
};
