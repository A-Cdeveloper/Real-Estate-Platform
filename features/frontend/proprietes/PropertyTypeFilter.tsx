"use client";

import React from "react";
import CustomInput from "@/components/shared/CustomInput";
import { PropertyType } from "@prisma/client";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { usePropertyFilters } from "./hooks/usePropertyFilters";
import { cn } from "@/lib/utils";

type FilterErrorMessageProps = {
  message: string;
};

const FilterErrorMessage = ({ message }: FilterErrorMessageProps) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-md bg-destructive/40 p-2 px-6"
    >
      <p className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-foreground">
        {message}
      </p>
    </div>
  );
};

type PropertyTypeFilterProps = {
  initialParams?: { [key: string]: string | undefined };
  className?: string;
  clearRoute?: string;
};

const PropertyTypeFilter = ({
  initialParams,
  className,
  clearRoute,
}: PropertyTypeFilterProps) => {
  const {
    location,
    setLocation,
    type,
    setType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleFilter,
    handleClear,
    errors,
    hasActiveFilters,
  } = usePropertyFilters(initialParams, clearRoute);

  return (
    <form onSubmit={handleFilter} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Input */}
        <CustomInput
          id="location-input"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Search by location"
          className={cn(
            "w-full bg-white dark:bg-background",
            location.trim() && "border-primary"
          )}
        />

        {/* Property Type Select */}
        <Select
          value={type || undefined}
          onValueChange={(value) => setType(value as PropertyType)}
          key={type || "empty"}
        >
          <SelectTrigger
            id="property-type-select"
            className={cn(
              "w-full bg-white dark:bg-background",
              type && "border-primary"
            )}
            aria-label="Select property type"
          >
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        {/* Min Price Input */}
        <CustomInput
          id="min-price-input"
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="Minimum price"
          min="0"
          step="1000"
          className={cn(
            "w-full bg-white dark:bg-background",
            minPrice.trim() && "border-primary"
          )}
        />

        {/* Max Price Input */}
        <CustomInput
          id="max-price-input"
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Maximum price"
          min="0"
          step="1000"
          className={cn(
            "w-full bg-white dark:bg-background",
            maxPrice.trim() && "border-primary"
          )}
        />
      </div>

      {/* General Error Message */}
      {errors.maxPrice && <FilterErrorMessage message={errors.maxPrice[0]} />}

      {/* Search Button */}
      <div className="flex gap-4 justify-end">
        {hasActiveFilters && (
          <Button
            type="button"
            size="lg"
            onClick={handleClear}
            className="font-nunito-sans font-semibold bg-secondary hover:bg-secondary/70 dark:text-foreground"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            Clear Filters
          </Button>
        )}
        <Button
          type="submit"
          size="lg"
          className="font-nunito-sans font-semibold"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          Search Property
        </Button>
      </div>
    </form>
  );
};

export default PropertyTypeFilter;
