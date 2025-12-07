import MapDisplay from "@/components/shared/map/MapDisplay";
import dynamic from "next/dynamic";

const MapClickHandler = dynamic(() => import("./MapClickHandler"), {
  ssr: false,
});

/**
 * LocationMap component for backend proprietes
 * Wrapper around shared MapDisplay with interactive features enabled
 */
type LocationMapProps = {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  propertyId?: string; // Required if interactive is true
};

const LocationMap = ({
  lat = null,
  lng = null,
  address = null,
  propertyId,
}: LocationMapProps) => {
  return (
    <MapDisplay
      lat={lat}
      lng={lng}
      address={address}
      interactive={true}
      showAddress={true}
      clickHandler={
        propertyId ? <MapClickHandler propertyId={propertyId} /> : undefined
      }
    />
  );
};

export default LocationMap;
