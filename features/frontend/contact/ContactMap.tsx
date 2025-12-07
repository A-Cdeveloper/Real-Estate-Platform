"use client";
import dynamic from "next/dynamic";

// Dynamically import MapDisplay to avoid SSR issues
const MapDisplayClient = dynamic(
  () => import("@/components/shared/map/MapDisplay"),
  {
    ssr: false,
  }
);

const ContactMap = ({
  lat,
  lng,
}: {
  lat: number | null;
  lng: number | null;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50">
      <MapDisplayClient lat={lat} lng={lng} height="h-[360px]" />
    </div>
  );
};

export default ContactMap;
