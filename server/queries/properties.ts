import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import {
  LATEST_PROPERTIES_COUNT,
  PROMOTED_PROPERTIES_COUNT,
} from "@/lib/constants";
import { PropertyFilters, PropertySort } from "@/types/properties";
import { parsePropertySort } from "@/lib/utils/sortingParcer";

/**
 * Get latest properties
 */
export async function getLatestProperties(
  take: number = LATEST_PROPERTIES_COUNT
) {
  try {
    const properties = await prisma.property.findMany({
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
 * Get promoted properties (where promoted: true, sorted by createdAt desc)
 */
export async function getPromotedProperties(
  take: number = PROMOTED_PROPERTIES_COUNT
) {
  try {
    const properties = await prisma.property.findMany({
      where: { promoted: true },
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
 */

export async function getAllProperties(
  take: number = 12,
  skip: number = 0,
  filters?: PropertyFilters,
  sort?: PropertySort
) {
  try {
    const minPrice = filters?.minPrice ? Number(filters.minPrice) : undefined;
    const maxPrice = filters?.maxPrice ? Number(filters.maxPrice) : undefined;

    const where = {
      ...(filters?.type && { type: filters.type }),
      ...(filters?.location && {
        address: { contains: filters.location },
      }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      }),
    };

    const { field, order } = parsePropertySort(sort);
    const orderBy = { [field]: order } as { [key: string]: "asc" | "desc" };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        take,
        skip,
        where,
        orderBy,
      }),
      prisma.property.count({ where }),
    ]);

    return {
      properties,
      total,
      hasMore: skip + take < total,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get recent property IDs (for static generation - limited)
 * Only generates static pages for the most recent properties
 */
export async function getRecentPropertyIds(limit: number = 50) {
  try {
    const properties = await prisma.property.findMany({
      select: { id: true },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    return properties.map((item) => item.id);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get property by ID
 */
export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
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
 */
export async function getPropertyStats() {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [total, addedLastWeek, propertiesWithArea] = await Promise.all([
      // Total count
      prisma.property.count(),
      // Count added in last week
      prisma.property.count({
        where: {
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      }),
      // Get properties with area for average calculation
      prisma.property.findMany({
        where: {
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
