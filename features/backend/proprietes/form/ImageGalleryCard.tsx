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
import React, { useState } from "react";
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
  const [images, setImages] = useState<PropertyGallery>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Check if there are blob URLs and notify parent
  React.useEffect(() => {
    const hasBlobs = images.some((img) => img.url.startsWith("blob:"));
    onHasBlobsChange?.(hasBlobs || isUploading);
  }, [images, isUploading, onHasBlobsChange]);

  // Set the main image to the top of the list
  const setMainImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (!image) return prev;

      const others = prev.filter((img) => img.id !== id);
      return [{ ...image, order: 0 }, ...others].map((img, i) => ({
        ...img,
        order: i,
      }));
    });
  };

  // Remove the image from the list
  const removeImage = (id: string) => {
    setImages((prev) =>
      prev
        .filter((img) => img.id !== id)
        .map((img, i) => ({
          ...img,
          order: i,
        }))
    );
  };

  // Filter out blob URLs before submitting
  const validImages = images.filter((img) => !img.url.startsWith("blob:"));

  return (
    <div className="space-y-6">
      <input type="hidden" name="gallery" value={JSON.stringify(validImages)} />

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-purple-500/10">
              <Images className="size-4 text-purple-600 dark:text-purple-400" />
            </div>
            Image Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageGalleryList
            images={images}
            onSetMain={setMainImage}
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
