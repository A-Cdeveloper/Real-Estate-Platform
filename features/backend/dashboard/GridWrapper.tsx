"use client";

import { Responsive, useContainerWidth } from "react-grid-layout";
import { useMemo } from "react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  addMaxWToLayouts,
  DEFAULT_LAYOUTS,
} from "./grid-stats/dashboard-layouts";
import { useGridLayoutStorage } from "./hooks/useGridLayoutStorage";
import GridCard from "./grid-stats/GridCard";

const STORAGE_KEY = "dashboard-grid-layout";

const GridWrapper = () => {
  const { width, containerRef, mounted } = useContainerWidth();

  // Use hook for localStorage persistence
  const [layouts, setLayouts] = useGridLayoutStorage(
    STORAGE_KEY,
    DEFAULT_LAYOUTS,
    addMaxWToLayouts
  );

  const children = useMemo(
    () => [
      <div key="1">
        <GridCard number={1} />
      </div>,
      <div key="2">
        <GridCard number={2} />
      </div>,
      <div key="3">
        <GridCard number={3} />
      </div>,
      <div key="4">
        <GridCard number={4} />
      </div>,
      <div key="5">
        <GridCard number={5} />
      </div>,
      <div key="6">
        <GridCard number={6} />
      </div>,
    ],
    []
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
              // Ensure maxW is preserved on all items
              const layoutsWithMaxW = addMaxWToLayouts(completeLayouts);
              setLayouts(layoutsWithMaxW);
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
