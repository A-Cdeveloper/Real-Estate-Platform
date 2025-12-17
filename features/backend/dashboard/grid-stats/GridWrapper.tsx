import ErrorBoundary from "@/components/shared/ui/ErrorBoundary";
import InReviewProprietes from "./in-review-properties/InReviewProprietes";
import UsersOnlineCard from "./online-users/OnlineUsersCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GridWrapper = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr max-w-7xl">
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <InReviewProprietes />
        </Suspense>
      </ErrorBoundary>

      <UsersOnlineCard />
    </section>
  );
};

export default GridWrapper;
