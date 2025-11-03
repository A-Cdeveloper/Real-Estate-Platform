import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Property } from "@prisma/client";
import { MapPin } from "lucide-react";
import { Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RealtyListItem = ({ property }: { property: Property }) => {
  return (
    <Link href={`/proprietes/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
        <div className="h-54 relative overflow-hidden">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="h-full bg-muted"></div>
          )}
        </div>
        <CardContent className="p-6 pt-0">
          <CardTitle className="font-nunito font-semibold text-lg mb-2">
            {property.name}
          </CardTitle>
          {property.address && (
            <div className="flex items-center gap-1 text-muted-foreground mb-2 font-nunito-sans text-sm">
              <MapPin className="w-4 h-4" />
              <span>{property.address}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-4 text-muted-foreground mb-4 font-nunito-sans text-sm">
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                {property.area} m²
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-nunito font-bold text-foreground">
                €{property.price.toLocaleString()}
              </span>
            </div>
            <Button variant="custum" className="font-nunito-sans">
              More details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RealtyListItem;
