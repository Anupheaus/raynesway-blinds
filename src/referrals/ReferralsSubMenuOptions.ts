import { PageConfig } from '../pages';
import { Affiliates } from './Affiliates';
import { Recommendations } from './Recommendations';

export const referralsSubMenuOptions: PageConfig[] = [
  { label: 'Recommendations Scheme', path: '/referrals/recommendations', component: Recommendations },
  { label: 'Commercial Affiliate Scheme', path: '/referrals/affiliates', component: Affiliates },
];