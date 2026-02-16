import { InjectionToken } from '@angular/core';

export interface DrawerConfig {
  position: 'left' | 'right';
}

export const DRAWER_CONFIG = new InjectionToken<DrawerConfig>('DRAWER_CONFIG');
