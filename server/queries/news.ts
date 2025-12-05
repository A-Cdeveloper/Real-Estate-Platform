import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { News } from "@prisma/client";
import { NEWS_PER_PAGE } from "@/lib/constants";
import { parseSort } from "@/lib/utils/parseSort";

/**
 * Get latest news
 * @param take - The number of news to return
 * @returns The latest news
 */
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
 *
 * @param page - The page number
 * @param limit - The number of news per page
 * @param sort - The sorting order
 * @returns
 */
export async function getAllNews({
  page = 1,
  limit = NEWS_PER_PAGE,
  sort = "createdAt_desc", // default sorting
}: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<{
  news: News[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  try {
    const orderBy = parseSort(sort);

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count(),
    ]);

    return {
      news,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get all news IDs
 * @returns The IDs of all news
 */
export async function getAllNewsIds() {
  try {
    const news = await prisma.news.findMany({
      select: { id: true },
      orderBy: { createdAt: "desc" },
    });
    return news.map((item) => item.id);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get recent news IDs (for static generation - limited)
 * Only generates static pages for the most recent news items
 * @param limit - The number of news to return
 * @returns The IDs of the recent news
 */
export async function getRecentNewsIds(limit: number = 30) {
  try {
    const news = await prisma.news.findMany({
      select: { id: true },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    return news.map((item) => item.id);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(getPrismaErrorMessage(error));
  }
}

/**
 * Get news by ID
 * @param id - The ID of the news
 * @returns The news item
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
