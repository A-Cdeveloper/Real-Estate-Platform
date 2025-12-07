import MapDisplay from "@/components/shared/map/MapDisplay";

/**
 * LocationMap component for backend settings
 * Wrapper around shared MapDisplay with interactive features enabled
 */
type LocationMapProps = {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
};

const LocationMap = ({
  lat = null,
  lng = null,
  address = null,
}: LocationMapProps) => {
  return (
    <MapDisplay
      lat={lat}
      lng={lng}
      address={address}
      interactive={true}
      showAddress={true}
    />
  );
};

export default LocationMap;
