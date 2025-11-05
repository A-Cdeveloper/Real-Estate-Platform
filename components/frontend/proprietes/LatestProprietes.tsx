import { getLatestProperties } from "@/lib/queries/properties";
import RealtyListItem from "./RealtyListItem";
import CarouselCustum from "@/components/frontend/CarouselCustum";
import EmptyState from "@/components/frontend/EmptyState";
import { LATEST_PROPERTIES_COUNT } from "@/lib/constants";

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
    <>
      <CarouselCustum
        items={latestProperties}
        render={(property) => <RealtyListItem property={property} />}
      />
    </>
  );
};

export default LatestProprietes;
