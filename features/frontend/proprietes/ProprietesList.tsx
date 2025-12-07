/**
 * ProprietesList component
 * @param params - search params from URL
 * @returns ProprietesList component
 */

import { parsePropertySearchParams } from "@/lib/utils/parseSearchParams";
import { getAllProperties } from "@/server/queries/properties";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import EmptyState from "@/features/frontend/EmptyState";
import ProprietesMeta from "@/features/frontend/proprietes/ProprietesMeta";
import RealtyListItem from "@/features/frontend/proprietes/RealtyListItem";
import PaginationControls from "@/components/shared/pagination/PaginationControls";
import { Property } from "@prisma/client";

const ProprietesList = async ({
  params,
}: {
  params: { [key: string]: string | undefined };
}) => {
  // parse search params
  const { page, filters, queryParams, sort } =
    parsePropertySearchParams(params);

  const {
    properties,
    total,
    page: currentPage,
    totalPages,
  } = await getAllProperties({
    page,
    limit: ITEMS_PER_PAGE,
    filters,
    sort,
  });

  // Calculate start and end for display
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(start + ITEMS_PER_PAGE - 1, total);

  if (properties.length === 0) {
    return (
      <EmptyState title="There are no properties available at this time." />
    );
  }

  return (
    <>
      <ProprietesMeta start={start} end={end} total={total} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {properties.map((property: Property) => (
          <RealtyListItem key={property.id} property={property} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/proprietes"
          queryParams={queryParams}
        />
      )}
    </>
  );
};

export default ProprietesList;
