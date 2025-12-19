"use client";

import React from "react";
import { Activity } from "react";

type TabContentItem<T extends string> = {
  value: T;
  content: React.ReactNode;
};

type TabsContentProps<T extends string> = {
  activeTab: T;
  tabs: TabContentItem<T>[];
};

/**
 * Generic tabs content component
 * Renders content based on active tab using Activity component to prevent re-renders
 */
const TabsContent = <T extends string>({
  activeTab,
  tabs,
}: TabsContentProps<T>) => {
  return (
    <div role="tabpanel" aria-live="polite">
      {tabs.map((tab) => (
        <Activity
          key={tab.value}
          mode={activeTab === tab.value ? "visible" : "hidden"}
          aria-hidden={activeTab !== tab.value}
        >
          {tab.content}
        </Activity>
      ))}
    </div>
  );
};

export default TabsContent;
