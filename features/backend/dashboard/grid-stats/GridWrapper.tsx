import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import OnlineUsers from "./online-users/OnlineUsers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GridWrapper = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr max-w-7xl my-12">
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <InReviewProprietes />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <OnlineUsers />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default GridWrapper;
