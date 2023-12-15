import { FunctionComponent, ReactNode } from 'react';
import { Blinds } from './blinds';
import { Shutters } from './shutters';
import { Awnings } from './awnings';
import { About } from './about';
import { Referrals } from './referrals';
import { Home } from './home';

export interface PageConfig {
  label: ReactNode;
  path: string;
  isDefault?: boolean;
  component: FunctionComponent<{ isActive: boolean; }>;
}

export const pages: PageConfig[] = [
  { label: 'Home', path: '/', isDefault: true, component: Home },
  { label: 'Blinds', path: '/blinds', component: Blinds },
  { label: 'Shutters', path: '/shutters', component: Shutters },
  { label: 'Awnings', path: '/awnings', component: Awnings },
  { label: 'Referrals', path: '/referrals', component: Referrals },
  { label: 'About', path: '/about', component: About },
];
