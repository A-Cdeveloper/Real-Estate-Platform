"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyActionState } from "@/types/properties";
import { PropertyType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAuth, requireOwnerOrAdmin } from "../auth/ownership";
import {
  CreatePropertyFormData,
  createPropertySchema,
  UpdatePropertyFormData,
  updatePropertySchema,
} from "../schemas/property";
import { formatZodErrors } from "../utils/zod";

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
  const user = await requireAuth();

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
        ownerId: user.id,
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
 * @param prevState - The previous state of the property
 * @param formData - The form data containing the property information
 * @returns The result of the update
 */
export async function updateProperty(
  prevState: PropertyActionState<UpdatePropertyFormData> | null,
  formData: FormData
): Promise<PropertyActionState<UpdatePropertyFormData> | null> {
  const user = await requireAuth();
  // Get property ID from formData
  const propertyId = formData.get("id") as string;
  if (!propertyId) {
    return { success: false, error: "Property ID is required" };
  }

  // Check if property exists and user has permission
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    return { success: false, error: "Property not found" };
  }

  // Check authorization: owner or admin
  await requireOwnerOrAdmin(property, user);

  const rawData = parsePropertyFormData(formData);
  const result = updatePropertySchema.safeParse({ ...rawData, id: propertyId });

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: propertyId,
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
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        name,
        type: type as PropertyType,
        price,
        area,
        address,
        description,
        lat,
        lng,
      },
    });

    revalidatePath("/");
    revalidatePath("/proprietes");
    revalidatePath("/proprietes-area");
    revalidatePath(`/proprietes/${propertyId}`);

    return { success: true, property: updatedProperty };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        id: propertyId,
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
 * Server Action: Delete a property
 * @param id - The ID of the property
 * @returns The result of the deletion
 */
export async function deleteProperty(id: string) {
  const user = await requireAuth();
  if (!id) {
    return { success: false, error: "Property ID is required" };
  }

  const property = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    return { success: false, error: "Property not found" };
  }

  await requireOwnerOrAdmin(property, user);

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
  const user = await requireAuth();
  const property = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    return { success: false, error: "Property not found" };
  }

  await requireOwnerOrAdmin(property, user);

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
