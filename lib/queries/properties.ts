import prisma from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/lib/prisma-errors";
import {
  LATEST_PROPERTIES_COUNT,
  PROMOTED_PROPERTIES_COUNT,
} from "@/lib/constants";

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
 * Get all properties with pagination
 */

export async function getAllProperties(take: number = 12, skip: number = 0) {
  try {
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count(),
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
