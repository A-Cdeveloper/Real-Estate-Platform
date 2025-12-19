"use server";

import { requireAuth } from "@/server/auth/ownership";
import { pinata } from "@/server/pinata/config";

/**
 * Upload an image to IPFS using Pinata
 * @param file - The file to upload
 * @param allowedTypes - Array of allowed MIME types
 * @param maxFileSize - Maximum file size in bytes
 * @param groupId - Pinata group ID to add the file to
 * @returns The URL of the uploaded image, or null if upload failed
 */
export const uploadImagePinata = async (
  file: File,
  allowedTypes: readonly string[],
  maxFileSize: number,
  groupId: string
): Promise<string | null> => {
  // Require authentication (any logged-in user can upload)
  // Authorization should be checked in the calling function
  await requireAuth();

  try {
    // Server-side validation
    if (!groupId) {
      console.error("Group ID is required");
      return null;
    }

    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      return null;
    }

    if (file.size > maxFileSize) {
      console.error("File size too large:", file.size);
      return null;
    }

    // Upload the file to IPFS
    const uploadResult = await pinata.upload.public.file(file);
    const cid = uploadResult.cid;

    // Get file ID from upload result (if available) or use CID
    const fileId = uploadResult.id || cid;

    // Add file to group
    await pinata.groups.public.addFiles({
      groupId,
      files: [fileId],
    });

    // Convert CID to URL using gateway
    const url = await pinata.gateways.public.convert(cid);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
