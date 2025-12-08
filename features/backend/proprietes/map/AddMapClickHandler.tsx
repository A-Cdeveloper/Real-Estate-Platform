"use client";
import { useMapEvents } from "react-leaflet";
import { reverseGeocode } from "@/lib/geocoding";

type AddMapClickHandlerProps = {
  onLocationChange: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  onLoadingChange: (loading: boolean) => void;
};

export default function AddMapClickHandler({
  onLocationChange,
  onLoadingChange,
}: AddMapClickHandlerProps) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onLoadingChange(true);
      try {
        const address = await reverseGeocode(lat, lng);
        onLocationChange({ lat, lng, address: address || "" });
      } finally {
        onLoadingChange(false);
      }
    },
  });
  return null;
}
