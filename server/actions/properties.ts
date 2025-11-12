"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new property
 */
export async function createProperty(data: {
  name: string;
  price: number;
  area?: number;
  address?: string;
  image?: string;
  ownerId: string;
}) {
  try {
    const property = await prisma.property.create({
      data,
    });

    revalidatePath("/");
    revalidatePath("/proprietes");

    return { success: true, property };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}

/**
 * Server Action: Update a property
 */
export async function updateProperty(
  id: string,
  data: {
    name?: string;
    price?: number;
    area?: number;
    address?: string;
    image?: string;
  }
) {
  try {
    const property = await prisma.property.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/proprietes");
    revalidatePath(`/proprietes/${id}`);

    return { success: true, property };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}

/**
 * Server Action: Delete a property
 */
export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/proprietes");

    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}
