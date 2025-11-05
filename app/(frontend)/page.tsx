//import Hero from "@/components/frontend/layout/Hero";
import LatestNews from "@/components/frontend/news/LatestNews";
import LatestProprietes from "@/components/frontend/proprietes/LatestProprietes";
import PromotedProprietes from "@/components/frontend/proprietes/PromotedProprietes";
import CarouselSkeleton from "@/components/frontend/skeletons/CarouselSkeleton";
import { Suspense } from "react";
import LatestNewsSkeleton from "@/components/frontend/skeletons/LatestNewsSkeleton";

export default async function HomePage() {
  return (
    <>
      {/* <Hero /> */}

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Row 1: Promoted Properties + Latest News */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Suspense
              fallback={
                <CarouselSkeleton
                  itemsCount={3}
                  itemClassName="basis-full md:basis-1/2 lg:basis-1/2"
                  showTitle={true}
                  colSpan="2"
                />
              }
            >
              <PromotedProprietes />
            </Suspense>

            <Suspense fallback={<LatestNewsSkeleton />}>
              <LatestNews />
            </Suspense>
          </div>

          {/* Row 2: Latest Properties + Future Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Suspense
              fallback={
                <CarouselSkeleton itemsCount={3} showTitle={true} colSpan="2" />
              }
            >
              <LatestProprietes />
            </Suspense>
            <div className="lg:col-span-1">
              {/* Future widget placeholder */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
