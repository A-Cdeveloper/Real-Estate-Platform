import { getLatestProperties } from "@/server/queries/properties";
import RealtyListItem from "./RealtyListItem";
import CarouselCustum from "@/features/frontend/CarouselCustum";
import EmptyState from "@/features/frontend/EmptyState";
import { LATEST_PROPERTIES_COUNT } from "@/lib/constants";
import { Typography } from "@/components/ui/typography";

const LatestProprietes = async () => {
  const latestProperties = await getLatestProperties(LATEST_PROPERTIES_COUNT);

  if (latestProperties.length === 0) {
    return (
      <EmptyState
        title="No latest properties found"
        message="There are no latest properties available at this time."
      />
    );
  }

  return (
    <div className="lg:col-span-2">
      <Typography variant="h2" className="mb-6">
        Latest Properties
      </Typography>
      <CarouselCustum
        items={latestProperties}
        render={(property) => <RealtyListItem property={property} />}
      />
    </div>
  );
};

export default LatestProprietes;
