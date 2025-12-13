"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { PropertyStatus, PropertyType } from "@prisma/client";

const ProprietesFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to create query string (prema Next.js dokumentaciji)
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      // Reset page to 1 when filter changes
      params.set("page", "1");
      return params.toString();
    },
    [searchParams]
  );

  // Get current filter values
  const currentStatus = searchParams.get("status") || "all";
  const currentType = searchParams.get("type") || "all";
  const currentPromoted = searchParams.get("promoted") || "all";

  return (
    <div className="flex gap-4 items-end">
      {/* Status Filter */}
      <CustomSelect
        id="status-filter"
        value={currentStatus}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("status", value));
        }}
        options={[
          { value: "all", label: "All Statuses" },
          { value: PropertyStatus.APPROVED, label: "Approved" },
          { value: PropertyStatus.IN_REVIEW, label: "In Review" },
          { value: PropertyStatus.REJECTED, label: "Rejected" },
          { value: PropertyStatus.DELETED, label: "Deleted" },
        ]}
        placeholder="Filter by status"
      />

      {/* Type Filter */}
      <CustomSelect
        id="type-filter"
        value={currentType}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("type", value));
        }}
        options={[
          { value: "all", label: "All Types" },
          { value: PropertyType.Apartment, label: "Apartment" },
          { value: PropertyType.House, label: "House" },
          { value: PropertyType.Commercial, label: "Commercial" },
        ]}
        placeholder="Filter by type"
      />

      {/* Promoted Filter */}
      <CustomSelect
        id="promoted-filter"
        value={currentPromoted}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("promoted", value));
        }}
        options={[
          { value: "all", label: "All" },
          { value: "true", label: "Promoted" },
          { value: "false", label: "Not Promoted" },
        ]}
        placeholder="Filter by promotion"
      />
    </div>
  );
};

export default ProprietesFilters;
