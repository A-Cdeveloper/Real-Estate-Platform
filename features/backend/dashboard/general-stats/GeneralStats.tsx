import { Suspense } from "react";
import TotalProperties from "./TotalProperties";
import ApprovedProperties from "./ApprovedProperties";
import AvgPrice from "./AvgPrice";
import UserStats from "./UserStats";
import StatBoxSkeleton from "./StatBoxSkeleton";
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
