"use client";
import { PropertyWithOwner } from "@/types/properties";
import { getColumns } from "./table/columns";
import GenericTable from "@/components/shared/GenericTable";
import PaginationControls from "@/components/shared/PaginationControls";
import { sortableColumns } from "./table/sortableColumns";
import AddProperty from "./add/AddProperty";

type AllProprietesProps = {
  properties: PropertyWithOwner[];
  total: number;
  page: number;
  totalPages: number;
  sort: string;
};

const AllProprietes = ({
  properties,
  total,
  page,
  totalPages,
  sort,
}: AllProprietesProps) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="border-y border-border p-2">#FILTER</div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Total: {total}</span>
        <AddProperty />
      </div>
      <GenericTable
        data={properties}
        columns={getColumns()}
        defaultSortField="status"
        sortableColumns={sortableColumns}
        className="text-sm text-muted-foreground w-full"
      />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/proprietes-area"
          queryParams={{ sort: sort || "createdAt_desc" }}
        />
      )}
    </div>
  );
};

export default AllProprietes;
