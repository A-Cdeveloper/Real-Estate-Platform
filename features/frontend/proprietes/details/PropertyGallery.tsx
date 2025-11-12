"use client";

import { useState } from "react";
import { PropertyWithGallery } from "@/types/properties";
import CustumImage from "@/components/shared/CustumImage";
import { ZoomIn } from "lucide-react";
import PropertyGalleryLightbox from "./PropertyGalleryLightbox";

const PropertyGallery = ({ property }: { property: PropertyWithGallery }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!property.gallery || property.gallery.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {property.gallery.map((image, index) => (
          <div
            key={image.id}
            role="button"
            tabIndex={0}
            aria-label={`View image ${index + 1} of ${property.gallery.length} in gallery`}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(index);
              }
            }}
          >
            <CustumImage
              src={image.url}
              alt={image.alt || property.name}
              className="h-64"
            />
            {/* Overlay sa zoom ikonom */}
            <div
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              aria-hidden="true"
            >
              <ZoomIn className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <PropertyGalleryLightbox
          images={property.gallery}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

export default PropertyGallery;
