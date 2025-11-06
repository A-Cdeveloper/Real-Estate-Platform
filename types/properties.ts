import { Prisma } from "@prisma/client";

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
