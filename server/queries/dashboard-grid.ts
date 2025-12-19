import { cache } from "react";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyStatus, PropertyType, Role } from "@prisma/client";
import { InReviewProperty } from "@/types/properties";
import { OnlineUser } from "@/types/user";

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
          address: true,
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

/**
 * Optimized query for dashboard grid: Online Users
 * Cached to prevent duplicate queries in the same request
 * Returns only essential fields needed for the grid card
 * Client component handles filtering based on search params
 * @returns Array of users with minimal fields (id, name, email, lastLogin, isOnline)
 */

export const getOnlineUsers = cache(async (): Promise<OnlineUser[]> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isOnline: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastLogin: true,
        isOnline: true,
        role: true,
      },
      orderBy: {
        lastLogin: "desc",
      },
      take: 200,
    });
    return users as OnlineUser[];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
});

/**
 * Get properties count grouped by status for dashboard pie chart
 * Cached to prevent duplicate queries in the same request
 * Returns data formatted for recharts PieChart component (name, value)
 * Used in: ProprietesPiesTabs -> StatusPieChart
 * @returns Array formatted for recharts: { name: string, value: number }[]
 */
export const getPropertiesStatusCountForPie = cache(
  async (): Promise<{ name: string; value: number }[]> => {
    try {
      const statusCounts = await prisma.property.groupBy({
        by: ["status"],
        _count: {
          id: true,
        },
      });

      return statusCounts.map((item) => ({
        name: item.status,
        value: item._count.id,
      }));
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);

/**
 * Get properties count grouped by type for dashboard pie chart
 * Cached to prevent duplicate queries in the same request
 * Returns data formatted for recharts PieChart component (name, value)
 * Used in: ProprietesPiesTabs -> TypePieChart
 * @returns Array formatted for recharts: { name: string, value: number }[]
 */
export const getPropertiesTypeCountForPie = cache(
  async (): Promise<{ name: string; value: number }[]> => {
    try {
      const typeCounts = await prisma.property.groupBy({
        by: ["type"],
        _count: {
          id: true,
        },
        where: {
          type: {
            not: null,
          },
        },
      });

      return typeCounts.map((item) => ({
        name: item.type as PropertyType,
        value: item._count.id,
      }));
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);

/**
 * Get properties count grouped by location (first part of address) for dashboard bar chart
 * Cached to prevent duplicate queries in the same request
 * Extracts location from address (first part before comma, or first word)
 * Returns data formatted for recharts BarChart component (name, value)
 * Used in: ProprietesChartsTabs -> BarProprietesLocation
 * @returns Array formatted for recharts: { name: string, value: number }[] (top 5 locations, sorted by count descending)
 */
export const getPropertiesLocationCountForBar = cache(
  async (): Promise<{ name: string; value: number }[]> => {
    try {
      const properties = await prisma.property.findMany({
        where: {
          address: {
            not: null,
          },
          status: {
            notIn: [PropertyStatus.DELETED, PropertyStatus.INACTIVE],
          },
        },
        select: {
          address: true,
        },
      });

      // Group by location (first part of address before comma, or first word)
      const locationMap = new Map<string, number>();

      properties.forEach((property) => {
        if (!property.address) return;

        // Extract location: first part before comma, or first word
        const location =
          property.address.split(",")[0].trim() ||
          property.address.split(" ")[0].trim();

        if (location) {
          locationMap.set(location, (locationMap.get(location) || 0) + 1);
        }
      });

      // Convert to array formatted for recharts and sort by count descending
      return Array.from(locationMap.entries())
        .map(([location, count]) => ({ name: location, value: count }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Top 5 locations
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);

/**
 * Get top 5 users by total properties count with properties grouped by status
 * Cached to prevent duplicate queries in the same request
 * Returns data formatted for recharts StackedBarChart component
 * Used in: TopUserByProprietes -> StackedBarChart
 * @returns Array formatted for stacked bar chart: { name: string, APPROVED: number, IN_REVIEW: number, REJECTED: number, INACTIVE: number, DELETED: number }[]
 */
export const getTopUsersByPropertiesCount = cache(
  async (): Promise<
    Array<{
      name: string;
      APPROVED: number;
      IN_REVIEW: number;
      REJECTED: number;
      INACTIVE: number;
      DELETED: number;
    }>
  > => {
    try {
      // Get all agents with their properties grouped by status
      const users = await prisma.user.findMany({
        where: {
          role: Role.AGENT,
        },
        select: {
          id: true,
          name: true,
          email: true,
          properties: {
            select: {
              status: true,
            },
          },
        },
      });

      // Process data: group properties by status for each user
      const userStats = users.map((user) => {
        const statusCounts = {
          APPROVED: 0,
          IN_REVIEW: 0,
          REJECTED: 0,
          INACTIVE: 0,
          DELETED: 0,
        };

        user.properties.forEach((property) => {
          statusCounts[property.status] =
            (statusCounts[property.status] || 0) + 1;
        });

        return {
          id: user.id,
          name: user.name || user.email,
          total: user.properties.length,
          ...statusCounts,
        };
      });

      // Sort by total properties count descending and take top 5
      const topUsers = userStats
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
        .map(({ id, total, ...rest }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _ = { id, total };
          return rest;
        });

      return topUsers;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);
