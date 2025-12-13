"use client";
import React from "react";
import GenericTable from "@/components/shared/ui/GenericTable";
import TableRecordsCount from "@/components/shared/table/TableRecordsCount";
import { UserWithProperties } from "@/types/user";
import AddNewUser from "./add-edit/AddNewUser";
import { getColumns } from "./table/columns";
import PaginationControls from "@/components/shared/pagination/PaginationControls";
import { sortableColumns } from "./table/sortableColumns";

type AllUsersProps = {
  users: UserWithProperties[];
  total: number;
  currentUserId: string;
  totalPages: number;
  page: number;
  sort: string;
};

const AllUsers = React.memo(
  ({ users, total, currentUserId, totalPages, page, sort }: AllUsersProps) => {
    return (
      <div className="space-y-4 w-full xl:w-3/4">
        <div className="flex items-center justify-between">
          <TableRecordsCount total={total} />
          <AddNewUser />
        </div>

        <GenericTable
          data={users}
          columns={getColumns(currentUserId)}
          sortableColumns={sortableColumns}
          defaultSortField="role"
          currentUserId={currentUserId}
          className="text-sm text-muted-foreground w-full"
        />
        {totalPages > 1 && (
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/users"
            queryParams={{ sort: sort || "role_asc" }}
          />
        )}
      </div>
    );
  }
);

AllUsers.displayName = "AllUsers";

export default AllUsers;
