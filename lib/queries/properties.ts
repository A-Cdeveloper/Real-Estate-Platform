import prisma from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/lib/prisma-errors";

/**
 * Get latest properties
 */
export async function getLatestProperties(take: number = 9) {
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
export async function getPromotedProperties(take: number = 9) {
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

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
