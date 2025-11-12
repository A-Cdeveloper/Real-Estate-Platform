"use client";

/**
 * ProprietesWrapper component wrapper for the property filters and sort select
 * @param initialParams - initial parameters from URL
 * @param className - optional className for the wrapper
 * @returns ProprietesWrapper component
 */

import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { cn } from "@/lib/utils";
import PropertySortSelect from "./PropertySortSelect";

const ProprietesWrapper = ({
  initialParams,
  className,
}: {
  initialParams: { [key: string]: string | undefined };
  className?: string;
}) => {
  // Show filters if there are more than 1 initial params (page is not included)
  const showFilters = Object.keys(initialParams).length > 1;
  const [isOpen, setIsOpen] = useState(showFilters);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
          className="font-semibold !bg-transparent"
          aria-label={isOpen ? "Hide filters" : "Show filters"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <>
              <X className="size-5" aria-hidden="true" />
              Hide Filters
            </>
          ) : (
            <>
              <FilterIcon className="size-5" aria-hidden="true" />
              Show Filters
            </>
          )}
        </Button>
        {/* Sort Select */}
        <PropertySortSelect />
      </div>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="rounded-2xl border border-border bg-secondary p-6 backdrop-blur-sm">
          <PropertyTypeFilter
            initialParams={initialParams}
            clearRoute="/proprietes"
          />
        </div>
      </Activity>
    </div>
  );
};

export default ProprietesWrapper;
