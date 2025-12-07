import MapDisplay from "./MapDisplay";
import { ReactNode } from "react";

/**
 * LocationMap component for backend forms
 * Generic wrapper around MapDisplay with interactive features enabled
 * Handler must be provided via clickHandler prop
 */
type LocationMapProps = {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  clickHandler?: ReactNode; // Handler component to handle map clicks
};

const LocationMap = ({
  lat = null,
  lng = null,
  address = null,
  clickHandler,
}: LocationMapProps) => {
  return (
    <MapDisplay
      lat={lat}
      lng={lng}
      address={address}
      interactive={true}
      showAddress={true}
      clickHandler={clickHandler}
    />
  );
};

export default LocationMap;
