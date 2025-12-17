import GridCard from "./GridCard";
import InReviewProprietes from "../components/InReviewProprietes";
import { Property } from "@prisma/client";

/**
 * Dashboard grid items helper function
 * Returns array of grid items for the dashboard
 */
type DashboardGridItemsProps = {
  inReviewProperties: Property[];
  // Add more props as needed for other grid cards
};

export const getDashboardGridItems = ({
  inReviewProperties,
}: DashboardGridItemsProps) => {
  return [
    <div key="properties-in-review">
      <GridCard title="Properties in review">
        <InReviewProprietes properties={inReviewProperties} />
      </GridCard>
    </div>,
    // <div key="latest-new-properties">
    //   <GridCard title="Latest new properties">
    //     <div>2</div>
    //   </GridCard>
    // </div>,
    // <div key="properties-stats">
    //   <GridCard title="Latest news">
    //     <div>3</div>
    //   </GridCard>
    // </div>,
    // <div key="users-online-stats">
    //   <GridCard title="Users stats">
    //     <div>4</div>
    //   </GridCard>
    // </div>,
  ];
};

