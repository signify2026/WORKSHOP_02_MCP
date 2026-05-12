import React from 'react';
import { Tag } from '@epam/uui';
import { TabData } from '../../utils/dataUtils';
import css from './ClassFilterTabs.module.scss';

export interface ClassFilterTabsProps {
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const ClassFilterTabs: React.FC<ClassFilterTabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className
}) => {
  const handleTabClick = (tabId: string) => {
    if (tabId !== activeTabId) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={`${css.tabsContainer} ${className || ''}`} role="tablist">
      {tabs.map((tab) => (
        <Tag
          key={tab.id}
          caption={tab.label}
          count={tab.count}
          onClick={() => handleTabClick(tab.id)}
          color= {tab.isActive ? "info" : "neutral"}
          size="36"
          fill={tab.isActive ? "solid" : "outline"}
          cx={css.filterTab}
          rawProps={{
            role: "tab",
            "aria-selected": tab.isActive,
            "aria-controls": `panel-${tab.id}`,
          }}
        />
      ))}
    </div>
  );
};
