import { PropertyWithOwner } from "@/types/properties";
import { Square } from "lucide-react";
import { Calendar } from "lucide-react";
import { MapPin } from "lucide-react";
import { formatLongDate } from "@/lib/utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RealyDetails = ({ property }: { property: PropertyWithOwner }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
              Price
            </p>
            <p className="text-4xl font-nunito font-bold text-primary">
              €{property.price.toLocaleString()}
            </p>
          </div>
          {property.area && (
            <div className="text-right">
              <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
                Area
              </p>
              <div className="flex items-center gap-2 text-2xl font-nunito font-bold text-foreground">
                <Square className="w-6 h-6" />
                <span>{property.area} m²</span>
              </div>
            </div>
          )}
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-nunito-sans font-semibold text-sm">Listed</p>
              <p className="font-nunito-sans text-sm">
                {formatLongDate(property.createdAt)}
              </p>
            </div>
          </div>
          {property.address && (
            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-nunito-sans font-semibold text-sm">
                  Location
                </p>
                <p className="font-nunito text-sm line-clamp-2">
                  {property.address}
                </p>
              </div>
            </div>
          )}
          {property.area && (
            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
              <Square className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-nunito-sans font-semibold text-sm">
                  Price per m²
                </p>
                <p className="font-nunito font-semibold">
                  €{Math.round(property.price / property.area).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealyDetails;
