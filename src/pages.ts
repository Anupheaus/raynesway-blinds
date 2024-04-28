import { FunctionComponent, ReactNode } from 'react';
import { Blinds } from './blinds';
import { Shutters } from './shutters';
import { Awnings } from './awnings';
import { About } from './about';
import { Referrals } from './referrals';
import { Home } from './home';
import { Reviews } from './reviews';
import { BookAppointment } from './book-appointment';

export interface PageConfig {
  label: ReactNode;
  path: string;
  isDefault?: boolean;
  component: FunctionComponent<{ isActive: boolean; }>;
  isVisibleInMenu?: boolean;
}

export const pages: PageConfig[] = [
  { label: 'Home', path: '/', isDefault: true, component: Home },
  { label: 'Blinds', path: '/blinds', component: Blinds },
  { label: 'Shutters', path: '/shutters', component: Shutters },
  { label: 'Awnings', path: '/awnings', component: Awnings },
  { label: 'Referrals', path: '/referrals', component: Referrals },
  { label: 'About', path: '/about', component: About },
  { label: 'Reviews', path: '/reviews', component: Reviews, isVisibleInMenu: false },
  { label: 'Book Appointment', path: '/book-appointment', component: BookAppointment, isVisibleInMenu: false }
];
