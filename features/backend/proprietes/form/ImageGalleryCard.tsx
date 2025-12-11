"use client";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreatePropertyFormData,
  PropertyGallery,
  UpdatePropertyFormData,
} from "@/server/schemas/property";
import { PropertyActionState, PropertyWithOwner } from "@/types/properties";
import { Images } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ImageDropzone from "./ImageDropzone";
import ImageGalleryList from "./ImageGalleryList";

type ImageGalleryCardProps = {
  state: PropertyActionState<
    CreatePropertyFormData | UpdatePropertyFormData
  > | null;
  property?: PropertyWithOwner;
  onHasBlobsChange?: (hasBlobs: boolean) => void;
};

const ImageGalleryCard = ({
  state,
  property,
  onHasBlobsChange,
}: ImageGalleryCardProps) => {
  const [images, setImages] = useState<PropertyGallery>(
    property?.gallery
      ?.sort((a, b) => a.order - b.order)
      .map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt ?? undefined,
        order: img.order,
      })) || []
  );
  const [isUploading, setIsUploading] = useState(false);

  // Check if there are blob URLs and notify parent
  useEffect(() => {
    const hasBlobs = images.some((img) => img.url.startsWith("blob:"));
    onHasBlobsChange?.(hasBlobs || isUploading);
  }, [images, isUploading, onHasBlobsChange]);

  // Reorder images - first image is always main (order: 0)
  const reorderImages = useCallback((draggedId: string, targetId: string) => {
    setImages((prev) => {
      const draggedIndex = prev.findIndex((img) => img.id === draggedId);
      const targetIndex = prev.findIndex((img) => img.id === targetId);

      if (
        draggedIndex === -1 ||
        targetIndex === -1 ||
        draggedIndex === targetIndex
      ) {
        return prev;
      }

      const newImages = [...prev];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, draggedItem);

      // Update order - first image is always main (order: 0)
      return newImages.map((img, i) => ({
        ...img,
        order: i,
      }));
    });
  }, []);

  // Remove the image from the list
  const removeImage = useCallback((id: string) => {
    setImages((prev) =>
      prev
        .filter((img) => img.id !== id)
        .map((img, i) => ({
          ...img,
          order: i,
        }))
    );
  }, []);

  // Filter out blob URLs before submitting
  const validImages = useMemo(
    () => images.filter((img) => !img.url.startsWith("blob:")),
    [images]
  );

  return (
    <div className="space-y-6">
      <input type="hidden" name="gallery" value={JSON.stringify(validImages)} />

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-purple-500/10">
              <Images
                className="size-4 text-purple-600 dark:text-purple-400"
                aria-hidden="true"
              />
            </div>
            Image Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageGalleryList
            images={images}
            onReorder={reorderImages}
            onRemove={removeImage}
            isUploading={isUploading}
          />
          <ImageDropzone
            setImages={setImages}
            propertyId={property?.id || "temp"}
            onUploadingChange={setIsUploading}
          />
          <ErrorFormMessages
            state={state}
            fieldName="gallery"
            fieldId="image-gallery-card"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageGalleryCard;
