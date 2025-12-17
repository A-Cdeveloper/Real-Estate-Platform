import CarouselCustum from "@/features/frontend/CarouselCustum";
import { getPromotedProperties } from "@/server/queries/properties";
import RealtyListItem from "./RealtyListItem";
import EmptyState from "@/features/frontend/EmptyState";
import { PROMOTED_PROPERTIES_COUNT } from "@/lib/constants";
import { Typography } from "@/components/ui/typography";
import { PromotedProperty } from "@/types/properties";

const PromotedProprietes = async () => {
  const promotedProperties = await getPromotedProperties(
    PROMOTED_PROPERTIES_COUNT
  );

  if (promotedProperties.length === 0) {
    return (
      <div className="lg:col-span-2">
        <EmptyState title="No promoted properties found" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Typography variant="h2" className="mb-6">
        Promoted Properties
      </Typography>
      <CarouselCustum
        items={promotedProperties}
        render={(property: PromotedProperty) => (
          <RealtyListItem property={property} />
        )}
        itemClassName="basis-full sm:basis-1/2 lg:basis-1/2"
      />
    </div>
  );
};

export default PromotedProprietes;
