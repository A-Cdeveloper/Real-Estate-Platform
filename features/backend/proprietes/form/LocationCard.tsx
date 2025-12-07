"use client";

import CustomInput from "@/components/shared/CustomInput";
import ErrorFormMessages from "@/components/shared/ErrorFormMessages";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { PropertyActionState } from "@/types/properties";
import { CreatePropertyFormData } from "@/server/schemas/property";

interface LocationCardProps {
  state: PropertyActionState<CreatePropertyFormData> | null;
  pending: boolean;
}

const LocationCard = ({ state, pending }: LocationCardProps) => {
  return (
    <div className="space-y-6">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-orange-500/10">
              <MapPin className="size-4 text-orange-600 dark:text-orange-400" />
            </div>
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Map Placeholder */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 flex items-center justify-center h-[300px] bg-muted/20 hover:bg-muted/30 transition-colors">
            <div className="text-center space-y-2">
              <MapPin className="size-8 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                Interactive Map
              </p>
              <p className="text-xs text-muted-foreground/70">
                Coming soon
              </p>
            </div>
          </div>

          {/* Address Input - Disabled for now, but required by schema */}
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <MapPin className="size-3.5" />
              Address (required - placeholder for now)
            </label>
            <CustomInput
              id="address"
              name="address"
              placeholder="123 Main Street, City"
              defaultValue="Temporary Address - Coming Soon"
              className="opacity-50 cursor-not-allowed"
            />
            <ErrorFormMessages
              state={state}
              fieldName="address"
              fieldId="address"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationCard;

