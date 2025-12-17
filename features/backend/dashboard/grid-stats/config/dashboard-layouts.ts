import { Layout, LayoutItem } from "react-grid-layout";

// Resize handles for all sides and corners
export const RESIZE_HANDLES: Array<
  "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne"
> = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

// Min height constraint
export const MIN_HEIGHT = 3; // minimum 3 rows

// Max height constraint
export const MAX_HEIGHT = 5; // maximum 5 rows

// Min width constraints per breakpoint
export const MIN_WIDTHS = {
  lg: 3, // minimum 3 columns
  md: 3, // minimum 3 columns
  sm: 3, // minimum 3 columns
  xs: 2, // minimum 2 columns
  xxs: 1, // minimum 1 column (full width)
};

// Max width constraints per breakpoint (using maxW prop)
export const MAX_WIDTHS = {
  lg: 6, // 1/2 of 12 columns
  md: 5, // 1/2 of 10 columns
  sm: 6, // full width (all 6 columns)
  xs: 4, // full width (all 4 columns)
  xxs: 1, // full width (all 1 column)
};

// Default layouts for 4 cards
export const DEFAULT_LAYOUTS = {
  lg: [
    {
      i: "properties-in-review",
      x: 0,
      y: 0,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.lg,
      minW: MIN_WIDTHS.lg,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "latest-new-properties",
      x: 6,
      y: 0,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.lg,
      minW: MIN_WIDTHS.lg,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "properties-stats",
      x: 0,
      y: 3,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.lg,
      minW: MIN_WIDTHS.lg,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "users-online-stats",
      x: 6,
      y: 3,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.lg,
      minW: MIN_WIDTHS.lg,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
  ],
  md: [
    {
      i: "properties-in-review",
      x: 0,
      y: 0,
      w: 5,
      h: 3,
      maxW: MAX_WIDTHS.md,
      minW: MIN_WIDTHS.md,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "latest-new-properties",
      x: 5,
      y: 0,
      w: 5,
      h: 3,
      maxW: MAX_WIDTHS.md,
      minW: MIN_WIDTHS.md,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "properties-stats",
      x: 0,
      y: 3,
      w: 5,
      h: 3,
      maxW: MAX_WIDTHS.md,
      minW: MIN_WIDTHS.md,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "users-online-stats",
      x: 5,
      y: 3,
      w: 5,
      h: 3,
      maxW: MAX_WIDTHS.md,
      minW: MIN_WIDTHS.md,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
  ],
  sm: [
    {
      i: "properties-in-review",
      x: 0,
      y: 0,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.sm,
      minW: MIN_WIDTHS.sm,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "latest-new-properties",
      x: 0,
      y: 3,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.sm,
      minW: MIN_WIDTHS.sm,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "properties-stats",
      x: 0,
      y: 6,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.sm,
      minW: MIN_WIDTHS.sm,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "users-online-stats",
      x: 0,
      y: 9,
      w: 6,
      h: 3,
      maxW: MAX_WIDTHS.sm,
      minW: MIN_WIDTHS.sm,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
  ],
  xs: [
    {
      i: "properties-in-review",
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      maxW: MAX_WIDTHS.xs,
      minW: MIN_WIDTHS.xs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "latest-new-properties",
      x: 0,
      y: 3,
      w: 4,
      h: 3,
      maxW: MAX_WIDTHS.xs,
      minW: MIN_WIDTHS.xs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "properties-stats",
      x: 0,
      y: 6,
      w: 4,
      h: 3,
      maxW: MAX_WIDTHS.xs,
      minW: MIN_WIDTHS.xs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "users-online-stats",
      x: 0,
      y: 9,
      w: 4,
      h: 3,
      maxW: MAX_WIDTHS.xs,
      minW: MIN_WIDTHS.xs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
  ],
  xxs: [
    {
      i: "properties-in-review",
      x: 0,
      y: 0,
      w: 1,
      h: 3,
      maxW: MAX_WIDTHS.xxs,
      minW: MIN_WIDTHS.xxs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "latest-new-properties",
      x: 0,
      y: 3,
      w: 1,
      h: 3,
      maxW: MAX_WIDTHS.xxs,
      minW: MIN_WIDTHS.xxs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "properties-stats",
      x: 0,
      y: 6,
      w: 1,
      h: 3,
      maxW: MAX_WIDTHS.xxs,
      minW: MIN_WIDTHS.xxs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
    {
      i: "users-online-stats",
      x: 0,
      y: 9,
      w: 1,
      h: 3,
      maxW: MAX_WIDTHS.xxs,
      minW: MIN_WIDTHS.xxs,
      resizeHandles: RESIZE_HANDLES,
      minH: MIN_HEIGHT,
      maxH: MAX_HEIGHT,
    },
  ],
};

// Helper function to add minW, maxW, minH and resizeHandles to layout items
export const addMaxWToLayouts = (
  layouts: Partial<Record<string, LayoutItem[]>>
): Partial<Record<string, LayoutItem[]>> => {
  const newLayouts: Partial<Record<string, LayoutItem[]>> = {};
  for (const breakpoint in layouts) {
    if (Object.prototype.hasOwnProperty.call(layouts, breakpoint)) {
      const items = layouts[breakpoint as keyof typeof layouts];
      if (Array.isArray(items)) {
        newLayouts[breakpoint] = items.map((item) => ({
          ...item,
          minW: MIN_WIDTHS[breakpoint as keyof typeof MIN_WIDTHS] || item.w,
          maxW: MAX_WIDTHS[breakpoint as keyof typeof MAX_WIDTHS] || item.w,
          minH: MIN_HEIGHT,
          maxH: MAX_HEIGHT,
          resizeHandles: [...RESIZE_HANDLES],
        }));
      }
    }
  }
  return newLayouts;
};

/**
 * Applies layout constraints to layouts from react-grid-layout
 * - Ensures all breakpoints exist (fills with defaults if missing)
 * - Applies minW and maxW width constraints
 * - Adds minW, maxW, minH and resizeHandles to all items
 */
export const applyLayoutConstraints = (
  layouts: Partial<Record<string, Layout[]>>
): typeof DEFAULT_LAYOUTS => {
  // Ensure all breakpoints exist and are arrays, merge with defaults if missing
  const completeLayouts = {
    lg: Array.isArray(layouts.lg) ? layouts.lg : DEFAULT_LAYOUTS.lg,
    md: Array.isArray(layouts.md) ? layouts.md : DEFAULT_LAYOUTS.md,
    sm: Array.isArray(layouts.sm) ? layouts.sm : DEFAULT_LAYOUTS.sm,
    xs: Array.isArray(layouts.xs) ? layouts.xs : DEFAULT_LAYOUTS.xs,
    xxs: Array.isArray(layouts.xxs) ? layouts.xxs : DEFAULT_LAYOUTS.xxs,
  };

  // Apply minW and maxW constraints by limiting w (width) for each breakpoint
  const constrainedLayouts = {
    lg: completeLayouts.lg.map((item: LayoutItem) => ({
      ...item,
      w: Math.max(MIN_WIDTHS.lg, Math.min(item.w, MAX_WIDTHS.lg)),
      h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
    })),
    md: completeLayouts.md.map((item: LayoutItem) => ({
      ...item,
      w: Math.max(MIN_WIDTHS.md, Math.min(item.w, MAX_WIDTHS.md)),
      h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
    })),
    sm: completeLayouts.sm.map((item: LayoutItem) => ({
      ...item,
      w: Math.max(MIN_WIDTHS.sm, Math.min(item.w, MAX_WIDTHS.sm)),
      h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
    })),
    xs: completeLayouts.xs.map((item: LayoutItem) => ({
      ...item,
      w: Math.max(MIN_WIDTHS.xs, Math.min(item.w, MAX_WIDTHS.xs)),
      h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
    })),
    xxs: completeLayouts.xxs.map((item: LayoutItem) => ({
      ...item,
      w: Math.max(MIN_WIDTHS.xxs, Math.min(item.w, MAX_WIDTHS.xxs)),
      h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
    })),
  };

  // Ensure minW, maxW, minH and resizeHandles are preserved on all items
  return addMaxWToLayouts(constrainedLayouts);
};

