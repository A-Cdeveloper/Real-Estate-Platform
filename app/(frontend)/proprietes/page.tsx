import type { Metadata } from "next";
import { APP_NAME, SITE_URL, ITEMS_PER_PAGE } from "@/lib/constants";
import RealtyListItem from "@/components/frontend/proprietes/RealtyListItem";
import PaginationControls from "@/components/frontend/PaginationControls";
import { getAllProperties } from "@/lib/queries/properties";
import ProprietesMeta from "@/components/frontend/proprietes/ProprietesMeta";
import { calculateSkip, getPaginationData } from "@/lib/utils/pagination";
import PropertiesGridSkeleton from "@/components/frontend/skeletons/PropertiesGridSkeleton";
import EmptyState from "@/components/frontend/EmptyState";

import { Suspense } from "react";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: `Properties | ${APP_NAME}`,
  description:
    "Browse our extensive collection of properties for sale and rent. Find your perfect home, apartment, or investment property with Real Estate Pro.",
  openGraph: {
    title: `Properties | ${APP_NAME}`,
    description:
      "Browse our extensive collection of properties for sale and rent. Find your perfect home, apartment, or investment property with Real Estate Pro.",
    url: `${SITE_URL}/proprietes`,
    type: "website",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProprietesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <Typography variant="h1" className="mb-8">
        All Proprietes
      </Typography>

      <Suspense key={page} fallback={<PropertiesGridSkeleton />}>
        <ProprietesList page={page} />
      </Suspense>
    </section>
  );
};

export default ProprietesPage;

/**
 * ProprietesList component
 * @param page - current page number
 * @returns ProprietesList component
 */

const ProprietesList = async ({ page }: { page: number }) => {
  const skip = calculateSkip(page, ITEMS_PER_PAGE);
  const { properties, total } = await getAllProperties(ITEMS_PER_PAGE, skip);

  const { start, end, currentPage, totalPages } = getPaginationData(
    page,
    ITEMS_PER_PAGE,
    total
  );

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        message="There are no properties available at this time."
      />
    );
  }

  return (
    <>
      <ProprietesMeta start={start} end={end} total={total} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {properties.map((property) => (
          <RealtyListItem key={property.id} property={property} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/proprietes"
      />
    </>
  );
};
