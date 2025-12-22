"use client";

import CustomSelect from "@/components/shared/form/CustomSelect";
import {
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROMOTED_OPTIONS,
} from "@/lib/constants";
import { UserForPropertyFilters } from "@/types/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ProprietesFilters = ({
  isAdmin,
  ownersList,
}: {
  isAdmin: boolean;
  ownersList: UserForPropertyFilters[];
}) => {
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
  const currentOwnerId = searchParams.get("ownerId") || "all";
  return (
    <div className="flex flex-wrap gap-4 items-end order-2 md:order-1">
      {/* Status Filter */}
      <CustomSelect
        id="status-filter"
        value={currentStatus}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("status", value));
        }}
        options={[...PROPERTY_STATUS_OPTIONS]}
        placeholder="Filter by status"
      />

      {/* Type Filter */}
      <CustomSelect
        id="type-filter"
        value={currentType}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("type", value));
        }}
        options={[...PROPERTY_TYPE_OPTIONS]}
        placeholder="Filter by type"
      />

      {/* Promoted Filter */}
      <CustomSelect
        id="promoted-filter"
        value={currentPromoted}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("promoted", value));
        }}
        options={[...PROMOTED_OPTIONS]}
        placeholder="Filter by promotion"
      />
      {/* Owner Filter */}
      {isAdmin && (
        <CustomSelect
          id="owner-filter"
          value={currentOwnerId}
          onValueChange={(value) => {
            router.push(pathname + "?" + createQueryString("ownerId", value));
          }}
          options={[{ id: "all", name: "All Owners" }, ...ownersList].map(
            (owner) => ({
              value: owner.id,
              label: owner.name ?? "",
            })
          )}
          placeholder="Filter by owner"
        />
      )}
    </div>
  );
};

export default ProprietesFilters;
