import React from 'react';

export interface RouteConfig {
  id: string;
  path: string; // Relative path
  title: string;
  icon?: React.ElementType;
  component: React.FC<any>;
  disabled?: boolean;
  children?: RouteConfig[];
}
