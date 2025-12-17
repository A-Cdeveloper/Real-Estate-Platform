import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import OnlineUsers from "./online-users/OnlineUsers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LatestNews from "./latest-news/LatestNews";

const GridWrapper = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 auto-rows-fr max-w-7xl my-12">
      <div className="flex flex-col gap-12">
        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <InReviewProprietes />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="flex flex-col gap-12">
        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <OnlineUsers />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <LatestNews />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default GridWrapper;
