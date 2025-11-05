import prisma from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/lib/prisma-errors";

/**
 * Get latest news
 */

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getLatestNews(take: number = 5) {
  try {
    const news = await prisma.news.findMany({
      take,
      orderBy: { createdAt: "desc" },
    });
    return news;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get all news with pagination
 */
export async function getAllNews(take: number = 12, skip: number = 0) {
  try {
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.news.count(),
    ]);

    return {
      news,
      total,
      hasMore: skip + take < total,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get news by ID
 */
export async function getNewsById(id: string) {
  try {
    const newsItem = await prisma.news.findUnique({
      where: { id },
    });

    if (!newsItem) {
      throw new Error("News not found");
    }

    return newsItem;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}
