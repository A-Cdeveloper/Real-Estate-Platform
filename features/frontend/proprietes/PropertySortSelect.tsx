"use client";
/**
 * PropertySortSelect component
 * @returns PropertySortSelect component
 */

import React from "react";
import { PropertySort, PROPERTY_SORT_OPTIONS } from "@/types/properties";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Get the label for a sort option
 * @param sort - The sort option
 * @returns The label for the sort option
 */
const getSortLabel = (sort: PropertySort): string => {
  const [field, order] = sort.split("_");

  if (field === "createdAt") {
    return order === "desc" ? "Newest" : "Oldest";
  }

  const fieldLabel = field === "price" ? "Price" : "Area";
  const orderLabel = order === "asc" ? "Low to High" : "High to Low";
  return `${fieldLabel}: ${orderLabel}`;
};
/**
 * PropertySortSelect component
 * Handles the sort select and updates the URL
 */

const PropertySortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") as PropertySort) || undefined;

  const handleSortChange = (value: string) => {
    const sortValue = value as PropertySort | undefined;

    // Preserve existing query params
    const params = new URLSearchParams(searchParams.toString());

    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    // Reset to page 1 when sort changes
    params.set("page", "1");

    router.push(`/proprietes?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentSort || undefined} onValueChange={handleSortChange}>
        <SelectTrigger
          className="w-[180px] bg-white dark:bg-background font-nunito-sans"
          aria-label="Sort properties"
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {PROPERTY_SORT_OPTIONS.map((value) => (
            <SelectItem key={value} value={value}>
              {getSortLabel(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PropertySortSelect;
