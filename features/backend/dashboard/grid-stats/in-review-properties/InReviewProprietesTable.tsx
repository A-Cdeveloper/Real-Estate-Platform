"use client";

import GenericTable from "@/components/shared/ui/GenericTable";
import { InReviewProperty } from "@/types/properties";
import { getColumns } from "./columns";

/**
 * Client component that displays in-review properties table
 * Receives data as props from server component
 */
const InReviewProprietesTable = ({
  properties,
}: {
  properties: InReviewProperty[];
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-2">
        No properties in review
      </div>
    );
  }

  return (
    <GenericTable
      data={properties}
      columns={getColumns()}
      showHeader={false}
      className="text-[13px] text-muted-foreground w-full"
    />
  );
};

export default InReviewProprietesTable;

