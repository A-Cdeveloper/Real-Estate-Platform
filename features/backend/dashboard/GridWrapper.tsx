"use client";

import { Responsive, useContainerWidth } from "react-grid-layout";
import { useMemo, useState } from "react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Simple card component
const Card = ({ number }: { number: number }) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm h-full">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-sm font-medium">Card {number}</h2>
      <span className="text-xs text-muted-foreground">Drag & resize me</span>
    </div>
    <div className="rounded-md border border-dashed border-border/60 p-2 text-xs text-muted-foreground">
      Content placeholder for card {number}
    </div>
  </div>
);

const GridWrapper = () => {
  const { width, containerRef, mounted } = useContainerWidth();

  const [layouts, setLayouts] = useState({
    lg: [
      { i: "1", x: 0, y: 0, w: 6, h: 2 },
      { i: "2", x: 6, y: 0, w: 6, h: 2 },
      { i: "3", x: 0, y: 2, w: 6, h: 2 },
      { i: "4", x: 6, y: 2, w: 6, h: 2 },
      { i: "5", x: 0, y: 4, w: 6, h: 2 },
      { i: "6", x: 6, y: 4, w: 6, h: 2 },
    ],
    md: [
      { i: "1", x: 0, y: 0, w: 5, h: 2 },
      { i: "2", x: 5, y: 0, w: 5, h: 2 },
      { i: "3", x: 0, y: 2, w: 5, h: 2 },
      { i: "4", x: 5, y: 2, w: 5, h: 2 },
      { i: "5", x: 0, y: 4, w: 5, h: 2 },
      { i: "6", x: 5, y: 4, w: 5, h: 2 },
    ],
    sm: [
      { i: "1", x: 0, y: 0, w: 3, h: 2 },
      { i: "2", x: 3, y: 0, w: 3, h: 2 },
      { i: "3", x: 0, y: 2, w: 3, h: 2 },
      { i: "4", x: 3, y: 2, w: 3, h: 2 },
      { i: "5", x: 0, y: 4, w: 3, h: 2 },
      { i: "6", x: 3, y: 4, w: 3, h: 2 },
    ],
    xs: [
      { i: "1", x: 0, y: 0, w: 2, h: 2 },
      { i: "2", x: 2, y: 0, w: 2, h: 2 },
      { i: "3", x: 0, y: 2, w: 2, h: 2 },
      { i: "4", x: 2, y: 2, w: 2, h: 2 },
      { i: "5", x: 0, y: 4, w: 2, h: 2 },
      { i: "6", x: 2, y: 4, w: 2, h: 2 },
    ],
    xxs: [
      { i: "1", x: 0, y: 0, w: 1, h: 2 },
      { i: "2", x: 1, y: 0, w: 1, h: 2 },
      { i: "3", x: 0, y: 2, w: 1, h: 2 },
      { i: "4", x: 1, y: 2, w: 1, h: 2 },
      { i: "5", x: 0, y: 4, w: 1, h: 2 },
      { i: "6", x: 1, y: 4, w: 1, h: 2 },
    ],
  });

  const children = useMemo(
    () => [
      <div key="1">
        <Card number={1} />
      </div>,
      <div key="2">
        <Card number={2} />
      </div>,
      <div key="3">
        <Card number={3} />
      </div>,
      <div key="4">
        <Card number={4} />
      </div>,
      <div key="5">
        <Card number={5} />
      </div>,
      <div key="6">
        <Card number={6} />
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
              setLayouts((prev) => ({ ...prev, ...layouts }));
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
