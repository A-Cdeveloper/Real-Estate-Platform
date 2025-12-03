"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";
import {
  createNewsSchema,
  updateNewsSchema,
  type CreateNewsFormData,
  type UpdateNewsFormData,
} from "../schemas/news";
import { formatZodErrors } from "../utils/zod";
import { ensureAdminAccess } from "../auth/ensureAdminAccess";
import { NewsActionState } from "@/types/news";
import {
  NEWS_IMAGE_ALLOWED_TYPES,
  NEWS_IMAGE_MAX_FILE_SIZE,
} from "@/lib/constants";
import { uploadImagePinata } from "./uploadImagePinata";

/**
 * Helper function to parse news form data from FormData
 * @param formData - The form data containing the news information
 * @returns The parsed news data
 */
function parseNewsFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image") || undefined,
  };
}

/**
 * Server Action: Create a new news item
 * @param prevState - The previous state of the news
 * @param formData - The form data containing the news information
 * @returns The result of the creation
 */
export async function addNews(
  prevState: NewsActionState<CreateNewsFormData> | null,
  formData: FormData
): Promise<NewsActionState<CreateNewsFormData> | null> {
  await ensureAdminAccess();
  const rawData = parseNewsFormData(formData);
  const result = createNewsSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        title: rawData.title as string,
        description: rawData.description as string,
        image: rawData.image as string | undefined,
      },
    };
  }

  const { title, description, image } = result.data;

  try {
    const newNews = await prisma.news.create({
      data: {
        title,
        description,
        image: image || null,
      },
    });
    revalidatePath("/news");

    return { success: true, news: newNews };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        title: rawData.title as string,
        description: rawData.description as string,
        image: rawData.image as string | undefined,
      },
    };
  }
}

/**
 * Server Action: Update an existing news item
 * @param prevState - The previous state of the news
 * @param formData - The form data containing the news information
 * @returns The result of the update
 */
export async function updateNews(
  prevState: NewsActionState<UpdateNewsFormData> | null,
  formData: FormData
): Promise<NewsActionState<UpdateNewsFormData> | null> {
  await ensureAdminAccess();
  const newsId = formData.get("id") as string;
  if (!newsId) {
    return {
      success: false,
      error: "News ID is required.",
    };
  }

  const rawData = parseNewsFormData(formData);
  const result = updateNewsSchema.safeParse({
    id: newsId,
    ...rawData,
  });

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: newsId,
        title: rawData.title as string | undefined,
        description: rawData.description as string | undefined,
        image: rawData.image as string | undefined,
      },
    };
  }

  const { title, description, image } = result.data;

  try {
    const updateData: {
      title?: string;
      description?: string;
      image?: string | null;
    } = {};

    if (title !== undefined) {
      updateData.title = title;
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (image !== undefined) {
      updateData.image = image || null;
    }

    const updatedNews = await prisma.news.update({
      where: { id: newsId },
      data: updateData,
    });
    revalidatePath("/news");

    return { success: true, news: updatedNews };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        id: newsId,
        title: rawData.title as string | undefined,
        description: rawData.description as string | undefined,
        image: rawData.image as string | undefined,
      },
    };
  }
}

/**
 * Server Action: Delete a news item
 * @param id - The ID of the news item
 * @returns The result of the deletion
 */
export async function deleteNews(id: string) {
  await ensureAdminAccess();
  try {
    await prisma.news.delete({
      where: { id },
    });
    revalidatePath("/news");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}

/**
 * Upload a news image and update the news item
 * @param file - The file to upload
 * @param newsId - The ID of the news item to update
 * @returns The URL of the uploaded image, or null if upload failed
 */
export const uploadNewsImage = async (
  file: File,
  newsId: string
): Promise<string | null> => {
  // Upload the image using the shared upload function
  const url = await uploadImagePinata(
    file,
    NEWS_IMAGE_ALLOWED_TYPES,
    NEWS_IMAGE_MAX_FILE_SIZE,
    process.env.PINATA_NEWS_IMAGE_GROUP_ID || ""
  );

  if (!url) {
    return null;
  }

  // Update news item with the new image URL
  try {
    await prisma.news.update({
      where: { id: newsId },
      data: { image: url },
    });
    revalidatePath("/news");
  } catch (error) {
    console.error("Error updating news image:", error);
    return null;
  }

  return url;
};

/**
 * Remove a news image
 * @param newsId - The ID of the news item
 * @returns The result of the removal
 */
export const removeNewsImage = async (newsId: string) => {
  await ensureAdminAccess();
  try {
    await prisma.news.update({
      where: { id: newsId },
      data: { image: null },
    });
    revalidatePath("/news");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
};
