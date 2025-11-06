"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/frontend/Modal";
import { PropertyImage } from "@prisma/client";

type PropertyGalleryLightboxProps = {
  images: PropertyImage[];
  startIndex: number;
  onClose: () => void;
};

const PropertyGalleryLightbox = ({
  images,
  startIndex,
  onClose,
}: PropertyGalleryLightboxProps) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(images.length - 1, i + 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const image = images[index];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="max-w-7xl w-full h-full flex items-center justify-center p-8"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={image.url}
          alt={image.alt || "Gallery image"}
          width={1920}
          height={1080}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          unoptimized
        />
      </div>

      {index > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white hover:bg-white/20"
          onClick={() => setIndex(index - 1)}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      )}

      {index < images.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white hover:bg-white/20"
          onClick={() => setIndex(index + 1)}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
        {index + 1} / {images.length}
      </div>
    </Modal>
  );
};

export default PropertyGalleryLightbox;
