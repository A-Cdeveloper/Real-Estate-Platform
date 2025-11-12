import { Typography } from "@/components/ui/typography";

const RealtyLocationMap = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  // Proveri da li postoje validne koordinate
  if (!latitude || !longitude || latitude === 0 || longitude === 0) {
    return (
      <div className="rounded-2xl border bg-secondary/30 p-6">
        <Typography variant="h3" className="mb-2 text-lg font-semibold">
          Location
        </Typography>
        <Typography className="text-sm text-muted-foreground">
          Location information is not available for this property.
        </Typography>
      </div>
    );
  }

  // Google Maps embed URL sa pinom na koordinatama
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`;

  return (
    <div className="rounded-2xl border bg-secondary/30 overflow-hidden">
      <div className="relative w-full aspect-square">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Property location map"
        />
      </div>
    </div>
  );
};

export default RealtyLocationMap;
