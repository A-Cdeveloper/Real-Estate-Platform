import { Suspense } from "react";
import TotalProperties from "./TotalProperties";
import ApprovedProperties from "./ApprovedProperties";
import AvgPrice from "./AvgPrice";
import UserStats from "./UserStats";
import StatBoxSkeleton from "./StatBoxSkeleton";

const GeneralStats = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 max-w-5xl">
      <Suspense fallback={<StatBoxSkeleton />}>
        <TotalProperties />
      </Suspense>

      <Suspense fallback={<StatBoxSkeleton />}>
        <ApprovedProperties />
      </Suspense>

      <Suspense fallback={<StatBoxSkeleton />}>
        <AvgPrice />
      </Suspense>

      <Suspense fallback={<StatBoxSkeleton />}>
        <UserStats />
      </Suspense>
    </section>
  );
};

export default GeneralStats;
