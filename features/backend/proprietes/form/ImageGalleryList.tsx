"use client";
import CustumImage from "@/components/shared/ui/CustumImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropertyGallery } from "@/server/schemas/property";
import { X } from "lucide-react";

type ImageGalleryListProps = {
  images: PropertyGallery;
  onSetMain: (id: string) => void;
  onRemove: (id: string) => void;
  isUploading?: boolean;
};

const ImageGalleryList = ({
  images,
  onSetMain,
  onRemove,
  isUploading = false,
}: ImageGalleryListProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-6">
      {images.map((img) => {
        const isBlob = img.url.startsWith("blob:");
        const isDisabled = isUploading || isBlob;

        return (
          <div
            key={img.id}
            className={cn(
              "border rounded-md space-y-3 bg-muted/40 relative",
              isDisabled && "opacity-50"
            )}
          >
            <CustumImage
              src={img.url}
              alt={img.alt || "Image"}
              className="w-full h-28 object-cover rounded"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => img.id && onSetMain(img.id)}
                  disabled={isDisabled}
                >
                  Set as main
                </Button>
                {!isDisabled && (
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => img.id && onRemove(img.id)}
                    aria-label="Remove image"
                    className="absolute -top-2 -right-2 bg-destructive text-white w-4.5 h-4.5 rounded-full"
                  >
                    <X className="size-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGalleryList;
