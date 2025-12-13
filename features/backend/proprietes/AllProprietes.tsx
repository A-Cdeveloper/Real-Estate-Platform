"use client";
import GenericTable from "@/components/shared/ui/GenericTable";
import PaginationControls from "@/components/shared/pagination/PaginationControls";
import IconButton from "@/components/shared/ui/IconButton";
import TableRecordsCount from "@/components/shared/table/TableRecordsCount";
import { PropertyFilters, PropertyWithOwner } from "@/types/properties";
import { Building } from "lucide-react";
import Link from "next/link";
import { getColumns } from "./table/columns";
import { sortableColumns } from "./table/sortableColumns";
import ProprietesFilters from "./filters/ProprietesFilters";

type AllProprietesProps = {
  properties: PropertyWithOwner[];
  total: number;
  page: number;
  totalPages: number;
  sort: string;
  isAdmin: boolean;
  filters: PropertyFilters;
};

const AllProprietes = ({
  properties,
  total,
  page,
  totalPages,
  sort,
  isAdmin,
  filters,
}: AllProprietesProps) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="flex justify-end">
        <IconButton asChild icon={Building} label="Add Property">
          <Link href="/proprietes-area/add" />
        </IconButton>
      </div>

      <div className="flex items-center justify-between border-y border-border/50 p-3">
        <ProprietesFilters /> <TableRecordsCount total={total} />
      </div>
      <GenericTable
        data={properties}
        columns={getColumns(isAdmin)}
        defaultSortField="status"
        sortableColumns={sortableColumns}
        className="text-sm text-muted-foreground w-full"
      />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/proprietes-area"
          queryParams={{
            sort: sort || "createdAt_desc",
            ...(filters.status && { status: filters.status }),
            ...(filters.type && { type: filters.type }),
            ...(filters.promoted !== undefined && {
              promoted: filters.promoted ? "true" : "false",
            }),
          }}
        />
      )}
    </div>
  );
};

export default AllProprietes;
