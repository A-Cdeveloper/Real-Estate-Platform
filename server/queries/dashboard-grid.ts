import { cache } from "react";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyStatus } from "@prisma/client";
import { InReviewProperty } from "@/types/properties";

/**
 * Optimized query for dashboard grid: In Review Properties
 * Cached to prevent duplicate queries in the same request
 * Returns only essential fields needed for the grid card
 * Client component handles filtering based on search params
 * @returns Array of properties with minimal fields (id, name, createdAt, type, owner)
 */
export const getInReviewProperties = cache(
  async (): Promise<InReviewProperty[]> => {
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
        take: 200, // Reasonable limit for client-side filtering
      });

      return properties as InReviewProperty[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);
