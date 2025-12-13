import {
  LATEST_PROPERTIES_COUNT,
  PROMOTED_PROPERTIES_COUNT,
} from "@/lib/constants";
import { parseSort } from "@/lib/utils/parseSort";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyFilters } from "@/types/properties";
import { PropertyStatus } from "@prisma/client";
import { requireAuth, requireOwnerOrAdmin } from "../auth/ownership";

/**
 * Get latest properties
 * @param take - The number of properties to return
 * @returns The latest properties
 */
export async function getLatestProperties(
  take: number = LATEST_PROPERTIES_COUNT
) {
  try {
    const properties = await prisma.property.findMany({
      take,
      orderBy: { createdAt: "desc" },
      where: { status: "APPROVED" },
    });
    return properties;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get promoted properties (where promoted: true, sorted by createdAt desc)
 * @param take - The number of properties to return
 * @returns The promoted properties
 */
export async function getPromotedProperties(
  take: number = PROMOTED_PROPERTIES_COUNT
) {
  try {
    const properties = await prisma.property.findMany({
      where: { promoted: true, status: "APPROVED" },
      take,
      orderBy: { createdAt: "desc" },
    });
    return properties;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get all properties with pagination and filters
 *
 * This function can be used in two modes:
 * 1. Frontend mode (default): Returns only APPROVED properties without relations
 * 2. Backend mode: Returns all properties (any status) with owner and gallery relations
 *
 * @param page - The page number (default: 1)
 * @param limit - The number of properties per page (default: 12)
 * @param filters - Optional filters to apply. Contains all filters for both frontend and backend:
 *                  - Frontend: type, location, minPrice, maxPrice
 *                  - Backend: type, status, ownerId, promoted
 * @param sort - The sorting order (default: "createdAt_desc")
 * @param includeRelations - If true, includes owner and gallery relations.
 *                           Used by backend to display full property data.
 *                           Default: false (frontend doesn't need relations)
 * @param status - Optional status filter (backward compatibility).
 *                 Prefer using filters.status instead.
 *                 If not provided:
 *                 - Frontend: defaults to APPROVED (only shows approved properties)
 *                 - Backend: undefined (shows all properties regardless of status)
 * @param ownerId - Optional owner filter (backward compatibility).
 *                  Prefer using filters.ownerId instead.
 *
 * @returns Object containing:
 *   - properties: Array of properties (with or without relations based on includeRelations)
 *   - total: Total number of properties matching the filters
 *   - page: Current page number
 *   - limit: Number of items per page
 *   - totalPages: Total number of pages
 *
 * @example
 * // Frontend usage (default - only APPROVED properties, no relations)
 * const { properties } = await getAllProperties({
 *   page: 1,
 *   limit: 12,
 *   filters: { type: "Apartment", location: "Belgrade" },
 *   sort: "price_asc"
 * });
 *
 * @example
 * // Backend usage (all properties with relations)
 * const { properties } = await getAllProperties({
 *   page: 1,
 *   limit: 10,
 *   includeRelations: true
 *   // filters.status not provided = shows all statuses (APPROVED, IN_REVIEW, REJECTED)
 * });
 *
 * @example
 * // Backend usage with filters (only IN_REVIEW properties with relations)
 * const { properties } = await getAllProperties({
 *   page: 1,
 *   limit: 10,
 *   includeRelations: true,
 *   filters: { status: PropertyStatus.IN_REVIEW, type: "House" }
 * });
 *
 * @example
 * // Backend usage with all filters
 * const { properties } = await getAllProperties({
 *   page: 1,
 *   limit: 10,
 *   includeRelations: true,
 *   filters: {
 *     status: PropertyStatus.APPROVED,
 *     type: "Apartment",
 *     ownerId: "user-id",
 *     promoted: true
 *   }
 * });
 */
export async function getAllProperties({
  page = 1,
  limit = 12,
  filters,
  sort = "createdAt_desc",
  includeRelations = false,
  status,
  ownerId,
}: {
  page?: number;
  limit?: number;
  filters?: PropertyFilters;
  sort?: string;
  includeRelations?: boolean;
  status?: PropertyStatus;
  ownerId?: string;
}): Promise<{
  properties: Awaited<ReturnType<typeof prisma.property.findMany>>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: PropertyFilters;
}> {
  try {
    const minPrice = filters?.minPrice ? Number(filters.minPrice) : undefined;
    const maxPrice = filters?.maxPrice ? Number(filters.maxPrice) : undefined;

    // Build where clause with filters
    // Prefer filters over direct params for backward compatibility
    const where = {
      // Type filter (works for both frontend and backend)
      ...(filters?.type && { type: filters.type }),
      // Location filter (frontend only)
      ...(filters?.location && {
        address: { contains: filters.location },
      }),
      // Price filters (frontend only)
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      }),
      // Status filter: prefer filters.status, fallback to status param, then default logic
      status:
        filters?.status ??
        status ??
        (includeRelations ? undefined : PropertyStatus.APPROVED),
      // Owner filter: prefer filters.ownerId, fallback to ownerId param
      ...((filters?.ownerId || ownerId) && {
        ownerId: filters?.ownerId ?? ownerId,
      }),
      // Promoted filter (backend only)
      ...(filters?.promoted !== undefined && { promoted: filters.promoted }),
    };

    const parsedSort = parseSort(sort);
    const sortField = Object.keys(parsedSort)[0];

    // Always add createdAt_desc as secondary sort, unless createdAt is already the primary sort
    const orderBy =
      sortField === "createdAt"
        ? [parsedSort]
        : [parsedSort, { createdAt: "desc" as const }];

    // Build query - use conditional logic for include relations
    const [properties, total] = await Promise.all([
      includeRelations
        ? prisma.property.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
              owner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              gallery: {
                orderBy: { order: "asc" },
              },
            },
          })
        : prisma.property.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
          }),
      prisma.property.count({ where }),
    ]);

    return {
      properties,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filters: filters ?? {},
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get recent property IDs (for static generation - limited)
 * Only generates static pages for the most recent properties
 * @param limit - The number of properties to return
 * @returns The IDs of the recent properties
 */
export async function getRecentPropertyIds(limit: number = 50) {
  try {
    const properties = await prisma.property.findMany({
      select: { id: true },
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { status: "APPROVED" },
    });
    return properties.map((item) => item.id);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get property by ID For Frontend Only
 * @param id - The ID of the property
 * @returns The property
 */
export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id, status: PropertyStatus.APPROVED },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        gallery: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    return property;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get property statistics
 * Returns: total listings, average price per m², and count added in last week
 * @returns The property statistics
 */
export async function getPropertyStats() {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [total, addedLastWeek, propertiesWithArea] = await Promise.all([
      // Total count
      prisma.property.count({
        where: { status: PropertyStatus.APPROVED },
      }),
      // Count added in last week
      prisma.property.count({
        where: {
          status: PropertyStatus.APPROVED,
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      }),
      // Get properties with area for average calculation
      prisma.property.findMany({
        where: {
          status: PropertyStatus.APPROVED,
          area: {
            not: null,
          },
        },
        select: {
          price: true,
          area: true,
        },
      }),
    ]);

    // Calculate average price per m²
    let avgPricePerSqm = 0;
    if (propertiesWithArea.length > 0) {
      const totalPricePerSqm = propertiesWithArea.reduce((sum, prop) => {
        return sum + prop.price / (prop.area || 1);
      }, 0);
      avgPricePerSqm = totalPricePerSqm / propertiesWithArea.length;
    }

    return {
      total,
      avgPricePerSqm: Math.round(avgPricePerSqm),
      addedLastWeek,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/*
  Get property by ID For Backend Only
  @param id - The ID of the property
  @param checkOwner - If true, check if the current user is the owner of the property
  @returns The property
*/

export async function getPropertyByIdAdmin(id: string) {
  const user = await requireAuth();

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      gallery: { orderBy: { order: "asc" } },
    },
  });

  if (!property) throw new Error("Property not found");

  await requireOwnerOrAdmin(property, user);

  return property;
}
