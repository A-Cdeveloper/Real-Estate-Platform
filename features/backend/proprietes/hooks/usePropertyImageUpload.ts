"use client";

import { useTransition, useCallback, useRef, useEffect, useMemo } from "react";
import { Accept, useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import {
  PROPERTY_IMAGE_ALLOWED_TYPES,
  PROPERTY_IMAGE_MAX_FILE_SIZE,
  PROPERTY_IMAGE_MAX_FILES,
} from "@/lib/constants";
import { PropertyGallery } from "@/server/schemas/property";
import { uploadPropertyImages } from "@/server/actions/properties";

type UsePropertyImageUploadProps = {
  setImages: React.Dispatch<React.SetStateAction<PropertyGallery>>;
  propertyId?: string;
};

/**
 * Custom hook for property image upload with drag & drop
 * Handles dropzone configuration, file upload, and state management
 */
export const usePropertyImageUpload = ({
  setImages,
  propertyId = "temp",
}: UsePropertyImageUploadProps) => {
  const [isUploading, startTransition] = useTransition();
  const propertyIdRef = useRef(propertyId);

  // Update ref when propertyId changes
  useEffect(() => {
    propertyIdRef.current = propertyId;
  }, [propertyId]);

  // Helper to clean up blob URLs
  const cleanupBlobUrls = useCallback((urls: string[]) => {
    urls.forEach((url) => {
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  }, []);

  // Memoized onDrop handler - uses functional setImages to avoid dependency on images
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Check if there are rejected files due to too many files
      const hasTooManyFiles = rejectedFiles.some((rejection) =>
        rejection.errors.some((error) => error.code === "too-many-files")
      );

      if (hasTooManyFiles) {
        toast.error(
          `Maximum ${PROPERTY_IMAGE_MAX_FILES} files allowed. Please select fewer files.`
        );
        return;
      }

      // Validate file types - double check even though dropzone should handle this
      const validFiles = acceptedFiles.filter((file) =>
        (PROPERTY_IMAGE_ALLOWED_TYPES as readonly string[]).includes(file.type)
      );

      if (validFiles.length !== acceptedFiles.length) {
        const invalidCount = acceptedFiles.length - validFiles.length;
        toast.error(
          `${invalidCount} file${invalidCount > 1 ? "s" : ""} ${invalidCount > 1 ? "are" : "is"} not a valid image type`
        );
      }

      if (validFiles.length === 0) return;

      // Create blob URLs for immediate preview (limit to prevent memory issues)
      const blobUrls: string[] = [];
      let startOrder = 0;
      const tempImages: PropertyGallery = validFiles.map((file) => {
        const blobUrl = URL.createObjectURL(file);
        blobUrls.push(blobUrl);
        return {
          id: crypto.randomUUID(),
          alt: file.name,
          url: blobUrl,
          order: 0, // Will be set correctly in setImages
        };
      });

      // Add to state immediately for preview - use functional update to get current length
      setImages((prev) => {
        startOrder = prev.length;
        return [
          ...prev,
          ...tempImages.map((img, idx) => ({
            ...img,
            order: startOrder + idx,
          })),
        ];
      });

      // Upload files in batches to prevent memory issues
      startTransition(async () => {
        try {
          const urls = await uploadPropertyImages(
            validFiles,
            propertyIdRef.current
          );

          // Clean up blob URLs
          cleanupBlobUrls(blobUrls);

          if (urls.length > 0) {
            // Update images with real URLs
            setImages((prev) =>
              prev.map((img) => {
                const tempIndex = tempImages.findIndex(
                  (temp) => temp.id === img.id
                );
                if (tempIndex >= 0 && urls[tempIndex]) {
                  return { ...img, url: urls[tempIndex] };
                }
                return img;
              })
            );
            toast.success(
              `${urls.length} image${urls.length > 1 ? "s" : ""} uploaded successfully`
            );
          } else {
            // Remove failed uploads
            setImages((prev) =>
              prev.filter(
                (img) => !tempImages.some((temp) => temp.id === img.id)
              )
            );
            toast.error("Failed to upload images");
          }
        } catch (error) {
          // Clean up blob URLs on error
          cleanupBlobUrls(blobUrls);
          // Remove failed uploads
          setImages((prev) =>
            prev.filter((img) => !tempImages.some((temp) => temp.id === img.id))
          );
          toast.error("An error occurred while uploading images");
          console.error("Upload error:", error);
        }
      });
    },
    [setImages, cleanupBlobUrls]
  );

  // Memoized onDropRejected handler
  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        // Skip "too-many-files" error - it's handled in onDrop
        if (error.code === "too-many-files") {
          return;
        }
        if (error.code === "file-too-large") {
          toast.error(`${file.name} is too large`);
        } else if (error.code === "file-invalid-type") {
          toast.error(`${file.name} is not a valid image type`);
        }
      });
    });
  }, []);

  // Memoize dropzone config to prevent re-creation on every render
  const dropzoneConfig = useMemo(
    () => ({
      accept: PROPERTY_IMAGE_ALLOWED_TYPES as unknown as Accept,
      multiple: true,
      maxSize: PROPERTY_IMAGE_MAX_FILE_SIZE,
      maxFiles: PROPERTY_IMAGE_MAX_FILES,
      onDrop,
      onDropRejected,
    }),
    [onDrop, onDropRejected]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneConfig);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isUploading,
  };
};
