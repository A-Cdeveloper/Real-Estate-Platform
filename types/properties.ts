import { Prisma, Property, PropertyType } from "@prisma/client";
import { ActionState } from "./action-state";

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
 * Types for property actions
 */

export type AddProperty = Pick<
  Property,
  "name" | "type" | "price" | "area" | "address" | "image" | "description"
>;
export type UpdateProperty = AddProperty & { id: string };
export type DeleteProperty = Pick<Property, "id">;

export type PropertyActionState<TData = unknown> = ActionState<
  TData,
  { property?: Property }
>;
