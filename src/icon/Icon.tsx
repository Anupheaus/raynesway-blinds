import { Icon as IconComponent, createComponent, createStyles } from '@anupheaus/react-ui';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhoneCall, FiTwitter, FiX } from 'react-icons/fi';
import { ReactSVG } from 'react-svg';
import { theme } from '../theme';
import { useMemo } from 'react';

const useStyles = createStyles({
  svgIcon: {
    display: 'inline-flex',
    padding: 0,
    margin: 0,
    '&>div': {
      display: 'inline-flex',
      padding: 0,
      margin: 0,
    },
  },
});

interface Props {
  src: string;
  color?: string;
}

const SVGIcon = createComponent('SVGIcon', ({
  src,
  color,
}: Props) => {
  const { css } = useStyles();
  const style = useMemo(() => ({
    color: color ?? theme.text.secondary
  }), [color]);

  return (
    <ReactSVG src={src} style={style} className={css.svgIcon} />
  );
});

export const Icon = IconComponent.augmentWith({
  'twitter': FiTwitter,
  'instagram': FiInstagram,
  'facebook': FiFacebook,
  'nextdoor': props => <SVGIcon {...props} src="/images/nextdoor.svg" />,
  'address': FiMapPin,
  'email': FiMail,
  'telephone': FiPhoneCall,
  'close': FiX,
});
