"use client";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import { Spinner } from "@/components/shared/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreatePropertyFormData,
  UpdatePropertyFormData,
} from "@/server/schemas/property";
import { PropertyActionState, PropertyWithOwner } from "@/types/properties";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useReducer } from "react";

// Dynamic imports to avoid SSR issues with Leaflet maps
const LocationMap = dynamic(
  () => import("@/components/shared/map/LocationMap"),
  { ssr: false }
);

const AddMapClickHandler = dynamic(() => import("../map/AddMapClickHandler"), {
  ssr: false,
});

/**
 * Location state structure
 * Manages the property location data and loading state
 */
type LocationState = {
  lat: number | null; // Latitude coordinate
  lng: number | null; // Longitude coordinate
  address: string | null; // Human-readable address from reverse geocoding
  loadingAddress: boolean; // Loading state while fetching address
  property: PropertyWithOwner;
};

/**
 * Location reducer actions
 * Defines all possible state mutations
 */
type LocationAction =
  | {
      type: "SET_LOCATION";
      payload: {
        lat: number;
        lng: number;
        address: string;
      };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "REMOVE_LOCATION" };

/**
 * Location reducer function
 * Centralized state management for location data
 * Uses atomic updates to prevent race conditions
 *
 * @param state - Current location state
 * @param action - Action to perform on the state
 * @returns New location state
 */
const locationReducer = (
  state: LocationState,
  action: LocationAction
): LocationState => {
  switch (action.type) {
    case "SET_LOCATION":
      // Update location coordinates and address atomically
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
      };
    case "SET_LOADING":
      // Update loading state (used during reverse geocoding)
      return {
        ...state,
        loadingAddress: action.payload,
      };
    case "REMOVE_LOCATION":
      // Reset all location data to initial state
      return {
        lat: null,
        lng: null,
        address: null,
        loadingAddress: false,
        property: state.property,
      };
    default:
      return state;
  }
};

/**
 * Initial state for location reducer
 */
const initialState = (property: PropertyWithOwner): LocationState => ({
  lat: null,
  lng: null,
  address: null,
  loadingAddress: false,
  property,
});

/**
 * LocationCard Component
 *
 * Displays an interactive map for selecting property location.
 * Manages location state using useReducer for atomic updates and better performance.
 * Uses useCallback to memoize handlers and prevent unnecessary re-renders.
 *
 * Features:
 * - Interactive map with click-to-select location
 * - Reverse geocoding to get address from coordinates
 * - Loading state during address fetch
 * - Remove location functionality
 * - Form validation error display
 *
 * @param state - Server action state containing validation errors
 */
const LocationCard = ({
  state,
  property,
}: {
  state: PropertyActionState<
    CreatePropertyFormData | UpdatePropertyFormData
  > | null;
  property: PropertyWithOwner;
}) => {
  // Use reducer instead of multiple useState hooks for atomic updates
  const [locationState, dispatch] = useReducer(
    locationReducer,
    initialState(property)
  );

  /**
   * Handles location change from map click
   * Called by AddMapClickHandler after reverse geocoding completes
   * Memoized with useCallback to prevent unnecessary re-renders
   */
  const handleLocationChange = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      dispatch({ type: "SET_LOCATION", payload: location });
    },
    []
  );

  /**
   * Handles loading state changes during reverse geocoding
   * Called by AddMapClickHandler when fetching starts/completes
   * Memoized with useCallback to prevent unnecessary re-renders
   */
  const handleLoadingChange = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  /**
   * Removes the selected location
   * Resets all location data to initial state
   * Memoized with useCallback to prevent unnecessary re-renders
   */
  const removeLocation = useCallback(() => {
    dispatch({ type: "REMOVE_LOCATION" });
  }, []);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-orange-500/10">
            <MapPin className="size-4 text-orange-600 dark:text-orange-400" />
          </div>
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hidden form inputs for server-side form submission */}
        <input
          type="hidden"
          name="lat"
          value={locationState.lat ?? property.lat ?? ""}
        />
        <input
          type="hidden"
          name="lng"
          value={locationState.lng ?? property.lng ?? ""}
        />
        <input
          type="hidden"
          name="address"
          value={locationState.address ?? property.address ?? ""}
        />

        {/* Interactive map with click handler and loading state */}
        <Suspense fallback={<Spinner className="size-4" />}>
          <LocationMap
            lat={locationState.lat ?? property.lat ?? null}
            lng={locationState.lng ?? property.lng ?? null}
            address={locationState.address ?? property.address ?? null}
            loadingAddress={locationState.loadingAddress}
            clickHandler={
              <AddMapClickHandler
                onLocationChange={handleLocationChange}
                onLoadingChange={handleLoadingChange}
              />
            }
            removeHandler={removeLocation}
          />
        </Suspense>

        {/* Display validation errors from server action */}
        <ErrorFormMessages state={state} fieldName="lat" fieldId="lat" />
        <ErrorFormMessages state={state} fieldName="lng" fieldId="lng" />
        <ErrorFormMessages
          state={state}
          fieldName="address"
          fieldId="address"
        />
      </CardContent>
    </Card>
  );
};

export default LocationCard;
