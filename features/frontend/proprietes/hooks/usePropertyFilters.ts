"use client";

import { PropertyType } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useReducer, useState } from "react";
import { propertyFiltersSchema } from "@/server/schemas/propertyFilters";
import type { PropertyFilters } from "@/types/properties";

type FilterState = {
  location: string;
  type: PropertyType | undefined;
  minPrice: string;
  maxPrice: string;
};

type FilterAction =
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_TYPE"; payload: PropertyType | undefined }
  | { type: "SET_MIN_PRICE"; payload: string }
  | { type: "SET_MAX_PRICE"; payload: string }
  | { type: "CLEAR_ALL" };

const initialState: FilterState = {
  location: "",
  type: undefined,
  minPrice: "",
  maxPrice: "",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
}

export const usePropertyFilters = (
  initialParams?: {
    [key: string]: string | undefined;
  },
  clearRoute?: string
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params if provided
  const getInitialState = (): FilterState => {
    if (!initialParams) return initialState;
    return {
      location: initialParams.location || "",
      type: (initialParams.type as PropertyType | undefined) || undefined,
      minPrice: initialParams.minPrice || "",
      maxPrice: initialParams.maxPrice || "",
    };
  };

  const [state, dispatch] = useReducer(filterReducer, getInitialState());
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare data for validation
    const trimmedLocation = state.location.trim();
    const trimmedMinPrice = state.minPrice.trim();
    const trimmedMaxPrice = state.maxPrice.trim();

    const formData: PropertyFilters = {
      ...(state.type && { type: state.type }),
      ...(trimmedLocation && { location: trimmedLocation }),
      ...(trimmedMinPrice && { minPrice: trimmedMinPrice }),
      ...(trimmedMaxPrice && { maxPrice: trimmedMaxPrice }),
    };

    // Validate with Zod
    const result = propertyFiltersSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(issue.message);
      });
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Build URL params dynamically, preserving existing params like sort
    const params = new URLSearchParams(searchParams.toString());

    // Update filter params
    Object.entries(result.data).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");
    const queryString = params.toString();
    router.push(`/proprietes?${queryString}`);
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR_ALL" });
    setErrors({});

    // Preserve sort parameter when clearing filters
    const params = new URLSearchParams();
    const currentSort = searchParams.get("sort");
    if (currentSort) {
      params.set("sort", currentSort);
    }

    const route = clearRoute || "/proprietes";
    const queryString = params.toString();
    router.push(`${route}${queryString ? `?${queryString}` : ""}`);
  };

  const hasActiveFilters = Boolean(
    state.location.trim() ||
      state.type ||
      state.minPrice.trim() ||
      state.maxPrice.trim()
  );

  return {
    location: state.location,
    setLocation: (value: string) => {
      dispatch({ type: "SET_LOCATION", payload: value });
    },
    type: state.type,
    setType: (value: PropertyType | undefined) => {
      dispatch({ type: "SET_TYPE", payload: value });
    },
    minPrice: state.minPrice,
    setMinPrice: (value: string) => {
      dispatch({ type: "SET_MIN_PRICE", payload: value });
    },
    maxPrice: state.maxPrice,
    setMaxPrice: (value: string) => {
      dispatch({ type: "SET_MAX_PRICE", payload: value });
    },
    handleFilter,
    handleClear,
    errors,
    hasActiveFilters,
  };
};
