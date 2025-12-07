"use client";
import { useMapEvents } from "react-leaflet";
import { toast } from "sonner";
import { useTransition } from "react";
import { updatePropertyLocation } from "@/server/actions/properties";

/**
 * MapClickHandler component handles click events on the map
 * and updates the property location when user clicks on the map
 */
type MapClickHandlerProps = {
  propertyId: string;
};

export default function MapClickHandler({ propertyId }: MapClickHandlerProps) {
  const [, startTransition] = useTransition();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      startTransition(async () => {
        const result = await updatePropertyLocation(propertyId, lat, lng);
        if (result.success) {
          toast.success("Location updated successfully");
        } else {
          toast.error(result.error || "Failed to update location");
        }
      });
    },
  });
  return null;
}
