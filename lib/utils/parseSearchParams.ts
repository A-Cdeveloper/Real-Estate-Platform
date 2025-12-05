import { PropertyType } from "@prisma/client";
import { PropertyFilters } from "@/types/properties";

type SearchParams = { [key: string]: string | undefined };

type SearchParamsResult = {
  page: number;
  filters: PropertyFilters;
  queryParams: Record<string, string>;
  sort?: string;
};

/**
 * Parse search params and return page, filters, and queryParams
 */
export function parsePropertySearchParams(
  params: SearchParams
): SearchParamsResult {
  const page = Number(params.page) || 1;
  const type = params.type as PropertyType | undefined;
  const location = params.location;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;
  const sort = params.sort as string | undefined;

  // Create filters object
  const filters: PropertyFilters = {
    ...(type && { type }),
    ...(location && { location }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };

  // Create query params for pagination (without page)
  const queryParams: Record<string, string> = {};
  if (type) queryParams.type = type;
  if (location) queryParams.location = location;
  if (minPrice) queryParams.minPrice = minPrice;
  if (maxPrice) queryParams.maxPrice = maxPrice;
  if (sort) queryParams.sort = sort;

  return {
    page,
    filters,
    queryParams,
    sort,
  };
}
