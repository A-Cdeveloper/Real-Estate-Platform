"use client";
import GenericTable from "@/components/shared/GenericTable";
import PaginationControls from "@/components/shared/PaginationControls";
import { Button } from "@/components/ui/button";
import { PropertyWithOwner } from "@/types/properties";
import { Building } from "lucide-react";
import Link from "next/link";
import { getColumns } from "./table/columns";
import { sortableColumns } from "./table/sortableColumns";

type AllProprietesProps = {
  properties: PropertyWithOwner[];
  total: number;
  page: number;
  totalPages: number;
  sort: string;
  isAdmin: boolean;
};

const AllProprietes = ({
  properties,
  total,
  page,
  totalPages,
  sort,
  isAdmin,
}: AllProprietesProps) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="border-y border-border p-2">#FILTER</div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Total: {total}</span>
        <Link href="/proprietes-area/add">
          <Button>
            <Building className="size-4 mr-2" />
            Add Property
          </Button>
        </Link>
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
          queryParams={{ sort: sort || "createdAt_desc" }}
        />
      )}
    </div>
  );
};

export default AllProprietes;
