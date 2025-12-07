"use client";

import SingleImageUploader from "@/components/shared/form/SingleImageUploader";
import { uploadNewsImage, removeNewsImage } from "@/server/actions/news";
import {
  NEWS_IMAGE_ALLOWED_TYPES,
  NEWS_IMAGE_MAX_FILE_SIZE,
} from "@/lib/constants";

interface NewsImageUploaderProps {
  /**
   * News ID. Use "temp" for create mode (news doesn't exist yet).
   * When "temp" is used, image is uploaded to IPFS but not saved to database.
   */
  newsId: string;
  /** Current image URL to display */
  image: string | null;
  /**
   * Callback fired when image is uploaded or removed.
   * Used in create mode to store URL in parent component state.
   * Not needed in edit mode (image is saved directly to database).
   */
  onImageChange?: (url: string | null) => void;
}

/**
 * NewsImageUploader component
 *
 * Wrapper around SingleImageUploader with news-specific configuration.
 * This component provides a convenient API for news image uploads while
 * using the generic SingleImageUploader under the hood.
 *
 * @example
 * ```tsx
 * <NewsImageUploader
 *   newsId="temp"
 *   image={null}
 *   onImageChange={setUploadedImageUrl}
 * />
 * ```
 */
const NewsImageUploader = ({
  newsId,
  image,
  onImageChange,
}: NewsImageUploaderProps) => {
  return (
    <SingleImageUploader
      entityId={newsId}
      image={image}
      onImageChange={onImageChange}
      onUpload={uploadNewsImage}
      onRemove={removeNewsImage}
      allowedTypes={NEWS_IMAGE_ALLOWED_TYPES}
      maxFileSize={NEWS_IMAGE_MAX_FILE_SIZE}
      labels={{
        uploadButton: "Upload News Image",
        altText: "News image",
        inputId: "news-image-upload",
        removeConfirm: "Are you sure you want to remove the news image?",
        successMessages: {
          uploaded: "News image uploaded successfully",
          removed: "News image removed",
        },
        errorMessages: {
          uploadFailed: "Failed to upload news image",
          removeFailed: "Failed to remove news image",
          waitForUpload: "Please wait for the current upload to finish",
        },
      }}
    />
  );
};

export default NewsImageUploader;
