import React from "react";

export type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

export type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  currentUserId?: string | null;
};

const GenericTable = <T,>({
  data,
  columns,
  className,
  currentUserId,
}: GenericTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className={className}>
        <thead>
          <tr className="border-y bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 font-semibold text-sm"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={(item as unknown as { id: string }).id}
              className={`border-b hover:bg-muted/50 transition-colors ${currentUserId === (item as unknown as { id: string }).id ? "bg-muted-foreground/20 hover:!bg-muted-foreground/20" : ""}`}
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
