import React, { useState, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadNewsImage, removeNewsImage } from "@/server/actions/news";
import {
  NEWS_IMAGE_ALLOWED_TYPES,
  NEWS_IMAGE_MAX_FILE_SIZE,
} from "@/lib/constants";
import { validateFile } from "@/lib/utils/file";

interface NewsImageUploaderProps {
  newsId: string;
  image: string | null;
}

const NewsImageUploader = ({ newsId, image }: NewsImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(
      file,
      NEWS_IMAGE_ALLOWED_TYPES,
      NEWS_IMAGE_MAX_FILE_SIZE
    );
    if (validationError) {
      toast.error(validationError);
      // Reset input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // Upload file
    startTransition(async () => {
      const url = await uploadNewsImage(file, newsId);
      if (url) {
        setPreviewUrl(url);
        toast.success("News image uploaded successfully");
      } else {
        toast.error("Failed to upload news image");
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
    if (!confirm("Are you sure you want to remove the news image?")) {
      return;
    }

    startTransition(async () => {
      const result = await removeNewsImage(newsId);
      if (result.success) {
        setPreviewUrl(null);
        toast.success("News image removed");
      } else {
        toast.error("Failed to remove news image");
      }
    });
  };

  // Show preview if file uploaded, otherwise show existing image
  const imageSrc = previewUrl || image;

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-1 border-dashed",
          "dark:border-input border-gray-400/80 p-4 rounded-md bg-transparent"
        )}
      >
        {imageSrc && !isPending ? (
          <>
            <Image
              src={imageSrc}
              alt="News image"
              width={100}
              height={100}
              sizes="100px"
              className="object-contain"
            />
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={handleRemove}
              className="!bg-transparent !border-none"
              disabled={isPending}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </>
        ) : (
          <>
            {!isPending ? (
              <>
                <Input
                  id="news-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileRef}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={triggerFileInput}
                  className="w-full !bg-transparent !border-none"
                >
                  <UploadIcon className="size-4" />
                  Upload News Image
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span
                  aria-live="polite"
                  aria-label="Uploading news image"
                  className="text-sm"
                >
                  Uploading...
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsImageUploader;
