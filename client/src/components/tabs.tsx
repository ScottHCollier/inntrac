// src/components/tabs/Tabs.tsx
import React, { useState, Children, cloneElement, ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { TabProps } from './tab';

interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabHeaders = Children.map(children, (child, index) => ({
    title: child.props.title,
    index,
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div>
        <div
          className={cn(
            'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'
          )}
        >
          {tabHeaders.map((tab) => (
            <div
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                selectedTab === tab.index
                  ? 'bg-background text-foreground shadow cursor-default pointer-events-none'
                  : ''
              )}
              key={tab.index}
              onClick={() => setSelectedTab(tab.index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        {Children.map(children, (child, index) =>
          cloneElement(child, { hidden: selectedTab !== index })
        )}
      </div>
    </div>
  );
};

export default Tabs;
