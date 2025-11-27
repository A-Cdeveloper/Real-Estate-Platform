"use client";
import { useMapEvents } from "react-leaflet";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateLocation } from "@/server/actions/settings";

/**
 * MapClickHandler component handles click events on the map
 * and updates the location when user clicks on the map
 */
export default function MapClickHandler() {
  const [, startTransition] = useTransition();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      startTransition(async () => {
        const result = await updateLocation(lat, lng);
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
