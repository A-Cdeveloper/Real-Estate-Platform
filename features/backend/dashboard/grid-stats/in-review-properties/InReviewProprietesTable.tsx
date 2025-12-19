"use client";

import GenericTable from "@/components/shared/ui/GenericTable";
import { InReviewProperty } from "@/types/properties";
import { PropertyType } from "@prisma/client";
import { Info } from "lucide-react";
import { useMemo, useState } from "react";
import GridCard from "../shared/GridCard";
import { getColumns } from "./columns";
import FilterByType from "./FilterByType";

/**
 * Client component that displays in-review properties table with a grid card wrapper
 * Receives data as props from server component
 * Filters properties based on local state
 */
const InReviewProprietesTable = ({
  properties,
}: {
  properties: InReviewProperty[];
}) => {
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");

  // Filter properties based on local state
  const filteredProperties = useMemo(() => {
    if (!typeFilter || typeFilter === "all") return properties;
    return properties.filter((p) => p.type === typeFilter);
  }, [properties, typeFilter]);

  const isEmpty: boolean = useMemo(
    () => filteredProperties.length === 0,
    [filteredProperties]
  );

  return (
    <GridCard
      title="Properties in review status"
      subtitle={`${filteredProperties.length === 1 ? "1 property" : `${filteredProperties.length} properties`}`}
      headerExtra={
        !isEmpty && (
          <FilterByType
            typeFilter={typeFilter}
            onChangeFilter={setTypeFilter}
          />
        )
      }
    >
      {isEmpty ? (
        <div className="text-sm text-muted-foreground py-6 px-3 mx-auto flex items-center gap-2">
          <Info className="size-4" aria-hidden="true" />
          <span>No properties in review</span>
        </div>
      ) : (
        <GenericTable
          data={filteredProperties}
          columns={getColumns()}
          showHeader={false}
          className="text-[13px] text-muted-foreground w-full"
        />
      )}
    </GridCard>
  );
};

export default InReviewProprietesTable;
