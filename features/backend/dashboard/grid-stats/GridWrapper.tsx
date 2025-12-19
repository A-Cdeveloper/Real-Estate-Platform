import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import OnlineUsers from "./online-users/OnlineUsers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LatestNews from "./latest-news/LatestNews";
import ProprietesCharts from "./proprietes-tab-charts/ProprietesCharts";
import TopUsersChart from "./top-users/TopUsersChart";

const GridWrapper = () => {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-12  max-w-7xl my-12"
      aria-label="Dashboard statistics grid"
    >
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
    </section>
  );
};

export default GridWrapper;
