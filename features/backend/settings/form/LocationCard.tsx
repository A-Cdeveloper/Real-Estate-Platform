import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Suspense } from "react";
import { Spinner } from "@/components/shared/Spinner";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("../map/LocationMap"), { ssr: false });

type LocationCardProps = {
  lat: number | null;
  lng: number | null;
  address: string | null;
};

const LocationCard = ({ lat, lng, address }: LocationCardProps) => (
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
        <LocationMap lat={lat} lng={lng} address={address} />
      </Suspense>
    </CardContent>
  </Card>
);

export default LocationCard;
