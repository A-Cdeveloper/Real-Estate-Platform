import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load chart components to reduce initial bundle size
// These components use recharts which is a large library (~200KB+)
const PropertiesTimeline = dynamic(
  () => import("./proprietes-tab-timeline/PropertiesTimeline"),
  { ssr: true }
);
const ProprietesCharts = dynamic(
  () => import("./proprietes-tab-charts/ProprietesCharts"),
  { ssr: true }
);
const PropertiesRangeChart = dynamic(
  () => import("./proprietes-tab-range/PropertiesRangeChart"),
  { ssr: true }
);
const TopUsersChart = dynamic(() => import("./top-users/TopUsersChart"), {
  ssr: true,
});

// Non-chart components can be imported normally
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import LatestNews from "./latest-news/LatestNews";
import OnlineUsers from "./online-users/OnlineUsers";
const GridWrapper = () => {
  return (
    <section
      className="max-w-7xl my-12 space-y-12"
      aria-label="Dashboard statistics grid"
    >
      <div className="flex flex-col w-full">
        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <PropertiesTimeline />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-12">
          <ErrorBoundary>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <InReviewProprietes />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <ProprietesCharts />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <PropertiesRangeChart />
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
              <TopUsersChart />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LatestNews />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default GridWrapper;
