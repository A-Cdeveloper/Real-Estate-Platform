import { Card, CardContent } from "@/components/ui/card";
import { PropertyWithOwner } from "@/types/properties";
import { LayoutDashboard, MapPin, Square } from "lucide-react";

const RealyDetailsWidget = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="font-semibold text-lg lg:text-xl">{value}</p>
      </div>
    </div>
  );
};

const RealyDetails = ({ property }: { property: PropertyWithOwner }) => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
              Price
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-nunito font-bold text-primary">
              €{property.price.toLocaleString()}
            </p>
          </div>
          {property.area && (
            <div className="text-right">
              <p className="text-muted-foreground font-nunito-sans text-sm mb-1">
                Area
              </p>
              <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-nunito font-bold text-foreground">
                <Square className="w-6 h-6" />
                <span>{property.area} m²</span>
              </div>
            </div>
          )}
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <RealyDetailsWidget
            label="Type"
            value={property.type || "N/A"}
            icon={<LayoutDashboard className="w-8 h-8 text-primary shrink-0" />}
          />
          {property.address && (
            <RealyDetailsWidget
              label="Location"
              value={property.address}
              icon={<MapPin className="w-8 h-8 text-primary shrink-0" />}
            />
          )}

          {property.area && (
            <RealyDetailsWidget
              label="Price per m²"
              value={`€${Math.round(property.price / property.area).toLocaleString()}`}
              icon={<Square className="w-8 h-8 text-primary shrink-0" />}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealyDetails;
