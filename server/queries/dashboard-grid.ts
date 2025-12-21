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

/**
 * Get properties count grouped by price range for dashboard bar chart
 * Cached to prevent duplicate queries in the same request
 * Only includes APPROVED properties
 * Returns data formatted for recharts BarChart component (name, value)
 * Used in: PropertiesRangeChart -> BarPriceRange
 * @returns Array formatted for recharts: { name: string, value: number }[]
 */
export const getPropertiesPriceRangeCount = cache(
  async (): Promise<{ name: string; value: number }[]> => {
    try {
      // Get all approved properties with prices
      const properties = await prisma.property.findMany({
        where: {
          status: PropertyStatus.APPROVED,
        },
        select: {
          price: true,
        },
      });

      // Filter out any properties with null prices and ensure price is a number
      const propertiesWithPrice = properties
        .filter((p) => p.price !== null && typeof p.price === "number")
        .map((p) => ({ price: p.price as number }));

      // Define price ranges (in euros)
      const priceRanges = [
        { min: 0, max: 50000, label: "0-50k" },
        { min: 50000, max: 100000, label: "50k-100k" },
        { min: 100000, max: 200000, label: "100k-200k" },
        { min: 200000, max: 300000, label: "200k-300k" },
        { min: 300000, max: 500000, label: "300k-500k" },
        { min: 500000, max: Infinity, label: "500k+" },
      ];

      // Initialize count map for each range
      const rangeCounts = new Map<string, number>();
      priceRanges.forEach((range) => {
        rangeCounts.set(range.label, 0);
      });

      // Count properties in each range
      propertiesWithPrice.forEach((property) => {
        const price = property.price;
        for (const range of priceRanges) {
          if (price >= range.min && price < range.max) {
            const currentCount = rangeCounts.get(range.label) || 0;
            rangeCounts.set(range.label, currentCount + 1);
            break;
          }
        }
      });

      // Convert to array format for recharts
      return priceRanges.map((range) => ({
        name: range.label,
        value: rangeCounts.get(range.label) || 0,
      }));
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);

/**
 * Get properties count grouped by area size for dashboard bar chart
 * Cached to prevent duplicate queries in the same request
 * Only includes APPROVED properties
 * Returns data formatted for recharts BarChart component (name, value)
 * Used in: PropertiesRangeChart -> BarAreaSize
 * @returns Array formatted for recharts: { name: string, value: number }[]
 */
export const getPropertiesAreaSizeCount = cache(
  async (): Promise<{ name: string; value: number }[]> => {
    try {
      // Get all approved properties with area
      const properties = await prisma.property.findMany({
        where: {
          status: PropertyStatus.APPROVED,
        },
        select: {
          area: true,
        },
      });

      // Filter out any properties with null area and ensure area is a number
      const propertiesWithArea = properties
        .filter((p) => p.area !== null && typeof p.area === "number")
        .map((p) => ({ area: p.area as number }));

      // Define area size ranges (in square meters)
      const areaRanges = [
        { min: 0, max: 50, label: "0-50 m²" },
        { min: 50, max: 100, label: "50-100 m²" },
        { min: 100, max: 150, label: "100-150 m²" },
        { min: 150, max: 200, label: "150-200 m²" },
        { min: 200, max: 300, label: "200-300 m²" },
        { min: 300, max: Infinity, label: "300+ m²" },
      ];

      // Initialize count map for each range
      const rangeCounts = new Map<string, number>();
      areaRanges.forEach((range) => {
        rangeCounts.set(range.label, 0);
      });

      // Count properties in each range
      propertiesWithArea.forEach((property) => {
        const area = property.area;
        for (const range of areaRanges) {
          if (area >= range.min && area < range.max) {
            const currentCount = rangeCounts.get(range.label) || 0;
            rangeCounts.set(range.label, currentCount + 1);
            break;
          }
        }
      });

      // Convert to array format for recharts
      return areaRanges.map((range) => ({
        name: range.label,
        value: rangeCounts.get(range.label) || 0,
      }));
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);

/**
 * Get properties count grouped by date (createdAt) for timeline chart
 * Cached to prevent duplicate queries in the same request
 * Returns data formatted for recharts LineChart component
 * Used in: PropertiesTimeline -> LinePropertiesTimeline
 * @returns Array formatted for recharts: { name: string, value: number, date: Date }[]
 *          Sorted by date ascending
 */
export const getPropertiesTimelineData = cache(
  async (): Promise<Array<{ name: string; value: number; date: Date }>> => {
    try {
      // Get all properties with createdAt date
      const properties = await prisma.property.findMany({
        where: {
          status: PropertyStatus.APPROVED,
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // Group by date (day level)
      const dateMap = new Map<string, number>();

      properties.forEach((property) => {
        // Format date as YYYY-MM-DD
        const dateKey = property.createdAt.toISOString().split("T")[0];
        const currentCount = dateMap.get(dateKey) || 0;
        dateMap.set(dateKey, currentCount + 1);
      });

      // Convert to array and format for chart
      const timelineData = Array.from(dateMap.entries())
        .map(([dateKey, count]) => {
          const date = new Date(dateKey);
          // Format date for display (e.g., "Jan 15", "Feb 20")
          const month = date.toLocaleDateString("en-US", { month: "short" });
          const day = date.getDate();
          return {
            name: `${month} ${day}`,
            value: count,
            date: date,
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      return timelineData;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(getPrismaErrorMessage(error));
    }
  }
);
