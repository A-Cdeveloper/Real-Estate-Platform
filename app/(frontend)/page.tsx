import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
//import Hero from "@/features/frontend/layout/Hero";
import LatestNews from "@/features/frontend/news/LatestNews";
import LatestProprietes from "@/features/frontend/proprietes/LatestProprietes";
import PromotedProprietes from "@/features/frontend/proprietes/PromotedProprietes";
import RealtyStats from "@/features/frontend/proprietes/RealtyStats";
import CarouselSkeleton from "@/components/frontend/skeletons/CarouselSkeleton";
import LatestNewsSkeleton from "@/components/frontend/skeletons/LatestNewsSkeleton";
import { Suspense } from "react";
import Hero from "@/features/frontend/Hero";
import RealtyStatsSkeleton from "@/components/frontend/skeletons/RealtyStatsSkeleton";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "Find Your Perfect Property",
    undefined,
    SITE_URL
  );
}

export default async function HomePage() {
  return (
    <>
      <Hero />

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
            <Suspense fallback={<RealtyStatsSkeleton />}>
              <RealtyStats />
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
            <Suspense fallback={<LatestNewsSkeleton />}>
              <LatestNews />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
