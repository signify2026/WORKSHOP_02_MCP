import React from 'react';
import { TabButton } from '@epam/uui';
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
        <TabButton
          key={tab.id}
          caption={tab.label}
          count={tab.count}
          isLinkActive={tab.isActive}
          onClick={() => handleTabClick(tab.id)}
          size="36"
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
