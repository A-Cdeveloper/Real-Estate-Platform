const StatBoxSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm flex items-center gap-3 animate-pulse">
      <div className="h-12 w-12 rounded-full bg-muted" />
      <div className="flex flex-col gap-1 flex-1">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-8 w-16 bg-muted rounded" />
        <div className="h-3 w-32 bg-muted rounded" />
      </div>
    </div>
  );
};

export default StatBoxSkeleton;

