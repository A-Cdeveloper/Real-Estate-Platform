import GridWrapper from "./GridWrapper";
import { getAllProperties } from "@/server/queries/properties";
import { PropertyStatus } from "@prisma/client";
import { Property } from "@prisma/client";

/**
 * Server component that loads data for dashboard grid
 * Wraps GridWrapper (client component) and passes data as props
 */
const DashboardGrid = async () => {
  // Load all data for grid stats in parallel
  const [inReviewProperties] = await Promise.all([
    getAllProperties({
      filters: { status: PropertyStatus.IN_REVIEW },
      limit: 10,
      includeRelations: true,
    }),
    // Add more queries here as needed for other grid cards
  ]);

  return (
    <GridWrapper
      inReviewProperties={inReviewProperties.properties as Property[]}
    />
  );
};

export default DashboardGrid;

