// src/components/tabs/TabPane.tsx
import React from 'react';

export interface TabProps {
  title: string;
  hidden?: boolean;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children, hidden }) => {
  return <div hidden={hidden}>{children}</div>;
};
