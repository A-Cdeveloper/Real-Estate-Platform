"use client";

import React, { useState, useRef, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { validateFile } from "@/lib/utils/file";

/**
 * Configuration for SingleImageUploader labels and messages
 */
export type ImageUploaderLabels = {
  uploadButton?: string;
  altText?: string;
  inputId?: string;
  removeConfirm?: string;
  successMessages?: {
    uploaded?: string;
    removed?: string;
  };
  errorMessages?: {
    uploadFailed?: string;
    removeFailed?: string;
    waitForUpload?: string;
  };
};

/**
 * Props for SingleImageUploader component
 */
export type SingleImageUploaderProps = {
  /**
   * Entity ID. Use "temp" for create mode (entity doesn't exist yet).
   * When "temp" is used, image is uploaded to IPFS but not saved to database.
   */
  entityId: string;
  /** Current image URL to display */
  image: string | null;
  /**
   * Callback fired when image is uploaded or removed.
   * Used in create mode to store URL in parent component state.
   * Not needed in edit mode (image is saved directly to database).
   */
  onImageChange?: (url: string | null) => void;
  /**
   * Function to upload image. Should return URL or null.
   * @param file - The file to upload
   * @param entityId - The entity ID or "temp"
   * @returns The URL of the uploaded image, or null if upload failed
   */
  onUpload: (file: File, entityId: string) => Promise<string | null>;
  /**
   * Function to remove image. Should return success status.
   * @param entityId - The entity ID (not "temp")
   * @returns Object with success boolean
   */
  onRemove: (entityId: string) => Promise<{ success: boolean }>;
  /** Allowed MIME types for file validation */
  allowedTypes: readonly string[];
  /** Maximum file size in bytes */
  maxFileSize: number;
  /** Labels and messages for UI (optional, has defaults) */
  labels?: ImageUploaderLabels;
};

/**
 * Generic single image uploader component
 *
 * Features:
 * - Immediate local preview (blob URL)
 * - Upload to IPFS with progress indicator
 * - Error handling with automatic recovery
 * - Support for "temp" ID in create mode
 * - Optimistic updates for better UX
 *
 * @example
 * ```tsx
 * <SingleImageUploader
 *   entityId="temp"
 *   image={null}
 *   onUpload={uploadNewsImage}
 *   onRemove={removeNewsImage}
 *   allowedTypes={NEWS_IMAGE_ALLOWED_TYPES}
 *   maxFileSize={NEWS_IMAGE_MAX_FILE_SIZE}
 *   labels={{
 *     uploadButton: "Upload News Image",
 *     altText: "News image"
 *   }}
 * />
 * ```
 */
const SingleImageUploader = ({
  entityId,
  image,
  onImageChange,
  onUpload,
  onRemove,
  allowedTypes,
  maxFileSize,
  labels,
}: SingleImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(image);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  // Default labels
  const defaultLabels: Required<ImageUploaderLabels> = {
    uploadButton: "Upload Image",
    altText: "Image",
    inputId: "image-upload",
    removeConfirm: "Are you sure you want to remove this image?",
    successMessages: {
      uploaded: "Image uploaded successfully",
      removed: "Image removed",
    },
    errorMessages: {
      uploadFailed: "Failed to upload image",
      removeFailed: "Failed to remove image",
      waitForUpload: "Please wait for the current upload to finish",
    },
  };

  const finalLabels = {
    uploadButton: labels?.uploadButton ?? defaultLabels.uploadButton,
    altText: labels?.altText ?? defaultLabels.altText,
    inputId: labels?.inputId ?? defaultLabels.inputId,
    removeConfirm: labels?.removeConfirm ?? defaultLabels.removeConfirm,
    successMessages: {
      uploaded:
        labels?.successMessages?.uploaded ??
        defaultLabels.successMessages.uploaded,
      removed:
        labels?.successMessages?.removed ??
        defaultLabels.successMessages.removed,
    },
    errorMessages: {
      uploadFailed:
        labels?.errorMessages?.uploadFailed ??
        defaultLabels.errorMessages.uploadFailed,
      removeFailed:
        labels?.errorMessages?.removeFailed ??
        defaultLabels.errorMessages.removeFailed,
      waitForUpload:
        labels?.errorMessages?.waitForUpload ??
        defaultLabels.errorMessages.waitForUpload,
    },
  };

  // Helper to clean up blob URL
  const cleanupBlobUrl = (url: string | null) => {
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      cleanupBlobUrl(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Don't allow new upload if one is in progress
    if (isPending) {
      toast.error(finalLabels.errorMessages.waitForUpload);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // Validate file
    const validationError = validateFile(file, allowedTypes, maxFileSize);
    if (validationError) {
      toast.error(validationError);
      // Reset input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // Save previous image URL to restore if upload fails
    // Use image prop (from parent) as fallback, not previewUrl state
    // This ensures we restore the correct image in both create and edit modes
    const previousImageUrl = image || previewUrl;

    // Clean up previous blob URL if exists
    cleanupBlobUrl(previewUrl);

    // Create local preview immediately
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);

    // Upload file
    startTransition(async () => {
      const url = await onUpload(file, entityId);
      // Clean up blob URL
      cleanupBlobUrl(blobUrl);

      if (url) {
        setPreviewUrl(url);
        onImageChange?.(url);
        toast.success(finalLabels.successMessages.uploaded);
      } else {
        // Upload failed - restore previous image
        // Only restore if it was a server URL (not a blob URL from previous failed upload)
        // This preserves the previously uploaded image in both create and edit modes
        const previousWasServerUrl =
          previousImageUrl && !previousImageUrl.startsWith("blob:");
        if (previousWasServerUrl) {
          setPreviewUrl(previousImageUrl);
          // Don't call onImageChange - keep the previous uploaded image URL
          // In create mode: preserves uploadedImageUrl in parent component
          // In edit mode: preserves the original image from database
        } else {
          // No previous server URL - clear everything
          setPreviewUrl(null);
          onImageChange?.(null);
        }
        toast.error(finalLabels.errorMessages.uploadFailed);
      }

      // Reset input to allow uploading the same file again
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    });
  };

  const triggerFileInput = () => {
    fileRef.current?.click();
  };

  const handleRemove = async () => {
    // Don't allow remove if upload is in progress
    if (isPending) {
      toast.error(finalLabels.errorMessages.waitForUpload);
      return;
    }

    if (!confirm(finalLabels.removeConfirm)) {
      return;
    }

    // Optimistic update - immediately remove preview
    const previousUrl = previewUrl;
    cleanupBlobUrl(previewUrl);
    setPreviewUrl(null);
    onImageChange?.(null);

    // If entityId is "temp" (create mode), just remove locally without server call
    // Image was never saved to database, so no need to call onRemove
    if (entityId === "temp") {
      toast.success(finalLabels.successMessages.removed);
      return;
    }

    startTransition(async () => {
      const result = await onRemove(entityId);
      if (result.success) {
        toast.success(finalLabels.successMessages.removed);
      } else {
        // Revert on error (only if it was a server URL, not blob)
        if (previousUrl && !previousUrl.startsWith("blob:")) {
          setPreviewUrl(previousUrl);
          onImageChange?.(previousUrl);
        }
        toast.error(finalLabels.errorMessages.removeFailed);
      }
    });
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative",
          "flex items-center justify-between gap-2 border-1 border-dashed",
          "dark:border-input border-gray-400/80 p-4 rounded-md bg-transparent"
        )}
      >
        <Input
          id={finalLabels.inputId}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileRef}
          aria-label={finalLabels.uploadButton}
        />

        {previewUrl ? (
          <div className="relative w-full flex items-center justify-between gap-2">
            <Image
              src={previewUrl}
              alt={finalLabels.altText}
              width={100}
              height={100}
              sizes="100px"
              className="object-cover h-[100px] w-[100px]"
            />
            {isPending && (
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2">
                  <Loader2
                    className="size-4 animate-spin text-white"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white">Uploading...</span>
                </div>
              </div>
            )}
            {!isPending && (
              <Button
                variant="outline"
                type="button"
                size="sm"
                onClick={handleRemove}
                className="!bg-transparent !border-none"
                aria-label={`Remove ${finalLabels.altText}`}
              >
                <TrashIcon className="size-4 text-destructive" aria-hidden="true" />
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={triggerFileInput}
            className="w-full !bg-transparent !border-none"
            aria-label={finalLabels.uploadButton}
          >
            <UploadIcon className="size-4" aria-hidden="true" />
            {finalLabels.uploadButton}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleImageUploader;
