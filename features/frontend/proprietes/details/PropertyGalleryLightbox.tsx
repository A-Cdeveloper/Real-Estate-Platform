"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import { PropertyImage } from "@prisma/client";
import { cn } from "@/lib/utils";

type NavigationButtonProps = {
  direction: "left" | "right";
  icon: LucideIcon;
  ariaLabel: string;
  onClick: () => void;
};

const DirectionButton = ({
  direction,
  icon: Icon,
  ariaLabel,
  onClick,
}: NavigationButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        direction === "left" ? "left-40" : "right-40",
        "absolute h-8 w-8 text-white/60 hover:!bg-transparent hover:!text-white p-0 [&_svg]:!w-8 [&_svg]:!h-8"
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <Icon className="w-8 h-8 flex-shrink-0" aria-hidden="true" />
    </Button>
  );
};

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
        <DirectionButton
          direction="left"
          icon={ChevronLeft}
          ariaLabel="Previous image"
          onClick={() => setIndex(index - 1)}
        />
      )}

      {index < images.length - 1 && (
        <DirectionButton
          direction="right"
          icon={ChevronRight}
          ariaLabel="Next image"
          onClick={() => setIndex(index + 1)}
        />
      )}

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        {index + 1} / {images.length}
      </div>
    </Modal>
  );
};

export default PropertyGalleryLightbox;
