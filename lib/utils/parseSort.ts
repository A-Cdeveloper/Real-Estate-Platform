/**
 * Parse sort string (e.g., "price_asc", "name_desc") into Prisma orderBy format
 * @param sort - Sort string in format "field_order"
 * @param defaultField - Default field to use if sort is invalid (default: "createdAt")
 * @param defaultOrder - Default order to use if sort is invalid (default: "desc")
 * @returns Object with field and order for Prisma orderBy
 */
export function parseSort(
  sort: string,
  defaultField: string = "createdAt",
  defaultOrder: "asc" | "desc" = "desc"
): { [key: string]: "asc" | "desc" } {
  const [field, order] = sort.split("_");
  let orderBy: { [key: string]: "asc" | "desc" } = {
    [defaultField]: defaultOrder,
  };

  if (field) {
    orderBy = { [field]: order as "asc" | "desc" };
  }

  return orderBy;
}
