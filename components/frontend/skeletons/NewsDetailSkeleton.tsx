import { Skeleton } from "@/components/ui/skeleton";
import LatestNewsSkeleton from "./LatestNewsSkeleton";

const NewsDetailSkeleton = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Image */}
          <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg" />

          {/* Description */}
          <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <LatestNewsSkeleton
            showTitle={true}
            showButton={false}
            itemsCount={7}
            className="h-auto overflow-visible"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsDetailSkeleton;
