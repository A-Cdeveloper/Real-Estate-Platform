import { getInReviewProperties } from "@/server/queries/dashboard-grid";
import GridCard from "../shared/GridCard";
import InReviewProprietesTable from "./InReviewProprietesTable";

/**
 * Server component that fetches and displays in-review properties
 */
const InReviewProprietes = async () => {
  const properties = await getInReviewProperties();

  return (
    <GridCard
      title="Properties in review"
      subtitle={`${properties.length} properties`}
    >
      <InReviewProprietesTable properties={properties} />
    </GridCard>
  );
};

export default InReviewProprietes;
