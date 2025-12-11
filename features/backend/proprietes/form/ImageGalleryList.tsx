"use client";
import CustumImage from "@/components/shared/ui/CustumImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropertyGallery } from "@/server/schemas/property";
import { X, Info } from "lucide-react";
import { useImageDragAndDrop } from "../hooks/useImageDragAndDrop";

type ImageGalleryListProps = {
  images: PropertyGallery;
  onReorder: (draggedId: string, targetId: string) => void;
  onRemove: (id: string) => void;
  isUploading?: boolean;
};

const ImageGalleryList = ({
  images,
  onReorder,
  onRemove,
  isUploading = false,
}: ImageGalleryListProps) => {
  const {
    draggedId,
    dragOverId,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useImageDragAndDrop({ onReorder });

  if (images.length === 0) return null;

  return (
    <div className="space-y-4 mb-6">
      <div
        className="flex items-center gap-2 text-[12px] text-muted-foreground -mt-4 rounded-md mb-6"
        role="status"
        aria-live="polite"
      >
        <Info className="size-4 shrink-0" aria-hidden="true" />
        <p>
          The first image is always the main image. <br />
          You can drag and drop images to reorder them.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {images.map((img, index) => {
          const isBlob = img.url.startsWith("blob:");
          const isDisabled = isUploading || isBlob;
          const isDragging = draggedId === img.id;
          const isDragOver = dragOverId === img.id;

          return (
            <div
              key={img.id}
              role="button"
              draggable={!isDisabled}
              tabIndex={!isDisabled ? 0 : undefined}
              aria-label={
                index === 0
                  ? `Main image ${index + 1} of ${images.length}. Drag to reorder.`
                  : `Image ${index + 1} of ${images.length}. Drag to reorder.`
              }
              aria-disabled={isDisabled}
              onDragStart={(e) =>
                !isDisabled && img.id && handleDragStart(e, img.id)
              }
              onDragOver={handleDragOver}
              onDragEnter={(e) =>
                !isDisabled && img.id && handleDragEnter(e, img.id)
              }
              onDragLeave={handleDragLeave}
              onDrop={(e) => !isDisabled && img.id && handleDrop(e, img.id)}
              onDragEnd={handleDragEnd}
              onKeyDown={(e) => {
                if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  // Could add keyboard reordering here if needed
                }
              }}
              className={cn(
                "rounded-md bg-muted/40 relative cursor-move border-2 border-transparent",
                isDisabled && "opacity-50 cursor-not-allowed",
                isDragging && "opacity-30",
                isDragOver && "border-primary border-2",
                index === 0 && "border-2 border-primary rounded-md"
              )}
            >
              <CustumImage
                src={img.url}
                alt={img.alt || "Image"}
                className="w-full h-28 object-cover rounded"
              />
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {!isDisabled && (
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => img.id && onRemove(img.id)}
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute -top-2 -right-2 bg-destructive text-white w-4.5 h-4.5 rounded-full"
                    >
                      <X className="size-3" aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGalleryList;
