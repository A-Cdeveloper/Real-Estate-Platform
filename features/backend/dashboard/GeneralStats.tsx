import { Suspense } from "react";
import TotalProperties from "./general-stats/components/TotalProperties";
import ApprovedProperties from "./general-stats/components/ApprovedProperties";
import AvgPrice from "./general-stats/components/AvgPrice";
import UserStats from "./general-stats/components/UserStats";
import StatBoxSkeleton from "./general-stats/shared/StatBoxSkeleton";
import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";

const GeneralStats = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 max-w-5xl">
      <ErrorBoundary>
        <Suspense fallback={<StatBoxSkeleton />}>
          <TotalProperties />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<StatBoxSkeleton />}>
          <ApprovedProperties />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<StatBoxSkeleton />}>
          <AvgPrice />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<StatBoxSkeleton />}>
          <UserStats />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default GeneralStats;
