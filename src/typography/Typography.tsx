import { Typography as TypographyComponent } from '@anupheaus/react-ui';
import { theme } from '../theme';

export const Typography = TypographyComponent.augmentWith({
  'website-title': {
    size: 21,
    name: 'EB Garamond',
    weight: 500,
    spacing: 14,
    shadow: '0px 4px 5px rgba(0 0 0 / 40%)',
  },
  'website-title-telephone-number': {
    size: 21,
    spacing: 6,
    weight: 500,
    color: theme.text.secondary,
    shadow: '0px 1px 3px rgba(0 0 0 / 30%)',
  },
  'website-title-menu-item': {
    size: 18,
    name: 'EB Garamond',
    weight: 500,
    spacing: 6,
    transform: 'uppercase',
    shadow: '0px 1px 3px rgba(0 0 0 / 30%)',
  },
  'heading': {
    size: 22,
    shadow: '0px 1px 3px rgba(0 0 0 / 30%)',
  },
  'paragraph': {
    size: 18,
    shadow: '0px 1px 3px rgba(0 0 0 / 30%)',
  },
  'title': {
    size: 34,
    shadow: '0px 1px 3px rgba(0 0 0 / 30%)',
  },
});
