"use client";
import { News } from "@prisma/client";
import { memo } from "react";
import { getColumns } from "./table/columns";
import GenericTable from "@/components/shared/ui/GenericTable";
import TableRecordsCount from "@/components/shared/table/TableRecordsCount";
import { sortableColumns } from "./table/sortableColumns";
import PaginationControls from "@/components/shared/pagination/PaginationControls";
import AddNews from "./add-edit/AddNews";

type AllNewsProps = {
  news: News[];
  total: number;
  page: number;
  totalPages: number;
  sort: string;
};

const AllNews = ({ news, total, page, totalPages, sort }: AllNewsProps) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="flex items-center justify-between">
        <TableRecordsCount total={total} />
        <AddNews />
      </div>
      <GenericTable
        data={news}
        columns={getColumns()}
        defaultSortField="createdAt"
        sortableColumns={sortableColumns}
        className="text-sm text-muted-foreground w-full"
      />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/news-editor"
          queryParams={{ sort: sort || "createdAt_desc" }}
        />
      )}
    </div>
  );
};

export default memo(AllNews);
