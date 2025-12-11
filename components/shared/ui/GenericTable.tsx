import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

export type GenericTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  currentUserId?: string | null;
  sortableColumns?: string[];
  defaultSortField?: string;
};

const GenericTable = <T extends { id: string }>({
  data,
  columns,
  sortableColumns,
  className,
  currentUserId,
  defaultSortField,
}: GenericTableProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");

  let sortField: string | undefined = defaultSortField;
  let sortOrder: "asc" | "desc" = "asc";

  if (sort) {
    const [field, order] = sort.split("_");
    if (field && (order === "asc" || order === "desc")) {
      sortField = field;
      sortOrder = order as "asc" | "desc";
    }
  }

  if (sortField && sortableColumns && !sortableColumns.includes(sortField)) {
    sortField = defaultSortField;
  }

  const isSortable = useCallback(
    (field: string) => {
      return sortableColumns && sortableColumns.includes(field);
    },
    [sortableColumns]
  );

  const toggleSort = useCallback(
    (field: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", `${field}_${sortOrder === "asc" ? "desc" : "asc"}`);
      router.push(`?${params.toString()}`);
    },
    [sortOrder, router, searchParams]
  );

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className={className} role="table" aria-label="Data table">
        <thead>
          <tr className="border-y bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 font-semibold text-sm"
              >
                <div
                  className={`flex items-center gap-2 ${isSortable(col.key) ? "cursor-pointer" : ""}`}
                  onClick={
                    isSortable(col.key) ? () => toggleSort(col.key) : undefined
                  }
                  role={isSortable(col.key) ? "button" : undefined}
                  tabIndex={isSortable(col.key) ? 0 : undefined}
                  aria-label={
                    isSortable(col.key)
                      ? `Sort by ${col.label} ${sortField === col.key && sortOrder === "asc" ? "descending" : "ascending"}`
                      : undefined
                  }
                  onKeyDown={
                    isSortable(col.key)
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleSort(col.key);
                          }
                        }
                      : undefined
                  }
                >
                  {col.label}
                  <span className="block">
                    {isSortable(col.key) &&
                      sortField === col.key &&
                      (sortOrder === "asc" ? (
                        <ChevronUp size={16} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={16} aria-hidden="true" />
                      ))}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={`border-b hover:bg-muted/50 transition-colors ${currentUserId === item.id ? "bg-muted-foreground/20 hover:!bg-muted-foreground/20" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
