"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new property
 * @param data - The data to create the property with
 * @returns The result of the creation
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
 * @param id - The ID of the property
 * @param data - The data to update the property with
 * @returns The result of the update
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
 * @param id - The ID of the property
 * @returns The result of the deletion
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

/**
 * Server Action: Promote a property
 * @param id - The ID of the property
 * @returns The result of the promotion
 */
export async function promoteProperty(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    return { success: false, error: "Property not found" };
  }

  const newPromoted = !property.promoted;
  try {
    await prisma.property.update({
      where: { id },
      data: { promoted: newPromoted },
    });
    revalidatePath("/");
    revalidatePath("/proprietes");
    revalidatePath(`/proprietes/${id}`);
    revalidatePath(`/proprietes-area`);
    return { success: true, promoted: newPromoted };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
    };
  }
}
