import { cn } from "@/lib/utils";
import { formatLongDate } from "@/lib/utils/date";
import { Calendar } from "lucide-react";

type NewsDateProps = {
  date: Date;
  className?: string;
  calendarClassName?: string;
};

const NewsDate = ({ date, className, calendarClassName }: NewsDateProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-muted-foreground font-nunito-sans text-sm",
        className
      )}
    >
      <Calendar className={cn("w-4 h-4", calendarClassName)} />
      <span>{formatLongDate(date)}</span>
    </div>
  );
};

export default NewsDate;
