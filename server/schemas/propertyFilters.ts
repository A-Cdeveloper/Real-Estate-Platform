import { z } from "zod";
import { PropertyType } from "@prisma/client";

/**
 * Zod schema for property filters
 * All fields are optional since filters are optional
 */
export const propertyFiltersSchema = z
  .object({
    location: z.string().optional(),
    type: z
      .enum(Object.values(PropertyType) as [string, ...string[]])
      .optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  })
  .refine(
    (data) => {
      // If both minPrice and maxPrice are provided, maxPrice must be > minPrice
      if (data.minPrice && data.maxPrice) {
        const min = Number(data.minPrice);
        const max = Number(data.maxPrice);
        // Only validate if both are valid numbers
        if (!isNaN(min) && !isNaN(max)) {
          return max > min;
        }
      }
      return true;
    },
    {
      message: "Max price must be greater than min price",
      path: ["maxPrice"],
    }
  );
