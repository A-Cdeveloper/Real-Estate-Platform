/**
 * ProprietesList component
 * @param params - search params from URL
 * @returns ProprietesList component
 */

import { calculateSkip, getPaginationData } from "@/lib/utils/pagination";
import { parsePropertySearchParams } from "@/lib/utils/parseSearchParams";
import { getAllProperties } from "@/server/queries/properties";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import EmptyState from "@/features/frontend/EmptyState";
import ProprietesMeta from "@/features/frontend/proprietes/ProprietesMeta";
import RealtyListItem from "@/features/frontend/proprietes/RealtyListItem";
import PaginationControls from "@/components/shared/PaginationControls";

const ProprietesList = async ({
  params,
}: {
  params: { [key: string]: string | undefined };
}) => {
  // parse search params
  const { page, filters, queryParams, sort } =
    parsePropertySearchParams(params);

  const skip = calculateSkip(page, ITEMS_PER_PAGE);
  const { properties, total } = await getAllProperties(
    ITEMS_PER_PAGE,
    skip,
    filters,
    sort
  );

  // get pagination data
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
