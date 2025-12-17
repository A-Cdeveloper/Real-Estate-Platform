import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyStatus } from "@prisma/client";
import { InReviewProperty } from "@/types/properties";

/**
 * Optimized query for dashboard grid: In Review Properties
 * Returns only essential fields needed for the grid card
 * @param limit - Maximum number of properties to return (default: 10)
 * @returns Array of properties with minimal fields (id, name, createdAt, status)
 */
export async function getInReviewProperties(): Promise<InReviewProperty[]> {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.IN_REVIEW,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        type: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    throw new Error("Test error");

    return properties as InReviewProperty[];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
