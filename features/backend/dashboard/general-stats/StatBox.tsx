import { cn } from "@/lib/utils";

type StatboxType = {
  title: string;
  extraText?: string;
  count: number | string;
  icon: React.ReactNode;
  className?: string;
};

const StatBox = ({ title, extraText, count, icon, className }: StatboxType) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-primary/5 p-4 shadow-sm flex items-center gap-3",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </div>
        <div className="text-2xl font-semibold tracking-tight">{count}</div>
        <div className="text-xs text-muted-foreground">{extraText}</div>
      </div>
    </div>
  );
};

export default StatBox;
