//import Hero from "@/components/frontend/layout/Hero";
import LatestNews from "@/components/frontend/news/LatestNews";
import LatestProprietes from "@/components/frontend/proprietes/LatestProprietes";
import PromotedProprietes from "@/components/frontend/proprietes/PromotedProprietes";
import CarouselSkeleton from "@/components/frontend/skeletons/CarouselSkeleton";
import { Suspense } from "react";
import { Typography } from "@/components/ui/typography";
import LatestNewsSkeleton from "@/components/frontend/skeletons/LatestNewsSkeleton";

export default async function HomePage() {
  return (
    <>
      {/* <Hero /> */}

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Row 1: Promoted Properties + Latest News */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Typography variant="h2" className="mb-6">
                Promoted Properties
              </Typography>
              <Suspense
                fallback={
                  <CarouselSkeleton
                    itemsCount={3}
                    itemClassName="basis-full md:basis-1/2 lg:basis-1/2"
                  />
                }
              >
                <PromotedProprietes />
              </Suspense>
            </div>
            <Suspense fallback={<LatestNewsSkeleton />}>
              <LatestNews />
            </Suspense>
          </div>

          {/* Row 2: Latest Properties + Future Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Typography variant="h2" className="mb-6">
                Latest Properties
              </Typography>
              <Suspense fallback={<CarouselSkeleton itemsCount={3} />}>
                <LatestProprietes />
              </Suspense>
            </div>
            <div className="lg:col-span-1">
              {/* Future widget placeholder */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
