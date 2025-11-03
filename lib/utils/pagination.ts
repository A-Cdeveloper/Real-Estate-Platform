/**
 * Calculate skip value based on page number and items per page
 */
export function calculateSkip(page: number, itemsPerPage: number): number {
  return (page - 1) * itemsPerPage;
}

/**
 * Generate URL for a specific page
 */
export function getPageUrl(
  page: number,
  baseUrl: string = "",
  queryParams?: Record<string, string>
): string {
  const url = new URL(baseUrl, "http://localhost"); // dummy base, we only need searchParams
  url.searchParams.set("page", String(page));

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return `${baseUrl}?${url.searchParams.toString()}`;
}

/**
 * Get pagination range (start and end indices for display)
 */
export function getPaginationRange(
  currentPage: number,
  itemsPerPage: number,
  total: number
) {
  const skip = calculateSkip(currentPage, itemsPerPage);
  const start = skip + 1;
  const end = Math.min(skip + itemsPerPage, total);

  return { start, end };
}

/**
 * Get all pagination data in one call
 */
export function getPaginationData(
  page: number,
  itemsPerPage: number,
  total: number
) {
  const skip = calculateSkip(page, itemsPerPage);
  const totalPages = Math.ceil(total / itemsPerPage);
  const { start, end } = getPaginationRange(page, itemsPerPage, total);

  return {
    skip,
    totalPages,
    start,
    end,
    currentPage: page,
  };
}
