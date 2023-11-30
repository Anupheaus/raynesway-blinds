import { Icon as IconComponent } from '@anupheaus/react-ui';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export const Icon = IconComponent.augmentWith({
  'twitter': FiTwitter,
  'instagram': FiInstagram,
  'facebook': FiFacebook,
});
