"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";
import {
  createPropertySchema,
  CreatePropertyFormData,
} from "../schemas/property";
import { formatZodErrors } from "../utils/zod";
import { getCurrentUserFromSession } from "../auth/getCurrentUserFromSession";
import { PropertyActionState } from "@/types/properties";
import { PropertyType } from "@prisma/client";

/**
 * Helper function to parse property form data from FormData
 * @param formData - The form data containing the property information
 * @returns The parsed property data
 */
function parsePropertyFormData(formData: FormData) {
  return {
    name: formData.get("name"),
    type: formData.get("type"),
    price: formData.get("price"),
    area: formData.get("area"),
    address: formData.get("address"),
    description: formData.get("description"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
  };
}

/**
 * Server Action: Create a new property
 * @param prevState - The previous state of the property
 * @param formData - The form data containing the property information
 * @returns The result of the creation
 *
 */
export async function createProperty(
  prevState: PropertyActionState<CreatePropertyFormData> | null,
  formData: FormData
): Promise<PropertyActionState<CreatePropertyFormData> | null> {
  const currentUser = await getCurrentUserFromSession();
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  const rawData = parsePropertyFormData(formData);
  const result = createPropertySchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        name: (rawData.name as string) || "",
        type: rawData.type as PropertyType,
        description: (rawData.description as string) || "",
        price: Number(rawData.price) || 0,
        area: Number(rawData.area) || 0,
        address: (rawData.address as string) || "",
        lat: rawData.lat ? Number(rawData.lat) : 0,
        lng: rawData.lng ? Number(rawData.lng) : 0,
      },
    };
  }

  const { name, type, price, area, address, description, lat, lng } =
    result.data;

  try {
    const property = await prisma.property.create({
      data: {
        name,
        type: type as PropertyType,
        price,
        area,
        address,
        description,
        lat,
        lng,
        image: null,
        ownerId: currentUser.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/proprietes");
    revalidatePath("/proprietes-area");

    return { success: true, property };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        name: (rawData.name as string) || "",
        type: rawData.type as PropertyType,
        description: (rawData.description as string) || "",
        price: Number(rawData.price) || 0,
        area: Number(rawData.area) || 0,
        address: (rawData.address as string) || "",
        lat: rawData.lat ? Number(rawData.lat) : 0,
        lng: rawData.lng ? Number(rawData.lng) : 0,
      },
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
  const currentUser = await getCurrentUserFromSession();
  if (!currentUser) {
    return { success: false, error: "Please login to delete a property" };
  }

  if (!id) {
    return { success: false, error: "Property ID is required" };
  }

  const property = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    return { success: false, error: "Property not found" };
  }

  if (property.ownerId !== currentUser.id) {
    return { success: false, error: "You are not the owner of this property" };
  }

  try {
    await prisma.property.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/proprietes");
    revalidatePath("/proprietes-area");

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

/**
 * Server Action: Update property location
 * @param id - The ID of the property
 * @param lat - The latitude to update
 * @param lng - The longitude to update
 * @returns The result of the update
 */
// export const updatePropertyLocation = async (
//   id: string,
//   lat: number,
//   lng: number
// ): Promise<{ success: boolean; error?: string }> => {
//   const currentUser = await getCurrentUserFromSession();
//   if (!currentUser) {
//     return { success: false, error: "Unauthorized" };
//   }

//   try {
//     // Check if property exists and user has permission
//     const property = await prisma.property.findUnique({
//       where: { id },
//     });

//     if (!property) {
//       return { success: false, error: "Property not found" };
//     }

//     // Check if user owns the property or is admin
//     if (property.ownerId !== currentUser.id) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Get address from reverse geocoding
//     const address = await reverseGeocode(lat, lng);

//     // Update both coordinates and address in a single database call
//     await prisma.property.update({
//       where: { id },
//       data: {
//         lat,
//         lng,
//         ...(address && { address }), // Only update address if geocoding was successful
//       },
//     });

//     revalidatePath("/");
//     revalidatePath("/proprietes");
//     revalidatePath(`/proprietes/${id}`);
//     revalidatePath("/proprietes-area");
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating property location:", error);
//     return { success: false, error: "Failed to update location" };
//   }
// };
