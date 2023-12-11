import { Flex, createComponent, createStyles, useBound, useStorage } from '@anupheaus/react-ui';
import { Typography } from '../typography';
import { Icon } from '../icon';
import { useEffect, useState } from 'react';

const useStyles = createStyles({
  cookieConsent: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 50,
    backgroundColor: 'rgba(0 0 0 / 70%)',
    color: 'white',
    padding: '2px 20px',
    zIndex: 1000,
    boxShadow: '0 -1px 3px rgba(0 0 0 / 30%), 0 -6px 12px rgba(0 0 0 / 24%)',
    transform: 'translateY(0px)',
    transition: 'transform 1s ease-in-out',
  },
  hide: {
    transform: 'translateY(100px)',
  },
  text: {
    fontSize: 'max(1vw, 14px)',
  },

});

export const CookieConsent = createComponent('CookieConsent', () => {
  const { css, join } = useStyles();
  const { state: hideConsent, setState: setHideConsent } = useStorage('hide-cookie-consent', { type: 'local', defaultValue: () => false });
  const [showConsent, setShowConsent] = useState(false);

  const closeConsent = useBound(() => {
    setHideConsent(true);
  });

  useEffect(() => {
    setShowConsent(true);
  }, []);

  const isShowingConsent = showConsent && !hideConsent;

  return (
    <Flex tagName="cookie-consent" className={join(css.cookieConsent, !isShowingConsent && css.hide)} valign="center" gap={8}>
      <Typography type="cookie-consent" fullWidth className={css.text}>
        By continuing to use this site, you are agreeing to the use of cookies, whose purpose
        it is to provide web analytics and measurements of visitor traffic and browsing behaviour.
      </Typography>
      <Icon name="close" color="white" onClick={closeConsent} />
    </Flex>
  );
});