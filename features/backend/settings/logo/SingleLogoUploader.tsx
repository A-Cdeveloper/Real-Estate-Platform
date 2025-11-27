import React, { useState, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadLogo, removeLogo } from "@/server/actions/settings";
import { LOGO_ALLOWED_TYPES, LOGO_MAX_FILE_SIZE } from "@/lib/constants";

type LogoType = "dark" | "light";

interface SingleLogoUploaderProps {
  type: LogoType;
  logo: string | null;
}

// Helper function for type labels
const getTypeLabel = (type: LogoType, capitalize = true): string => {
  const label = type === "dark" ? "dark" : "light";
  return capitalize ? label.charAt(0).toUpperCase() + label.slice(1) : label;
};

// File validation function
const validateFile = (file: File): string | null => {
  if (
    !LOGO_ALLOWED_TYPES.includes(
      file.type as (typeof LOGO_ALLOWED_TYPES)[number]
    )
  ) {
    return "Only PNG, JPEG, JPG, SVG, and WebP images are allowed";
  }
  if (file.size > LOGO_MAX_FILE_SIZE) {
    return "File size must be less than 5MB";
  }
  return null;
};

const SingleLogoUploader = ({ type, logo }: SingleLogoUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
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
      const url = await uploadLogo(file, type);
      if (url) {
        setPreviewUrl(url);
        toast.success(`${getTypeLabel(type)} logo uploaded successfully`);
      } else {
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
    if (
      !confirm(
        `Are you sure you want to remove the ${getTypeLabel(type, false)} logo?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await removeLogo(type);
      if (result.success) {
        setPreviewUrl(null);
        toast.success(`${getTypeLabel(type)} logo removed`);
      } else {
        toast.error(`Failed to remove ${getTypeLabel(type, false)} logo`);
      }
    });
  };

  // Show preview if file uploaded, otherwise show existing logo
  const imageSrc = previewUrl || logo;

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-1 border-dashed",
          "dark:border-input border-gray-400/80 p-4 rounded-md",
          type === "dark"
            ? "dark:bg-transparent bg-card-foreground"
            : "bg-transparent dark:bg-white"
        )}
      >
        {imageSrc && !isPending ? (
          <>
            <Image
              src={imageSrc}
              alt={`${getTypeLabel(type)} logo`}
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
                  id={`logo-upload-${type}`}
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
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span
                  aria-live="polite"
                  aria-label={`Uploading ${getTypeLabel(type, false)} logo`}
                  className={cn(
                    "text-sm",
                    type === "dark"
                      ? "dark:text-white text-white"
                      : "text-dark-foreground dark:text-secondary"
                  )}
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

export default SingleLogoUploader;
