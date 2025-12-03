import React, { useState, useRef, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadLogo, removeLogo } from "@/server/actions/settings";
import { LOGO_ALLOWED_TYPES, LOGO_MAX_FILE_SIZE } from "@/lib/constants";
import { validateFile } from "@/lib/utils/file";

type LogoType = "dark" | "light";

type SingleLogoUploaderProps = {
  type: LogoType;
  logo: string | null;
};

// Helper function for type labels
const getTypeLabel = (type: LogoType, capitalize = true): string => {
  const label = type === "dark" ? "dark" : "light";
  return capitalize ? label.charAt(0).toUpperCase() + label.slice(1) : label;
};

const SingleLogoUploader = ({ type, logo }: SingleLogoUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(logo);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

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
      toast.error("Please wait for the current upload to finish");
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // Validate file
    const validationError = validateFile(
      file,
      LOGO_ALLOWED_TYPES,
      LOGO_MAX_FILE_SIZE
    );
    if (validationError) {
      toast.error(validationError);
      // Reset input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }

    // Save previous logo URL to restore if upload fails
    const previousLogoUrl = logo || previewUrl;

    // Clean up previous blob URL if exists
    cleanupBlobUrl(previewUrl);

    // Create local preview immediately
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);

    // Upload file
    startTransition(async () => {
      const url = await uploadLogo(file, type);
      // Clean up blob URL
      cleanupBlobUrl(blobUrl);

      if (url) {
        setPreviewUrl(url);
        toast.success(`${getTypeLabel(type)} logo uploaded successfully`);
      } else {
        // Upload failed - restore previous logo
        // Only restore if it was a server URL (not a blob URL from previous failed upload)
        const previousWasServerUrl =
          previousLogoUrl && !previousLogoUrl.startsWith("blob:");
        if (previousWasServerUrl) {
          setPreviewUrl(previousLogoUrl);
        } else {
          // No previous server URL - clear everything
          setPreviewUrl(null);
        }
        toast.error(`Failed to upload ${getTypeLabel(type, false)} logo`);
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
      toast.error("Please wait for the current upload to finish");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to remove the ${getTypeLabel(type, false)} logo?`
      )
    ) {
      return;
    }

    // Optimistic update - immediately remove preview
    const previousUrl = previewUrl;
    cleanupBlobUrl(previewUrl);
    setPreviewUrl(null);

    startTransition(async () => {
      const result = await removeLogo(type);
      if (result.success) {
        toast.success(`${getTypeLabel(type)} logo removed`);
      } else {
        // Revert on error (only if it was a server URL, not blob)
        if (previousUrl && !previousUrl.startsWith("blob:")) {
          setPreviewUrl(previousUrl);
        }
        toast.error(`Failed to remove ${getTypeLabel(type, false)} logo`);
      }
    });
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative",
          "flex items-center justify-between gap-2 border-1 border-dashed",
          "dark:border-input border-gray-400/80 p-4 rounded-md",
          type === "dark"
            ? "dark:bg-transparent bg-card-foreground"
            : "bg-transparent dark:bg-white"
        )}
      >
        <Input
          id={`logo-upload-${type}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileRef}
        />

        {previewUrl ? (
          <div className="relative w-full flex items-center justify-between gap-2">
            <Image
              src={previewUrl}
              alt={`${getTypeLabel(type)} logo`}
              width={100}
              height={100}
              sizes="100px"
              className="object-contain"
            />
            {isPending && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-white" />
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
              >
                <TrashIcon className="size-4 text-destructive" />
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={triggerFileInput}
            className={cn(
              "w-full !bg-transparent !border-none",
              type === "dark"
                ? "dark:text-white text-white"
                : "text-dark-foreground dark:text-secondary"
            )}
          >
            <UploadIcon className="size-4" />
            Upload {getTypeLabel(type)} Logo
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleLogoUploader;
