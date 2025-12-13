import { cn } from "@/lib/utils";
import { Database } from "lucide-react";

type TableRecordsCountProps = {
  total: number;
  className?: string;
};

/**
 * TableRecordsCount component
 * Displays the total number of records in a table
 * @param total - The total number of records
 * @param className - Optional additional className
 */
const TableRecordsCount = ({ total, className }: TableRecordsCountProps) => {
  const recordText = total === 1 ? "record" : "records";
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Total: ${total} ${recordText}`}
    >
      <Database className="size-4" aria-hidden="true" />
      <span>
        <span className="font-semibold text-foreground">{total}</span>{" "}
        <span className="text-muted-foreground">{recordText}</span>
      </span>
    </div>
  );
};

export default TableRecordsCount;
