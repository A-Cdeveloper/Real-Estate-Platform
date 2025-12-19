import { getInReviewProperties } from "@/server/queries/dashboard-grid";
import InReviewProprietesTable from "./InReviewProprietesTable";

/**
 * Server component that fetches and displays in-review properties
 * Client component handles filtering based on local state
 */
const InReviewProprietes = async () => {
  const properties = await getInReviewProperties();

  return <InReviewProprietesTable properties={properties} />;
};

export default InReviewProprietes;
