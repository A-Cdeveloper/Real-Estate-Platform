"use client";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { customIcon } from "./CustumMarkerIcon";
import MapClickHandler from "./MapClickHandler";

/**
 * LocationMap component is a map component that displays a map of the location.
 * It uses the Leaflet library to display the map.
 */
/**
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @returns The LocationMap component.
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
  // State to handle mounted state of the map
  const [isMounted, setIsMounted] = useState(false);
  // Default center (Beograd)
  const defaultCenter: [number, number] = [44.7866, 20.4489];
  const center: [number, number] = lat && lng ? [lat, lng] : defaultCenter;

  useEffect(() => {
    // Mark component as mounted to avoid SSR issues with Leaflet
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-64 rounded-md border border-dashed text-sm text-muted-foreground flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex h-10 w-full rounded-md bg-foreground/10 px-3 py-2 text-sm text-foreground/70 items-center">
        {address || (
          <span className="text-muted-foreground">
            Click on map to set address
          </span>
        )}
      </div>

      <div className="aspect-video rounded-md border border-dashed overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {lat && lng && <Marker position={[lat, lng]} icon={customIcon} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
