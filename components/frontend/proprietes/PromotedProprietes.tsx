import CarouselCustum from "@/components/frontend/CarouselCustum";
import { getPromotedProperties } from "@/lib/queries/properties";
import RealtyListItem from "./RealtyListItem";
import EmptyState from "@/components/frontend/EmptyState";
import { PROMOTED_PROPERTIES_COUNT } from "@/lib/constants";
import { Typography } from "@/components/ui/typography";

const PromotedProprietes = async () => {
  const promotedProperties = await getPromotedProperties(
    PROMOTED_PROPERTIES_COUNT
  );

  if (promotedProperties.length === 0) {
    return (
      <EmptyState
        title="No promoted properties found"
        message="There are no promoted properties available at this time."
      />
    );
  }

  return (
    <div className="lg:col-span-2">
      <Typography variant="h2" className="mb-6">
        Promoted Properties
      </Typography>
      <CarouselCustum
        items={promotedProperties}
        render={(property) => <RealtyListItem property={property} />}
        itemClassName="basis-full md:basis-1/2 lg:basis-1/2"
      />
    </div>
  );
};

export default PromotedProprietes;
