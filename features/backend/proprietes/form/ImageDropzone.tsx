"use client";
import { cn } from "@/lib/utils";
import { PropertyGallery } from "@/server/schemas/property";
import { Loader2, Upload, ImagePlus } from "lucide-react";
import React from "react";
import { usePropertyImageUpload } from "../hooks/usePropertyImageUpload";

type ImageDropzoneProps = {
  setImages: React.Dispatch<React.SetStateAction<PropertyGallery>>;
  propertyId?: string;
  onUploadingChange?: (isUploading: boolean) => void;
};

const ImageDropzone = ({
  setImages,
  propertyId = "temp",
  onUploadingChange,
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, isUploading } =
    usePropertyImageUpload({
      setImages,
      propertyId,
    });

  // Notify parent about uploading state
  React.useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/30 hover:border-primary/50",
        isUploading && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} disabled={isUploading} />
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p>Uploading images...</p>
        </div>
      ) : isDragActive ? (
        <div className="flex flex-col items-center gap-2">
          <Upload className="size-8 text-primary" />
          <p className="text-sm text-primary font-medium">Drop images here</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <ImagePlus className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click or drag to upload
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
