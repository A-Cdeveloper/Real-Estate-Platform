import { Spinner } from "@/components/shared/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LocationMap = dynamic(() => import("../map/LocationMap"), {
  ssr: false,
});
type LocationCardProps = {
  lat: number | null;
  lng: number | null;
  address: string | null;
};

const LocationCard = ({ lat, lng, address }: LocationCardProps) => {
  console.log(lat, lng, address);
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
          {/* <div className="border-2 border-dashed border-border rounded-lg p-8 flex items-center justify-center h-[300px] bg-muted/20 hover:bg-muted/30 transition-colors">
            <div className="text-center space-y-2">
              <MapPin className="size-8 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">Interactive Map</p>
              <p className="text-xs text-muted-foreground/70">Coming soon</p>
            </div>
          </div> */}
          {/* <Suspense fallback={<Spinner className="size-4" />}>
            <LocationMap lat={lat} lng={lng} address={address} />
          </Suspense> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationCard;
