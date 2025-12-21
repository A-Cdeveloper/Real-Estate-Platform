"use client";

import { Notification } from "@prisma/client";
import { memo } from "react";
import { getColumns } from "./table/columns";
import GenericTable from "@/components/shared/ui/GenericTable";
import TableRecordsCount from "@/components/shared/table/TableRecordsCount";
import { sortableColumns } from "./table/sortableColumns";
import PaginationControls from "@/components/shared/pagination/PaginationControls";

type AllNotificationsProps = {
  notifications: Notification[];
  total: number;
  page: number;
  totalPages: number;
  sort: string;
};

const AllNotifications = ({
  notifications,
  total,
  page,
  totalPages,
  sort,
}: AllNotificationsProps) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="flex items-center justify-between">
        <TableRecordsCount total={total} />
      </div>
      <GenericTable
        data={notifications}
        columns={getColumns()}
        defaultSortField="createdAt"
        sortableColumns={sortableColumns}
        className="text-sm text-muted-foreground w-full"
      />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/notifications"
          queryParams={{ sort: sort || "createdAt_desc" }}
        />
      )}
    </div>
  );
};

export default memo(AllNotifications);

