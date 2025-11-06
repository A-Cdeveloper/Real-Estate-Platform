import prisma from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/lib/prisma-errors";
import {
  LATEST_PROPERTIES_COUNT,
  PROMOTED_PROPERTIES_COUNT,
} from "@/lib/constants";

/**
 * Get latest properties
 */

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
 * Get promoted properties (sorted by price desc)
 */
export async function getPromotedProperties(
  take: number = PROMOTED_PROPERTIES_COUNT
) {
  try {
    const properties = await prisma.property.findMany({
      take,
      orderBy: { price: "desc" },
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
 * Get property by ID
 */
export async function getPropertyById(id: string) {
  //await wait(3000);
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
