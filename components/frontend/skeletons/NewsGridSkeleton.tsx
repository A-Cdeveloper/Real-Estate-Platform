import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { NEWS_PER_PAGE } from "@/lib/constants";

const NewsItemSkeleton = () => (
  <Card className="overflow-hidden p-0">
    <Skeleton className="h-56 w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-2/3" />
      <Skeleton className="h-2 w-1/2" />
      <Skeleton className="h-2 w-24" />
    </div>
  </Card>
);

const NewsGridSkeleton = () => {
  return (
    <>
      {/* Meta skeleton */}
      <div className="mb-6">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: NEWS_PER_PAGE }).map((_, index) => (
          <NewsItemSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </>
  );
};

export default NewsGridSkeleton;
