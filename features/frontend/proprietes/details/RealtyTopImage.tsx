import { Property } from "@prisma/client";
import Image from "next/image";
import BackButton from "@/components/shared/ui/BackButton";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const RealtyTopImage = ({ property }: { property: Property }) => {
  return (
    <div className="relative h-[40vh] md:min-h-[60vh] w-full overflow-hidden">
      {property.image ? (
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      ) : (
        <div className="h-full bg-muted" />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Back Button */}

      <BackButton
        href="/proprietes"
        label="Back to Properties"
        className="absolute top-6 left-6 z-10"
      />

      {/* Property Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl text-white"
            >
              {property.name}
            </Typography>
            {property.promoted && (
              <Badge className="bg-primary text-primary-foreground font-nunito-sans">
                Promoted
              </Badge>
            )}
          </div>
          {property.address && (
            <div className="flex items-center gap-2 text-white/90 font-nunito-sans">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{property.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealtyTopImage;
