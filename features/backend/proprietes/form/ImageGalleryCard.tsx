"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CreatePropertyFormData,
  UpdatePropertyFormData,
  PropertyGallery,
} from "@/server/schemas/property";
import { Image as ImageIcon, Images, Plus, X } from "lucide-react";
import { PropertyActionState, PropertyWithOwner } from "@/types/properties";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import CustumImage from "@/components/shared/ui/CustumImage";

type ImageGalleryCardProps = {
  state: PropertyActionState<
    CreatePropertyFormData | UpdatePropertyFormData
  > | null;
  property?: PropertyWithOwner;
};

const ImageGalleryCard = ({ state, property }: ImageGalleryCardProps) => {
  const [images, setImages] = useState<PropertyGallery>([]);

  const addDummy = () => {
    setImages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        alt: "Image",
        url: `https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop`,
        order: prev.length,
      },
    ]);
  };
  const setAsMain = (id?: string) => {
    if (!id) return;
    setImages((prev) => {
      const next = [...prev];
      const idx = next.findIndex((img) => img.id === id);
      if (idx < 0) return prev;
      const [item] = next.splice(idx, 1);
      next.unshift({ ...item, order: 0 });
      return next.map((it, i) => ({ ...it, order: i }));
    });
  };

  const removeAt = (id?: string) => {
    if (!id) return;
    setImages((prev) => {
      const next = prev.filter((img) => img.id !== id);
      return next.map((it, i) => ({ ...it, order: i }));
    });
  };

  return (
    <div className="space-y-6">
      <input type="hidden" name="gallery" value={JSON.stringify(images)} />

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
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="border rounded-md space-y-3 bg-muted/40 relative"
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
                        onClick={() => setAsMain(img.id)}
                      >
                        Set as main
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeAt(img.id)}
                        aria-label="Remove image"
                        className="absolute -top-2 -right-2 bg-destructive text-white w-6 h-6 rounded-full"
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button variant="outline" size="sm" type="button" onClick={addDummy}>
            <Plus className="size-4" />
            Add Image
          </Button>
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
