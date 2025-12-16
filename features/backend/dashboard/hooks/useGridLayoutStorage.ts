import { useState, useEffect } from "react";
import type { LayoutItem } from "react-grid-layout";

// Extended LayoutItem type that includes maxW and resizeHandles
type ExtendedLayoutItem = LayoutItem & {
  maxW?: number;
  resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
};

/**
 * Generic hook for managing grid layouts with localStorage persistence
 * @param storageKey - Key for localStorage
 * @param defaultLayouts - Default layouts to use if nothing is saved
 * @param transformLayouts - Optional function to transform layouts after loading from localStorage
 * @returns Tuple of [layouts, setLayouts]
 */
export function useGridLayoutStorage<
  T extends Partial<Record<string, ExtendedLayoutItem[]>>,
>(storageKey: string, defaultLayouts: T, transformLayouts?: (layouts: T) => T) {
  const [layouts, setLayouts] = useState<T>(() => {
    if (typeof window === "undefined") {
      return defaultLayouts;
    }
    try {
      const savedLayouts = localStorage.getItem(storageKey);
      if (savedLayouts) {
        const parsed = JSON.parse(savedLayouts) as T;
        return transformLayouts ? transformLayouts(parsed) : parsed;
      }
    } catch (error) {
      console.error(
        `Error loading layouts from localStorage (${storageKey}):`,
        error
      );
    }
    return defaultLayouts;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, JSON.stringify(layouts));
      } catch (error) {
        console.error(
          `Error saving layouts to localStorage (${storageKey}):`,
          error
        );
      }
    }
  }, [layouts, storageKey]);

  return [layouts, setLayouts] as const;
}
