"use client";

import { Responsive, useContainerWidth } from "react-grid-layout";
import { useMemo } from "react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  addMaxWToLayouts,
  DEFAULT_LAYOUTS,
  MIN_WIDTHS,
  MAX_WIDTHS,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from "./grid-stats/config/dashboard-layouts";
import { useGridLayoutStorage } from "./hooks/useGridLayoutStorage";
import { getDashboardGridItems } from "./grid-stats/shared/DashboardGridItems";
import { Property } from "@prisma/client";

const STORAGE_KEY = "dashboard-grid-layout";

type GridWrapperProps = {
  inReviewProperties: Property[];
  // Add more props as needed for other grid cards
};

const GridWrapper = ({ inReviewProperties }: GridWrapperProps) => {
  const { width, containerRef, mounted } = useContainerWidth();

  // Use hook for localStorage persistence
  const [layouts, setLayouts] = useGridLayoutStorage(
    STORAGE_KEY,
    DEFAULT_LAYOUTS,
    addMaxWToLayouts
  );

  const children = useMemo(
    () => getDashboardGridItems({ inReviewProperties }),
    [inReviewProperties]
  );

  return (
    <div ref={containerRef} className="w-full">
      {mounted && width > 0 && (
        <Responsive
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
          rowHeight={100}
          width={width}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          onLayoutChange={(layout, layouts) => {
            if (layouts) {
              // Ensure all breakpoints exist and are arrays, merge with defaults if missing
              const completeLayouts = {
                lg: Array.isArray(layouts.lg) ? layouts.lg : DEFAULT_LAYOUTS.lg,
                md: Array.isArray(layouts.md) ? layouts.md : DEFAULT_LAYOUTS.md,
                sm: Array.isArray(layouts.sm) ? layouts.sm : DEFAULT_LAYOUTS.sm,
                xs: Array.isArray(layouts.xs) ? layouts.xs : DEFAULT_LAYOUTS.xs,
                xxs: Array.isArray(layouts.xxs)
                  ? layouts.xxs
                  : DEFAULT_LAYOUTS.xxs,
              };

              // Apply minW, maxW, minH and maxH constraints by limiting w (width) and h (height) for each breakpoint
              const constrainedLayouts = {
                lg: completeLayouts.lg.map((item) => ({
                  ...item,
                  w: Math.max(MIN_WIDTHS.lg, Math.min(item.w, MAX_WIDTHS.lg)),
                  h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
                })),
                md: completeLayouts.md.map((item) => ({
                  ...item,
                  w: Math.max(MIN_WIDTHS.md, Math.min(item.w, MAX_WIDTHS.md)),
                  h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
                })),
                sm: completeLayouts.sm.map((item) => ({
                  ...item,
                  w: Math.max(MIN_WIDTHS.sm, Math.min(item.w, MAX_WIDTHS.sm)),
                  h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
                })),
                xs: completeLayouts.xs.map((item) => ({
                  ...item,
                  w: Math.max(MIN_WIDTHS.xs, Math.min(item.w, MAX_WIDTHS.xs)),
                  h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
                })),
                xxs: completeLayouts.xxs.map((item) => ({
                  ...item,
                  w: Math.max(MIN_WIDTHS.xxs, Math.min(item.w, MAX_WIDTHS.xxs)),
                  h: Math.max(MIN_HEIGHT, Math.min(item.h, MAX_HEIGHT)),
                })),
              };

              // Ensure minW, maxW, minH and resizeHandles are preserved on all items
              const layoutsWithConstraints =
                addMaxWToLayouts(constrainedLayouts);
              setLayouts(layoutsWithConstraints);
            }
          }}
        >
          {children}
        </Responsive>
      )}
    </div>
  );
};

export default GridWrapper;
