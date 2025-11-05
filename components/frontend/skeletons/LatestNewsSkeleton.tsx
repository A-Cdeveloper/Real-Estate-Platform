import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { LATEST_NEWS_COUNT } from "@/lib/constants";

const LatestNewsItemSkeleton = () => (
  <Card className="py-2 rounded-none border-0 border-b border-border pb-4 bg-transparent shadow-none">
    <div className="flex gap-4 px-2">
      <Skeleton className="w-20 h-20 flex-shrink-0 rounded-md" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </Card>
);

type LatestNewsSkeletonProps = {
  showTitle?: boolean;
};

const LatestNewsSkeleton = ({ showTitle = true }: LatestNewsSkeletonProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        {showTitle && <Skeleton className="h-8 w-48 mb-6" />}
        <div className="space-y-1.5 h-[360px] overflow-y-auto pe-4 custom-scrollbar relative">
          {Array.from({ length: LATEST_NEWS_COUNT }).map((_, index) => (
            <LatestNewsItemSkeleton key={index} />
          ))}
        </div>
        <div className="mt-2 flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSkeleton;

