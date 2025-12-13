"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { PropertyActionState } from "@/types/properties";
import { PropertyType, PropertyStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAuth, requireOwnerOrAdmin } from "../auth/ownership";
import {
  CreatePropertyFormData,
  createPropertySchema,
  PropertyGallery,
  UpdatePropertyFormData,
  updatePropertySchema,
} from "../schemas/property";
import { formatZodErrors } from "../utils/zod";
import {
  PROPERTY_IMAGE_ALLOWED_TYPES,
  PROPERTY_IMAGE_MAX_FILE_SIZE,
} from "@/lib/constants";
import { uploadImagePinata } from "./uploadImagePinata";
import { deleteImagePinata } from "./deleteImagePinata";
import { checkIsAdmin } from "../auth/checkIsAdmin";

/**
 * Helper function to parse property form data from FormData
 * @param formData - The form data containing the property information
 * @returns The parsed property data
 */
function parsePropertyFormData(formData: FormData) {
  const galleryRaw = formData.get("gallery");
  let gallery: PropertyGallery = [];
  if (typeof galleryRaw === "string") {
    try {
      gallery = JSON.parse(galleryRaw);
    } catch {
      gallery = [];
    }
  }
  return {
    name: formData.get("name"),
    type: formData.get("type"),
    price: formData.get("price"),
    area: formData.get("area"),
    address: formData.get("address"),
    description: formData.get("description"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
    status: formData.get("status"),
    gallery,
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
        gallery: Array.isArray(rawData.gallery)
          ? (rawData.gallery as PropertyGallery)
          : [],
      },
    };
  }

  const { name, type, price, area, address, description, lat, lng, gallery } =
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
        image: gallery[0]?.url ?? null,
        ownerId: user.id,
      },
    });

    if (gallery.length) {
      await prisma.propertyImage.createMany({
        data: gallery.map((item, idx) => ({
          url: item.url,
          alt: item.alt ?? null,
          order: typeof item.order === "number" ? item.order : idx,
          propertyId: property.id,
        })),
      });
    }

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
        gallery: Array.isArray(rawData.gallery)
          ? (rawData.gallery as PropertyGallery)
          : [],
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

  // Remove status from rawData if user is not admin (agents can't change status)
  const isAdmin = await checkIsAdmin();
  const dataForValidation = isAdmin
    ? { ...rawData, id: propertyId }
    : { ...rawData, id: propertyId, status: undefined };

  const result = updatePropertySchema.safeParse(dataForValidation);

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
        status: (rawData.status as PropertyStatus) || property.status,
        gallery: Array.isArray(rawData.gallery)
          ? (rawData.gallery as PropertyGallery)
          : [],
      },
    };
  }

  const {
    name,
    type,
    price,
    area,
    address,
    description,
    lat,
    lng,
    status,
    gallery,
  } = result.data;

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
        image: gallery[0]?.url ?? null,
        promoted: status === PropertyStatus.APPROVED ? true : false,
        // Only update status if user is admin
        ...(isAdmin && status && { status: status as PropertyStatus }),
      },
    });

    // Delete existing gallery images
    await prisma.propertyImage.deleteMany({
      where: { propertyId },
    });

    // Create new gallery images
    if (gallery.length) {
      await prisma.propertyImage.createMany({
        data: gallery.map((item, idx) => ({
          url: item.url,
          alt: item.alt ?? null,
          order: typeof item.order === "number" ? item.order : idx,
          propertyId: propertyId,
        })),
      });
    }

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
        status: (rawData.status as PropertyStatus) || property.status,
        gallery: Array.isArray(rawData.gallery)
          ? (rawData.gallery as PropertyGallery)
          : [],
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
    // Get all gallery images before deleting the property
    const galleryImages = await prisma.propertyImage.findMany({
      where: { propertyId: id },
      select: { url: true },
    });

    // Delete the property (this will cascade delete PropertyImage records)
    await prisma.property.delete({
      where: { id },
    });

    // Delete images from Pinata (don't block if this fails)
    if (galleryImages.length > 0) {
      // Also delete the main image if it exists
      const imagesToDelete = [
        ...galleryImages.map((img) => img.url),
        ...(property.image ? [property.image] : []),
      ];

      // Delete all images from Pinata in parallel (non-blocking)
      Promise.all(imagesToDelete.map((url) => deleteImagePinata(url))).catch(
        (error) => {
          console.error("Error deleting images from Pinata:", error);
          // Don't throw - property is already deleted from database
        }
      );
    }

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

export async function uploadPropertyImages(
  files: File[],
  propertyId: string
): Promise<string[]> {
  try {
    const timestamp = Date.now();
    const urls = await Promise.all(
      files.map(async (file, index) => {
        // Get file extension
        const extension = file.name.split(".").pop() || "jpg";

        // Create new filename: property-{id}-{timestamp}-{index}.{ext}
        const prefix =
          propertyId === "temp" ? "property-temp" : `property-${propertyId}`;
        const newFileName = `${prefix}-${timestamp}-${index}.${extension}`;

        // Create new File object with renamed file
        const renamedFile = new File([file], newFileName, {
          type: file.type,
          lastModified: file.lastModified,
        });

        return await uploadImagePinata(
          renamedFile,
          PROPERTY_IMAGE_ALLOWED_TYPES,
          PROPERTY_IMAGE_MAX_FILE_SIZE,
          process.env.PINATA_PROPERTY_IMAGE_GROUP_ID || ""
        );
      })
    );
    return urls.filter((url) => url !== null);
  } catch (error) {
    console.error("Error updating property images:", error);
    return [];
  }
}
