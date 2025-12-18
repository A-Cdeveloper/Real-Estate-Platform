"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabOption = {
  value: string;
  label: string;
};

type TabsButtonsProps<T extends string> = {
  tabs: readonly TabOption[];
  activeTab: T;
  onTabChange: (tab: T) => void;
};

/**
 * Generic tabs buttons component
 * Can be used with any set of tabs
 */
const TabsButtons = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabsButtonsProps<T>) => {
  return (
    <div
      className="flex items-center gap-2"
      role="tablist"
      aria-label="Chart type tabs"
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.value}
          active={activeTab === tab.value}
          onClick={() => onTabChange(tab.value as T)}
          ariaLabel={`Show ${tab.label} chart`}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
};

/**
 * Button component for individual tab with active state
 */
const TabButton = ({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) => {
  return (
    <Button
      size="sm"
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-label={ariaLabel}
      className={cn(
        "border border-border text-muted-foreground bg-secondary/40 hover:bg-secondary",
        active && "bg-secondary text-foreground"
      )}
    >
      {children}
    </Button>
  );
};

export default TabsButtons;
