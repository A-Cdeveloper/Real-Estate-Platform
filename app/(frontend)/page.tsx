import LatestNews from "@/components/frontend/news/LatestNews";
import LatestProprietes from "@/components/frontend/proprietes/LatestProprietes";
import PromotedProprietes from "@/components/frontend/proprietes/PromotedProprietes";
import { Spinner } from "@/components/frontend/Spinner";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <>
      {/* <Hero /> */}

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Row 1: Promoted Properties + Latest News */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<Spinner />}>
                <PromotedProprietes />
              </Suspense>
            </div>
            <LatestNews />
          </div>

          {/* Row 2: Latest Properties + Future Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<Spinner />}>
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
