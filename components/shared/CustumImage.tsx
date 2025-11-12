import { cn } from "@/lib/utils";
import Image from "next/image";

type CustumImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  unoptimized?: boolean;
  showFallback?: boolean;
};

const CustumImage = ({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  unoptimized = true,
  showFallback = false,
}: CustumImageProps) => {
  if (!src) {
    if (showFallback) {
      return (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-muted",
            className
          )}
        />
      );
    }
    return null;
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", imageClassName)}
        priority={priority}
        unoptimized={unoptimized}
      />
    </div>
  );
};

export default CustumImage;
