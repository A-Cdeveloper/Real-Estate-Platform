"use client";

import { useEffect, useState, ReactNode } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { customIcon } from "./CustumMarkerIcon";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/ui/Spinner";

type MapDisplayProps = {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  interactive?: boolean; // Allow clicking to update location
  showAddress?: boolean; // Show address display below map
  height?: string; // Custom height class, defaults to "aspect-video"
  zoom?: number; // Custom zoom level, defaults to 13 or 15 if coordinates exist
  clickHandler?: ReactNode; // Optional click handler component (for backend interactive maps)
  onRemove?: () => void; // Optional remove handler component (for backend interactive maps)
  loadingAddress?: boolean; // Show loading state while fetching address
};

/**
 * Shared MapDisplay component using Leaflet
 * Can be used in both backend (interactive) and frontend (display only)
 */
const MapDisplay = ({
  lat = null,
  lng = null,
  address = null,
  interactive = false,
  showAddress = false,
  height = "aspect-video",
  zoom,
  clickHandler,
  onRemove,
  loadingAddress = false,
}: MapDisplayProps) => {
  const [isMounted, setIsMounted] = useState(false);
  // Default center (Beograd)
  const defaultCenter: [number, number] = [44.7866, 20.4489];
  const center: [number, number] = lat && lng ? [lat, lng] : defaultCenter;
  const mapZoom = zoom ?? (lat && lng ? 15 : 13);

  useEffect(() => {
    // Mark component as mounted to avoid SSR issues with Leaflet
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`${height} rounded-md border border-dashed text-sm text-muted-foreground flex items-center justify-center`}
        role="status"
        aria-live="polite"
      >
        Loading map...
      </div>
    );
  }

  let addressField = (
    <span className="text-muted-foreground">
      {interactive ? "Click on map to set address" : "Address not available"}
    </span>
  );

  if (loadingAddress) {
    addressField = (
      <div className="flex items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-muted-foreground">Loading address...</span>
      </div>
    );
  } else if (onRemove && address) {
    addressField = (
      <div className="flex items-center gap-2">
        <address>{address}</address>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          className="absolute right-1 top-1/2 -translate-y-1/2"
          aria-label="Remove address from map"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {showAddress && (
        <div
          className="flex h-10 w-full rounded-md bg-foreground/10 px-3 
        py-2 text-sm text-foreground/70 items-center relative"
        >
          {addressField}
        </div>
      )}

      <div
        className={`${height} rounded-md border border-dashed overflow-hidden`}
        role="application"
        aria-label={
          interactive ? "Interactive map for selecting location" : "Map display"
        }
      >
        <MapContainer
          center={center}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {interactive && clickHandler}
          {lat && lng && <Marker position={[lat, lng]} icon={customIcon} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapDisplay;
