import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import LatestNews from "./latest-news/LatestNews";
import OnlineUsers from "./online-users/OnlineUsers";
import PriceRangeChart from "./proprietes-price-range/PriceRangeChart";
import ProprietesCharts from "./proprietes-tab-charts/ProprietesCharts";
import PropertiesTimeline from "./proprietes-tab-timeline/PropertiesTimeline";
import TopUsersChart from "./top-users/TopUsersChart";
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
              <PriceRangeChart />
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
