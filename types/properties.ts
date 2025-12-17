import { Prisma, Property, PropertyType, PropertyStatus } from "@prisma/client";
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
 * Contains all possible filters for both frontend and backend
 * Prices are strings because they come from input fields
 */
export type PropertyFilters = {
  // Frontend filters
  type?: PropertyType;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  // Backend filters
  status?: PropertyStatus;
  ownerId?: string;
  promoted?: boolean;
};

/**
 * Types for property actions
 */

export type AddProperty = Pick<
  Property,
  "name" | "type" | "price" | "area" | "address" | "description"
>;
export type UpdateProperty = AddProperty & { id: string };
export type DeleteProperty = Pick<Property, "id">;

export type PropertyActionState<TData = unknown> = ActionState<
  TData,
  { property?: Property }
>;

/**
 * Optimized type for latest properties and promoted properties
 * Contains only essential fields needed for grid card display
 */
export type LatestProperty = Pick<
  Property,
  "id" | "name" | "image" | "address" | "area" | "price" | "status"
>;

export type PromotedProperty = LatestProperty & { promoted: boolean };

/********************************************************************** */

/**********************************************************************
 * Dashboard Grid
 **********************************************************************/
/**
 * Optimized type for dashboard grid: In Review Properties
 * Contains only essential fields needed for grid card display
 */
export type InReviewProperty = Pick<
  PropertyWithOwner,
  "id" | "name" | "createdAt" | "type" | "address"
> & {
  owner: {
    id: string;
    name: string;
  };
};
