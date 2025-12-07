import { Spinner } from "@/components/shared/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LocationMap = dynamic(
  () => import("@/components/shared/map/LocationMap"),
  { ssr: false }
);

const MapClickHandler = dynamic(() => import("../map/MapClickHandler"), {
  ssr: false,
});

type LocationCardProps = {
  lat: number | null;
  lng: number | null;
  address: string | null;
  propertyId?: string; // Optional - only for edit forms
};

const LocationCard = ({ lat, lng, address, propertyId }: LocationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-orange-500/10">
            <MapPin className="size-4 text-orange-600 dark:text-orange-400" />
          </div>
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Spinner className="size-4" />}>
          <LocationMap
            lat={lat}
            lng={lng}
            address={address}
            clickHandler={
              propertyId ? (
                <MapClickHandler propertyId={propertyId} />
              ) : undefined
            }
          />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
