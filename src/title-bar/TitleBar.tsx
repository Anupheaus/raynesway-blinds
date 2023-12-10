import { createComponent, createStyles, Flex, Tooltip, useDelegatedBound } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { Typography } from '../typography';
import Color from 'color';
import { Link } from 'react-router-dom';
import { Icon } from '../icon';

const useStyles = createStyles({
  titleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
    zIndex: 1,
    justifyContent: 'center',

    [theme.mediaMaxWidth]: {
      height: 350,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  background: {
    position: 'absolute',
    top: -500,
    left: -1000,
    right: -1000,
    height: 630,
    opacity: 0.4,
    borderRadius: '50%',
    backgroundColor: theme.background.primary,
    boxShadow: '0 0 6px 6px rgba(0 0 0 / 50%)',
    zIndex: -1,
    [theme.mediaMaxWidth]: {
      height: 680,
    },
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 170,
    zIndex: -2,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',

    [theme.mediaMaxWidth]: {
      height: 310,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
    },
  },
  menuBackground: {
    position: 'absolute',
    top: -450,
    left: -1000,
    right: -1000,
    height: 630,
    opacity: 0.8,
    backgroundColor: Color(theme.background.primary).darken(0.2).hex(),
    boxShadow: '0 0 10px 10px rgba(0 0 0 / 30%)',
    zIndex: -1,
    [theme.mediaMaxWidth]: {
      height: 770,
    },
  },
  menuItem: {},
  menuItemLink: {
    textDecoration: 'none',
    color: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    display: 'inline-flex',
    flex: 'inherit',
    flexDirection: 'inherit',
  },
  menuItemContent: {
    cursor: 'pointer',
  },
  title: {
    letterSpacing: 14,
    textShadow: '0px 4px 5px rgba(0 0 0 / 40%)',
    pointerEvents: 'all',
    cursor: 'pointer',
    textAlign: 'center',
    flexGrow: 0,
  },
  titleContainer: {
    pointerEvents: 'none',
  },
  logo: {
    opacity: 0.9,
    filter: 'drop-shadow(0px 4px 5px rgba(0 0 0 / 40%))',
    pointerEvents: 'all',
    cursor: 'pointer',
  },
  contactDetails: {
    position: 'absolute',
    top: 10,
    right: 10,
    bottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',

    [theme.mediaMaxWidth]: {
      position: 'relative',
      flexGrow: 1,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
  },
  socialLinks: {
    paddingRight: 6,
    justifyContent: 'flex-end',

    [theme.mediaMaxWidth]: {
      position: 'absolute',
      top: -54,
      right: 0,
      flexDirection: 'column',
    },
  },
  link: {
    cursor: 'pointer',
    height: 'min-content',
  },
  nextdoor: {
    marginLeft: -2,
  },
});

export const TitleBar = createComponent('TitleBar', () => {
  const { css } = useStyles();

  const visit = useDelegatedBound((page: string) => () => {
    switch (page) {
      case 'twitter': window.open('https://twitter.com/rayneswayblinds', '_blank'); break;
      case 'facebook': window.open('https://www.facebook.com/rayneswayblinds', '_blank'); break;
      case 'instagram': window.open('https://www.instagram.com/rayneswayblinds', '_blank'); break;
      case 'nextdoor': window.open('https://nextdoor.co.uk/pages/raynesway-blinds-derby-england', '_blank'); break;
    }
  });

  return (
    <Flex tagName="title-bar" className={css.titleBar}>
      <Flex tagName="title-bar-background" className={css.background} />
      <Flex tagName="title-bar-menu" className={css.menu}>
        <Flex tagName="title-bar-background-menu" className={css.menuBackground} />
        <Flex tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
          <Link to="/blinds" className={css.menuItemLink}>
            <Typography type={'website-title-menu-item'} className={css.menuItemContent}>Blinds</Typography>
          </Link>
        </Flex>
        <Flex tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
          <Link to="/shutters" className={css.menuItemLink}>
            <Typography type="website-title-menu-item" className={css.menuItemContent}>Shutters</Typography>
          </Link>
        </Flex>
        <Flex tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
          <Link to="/awnings" className={css.menuItemLink}>
            <Typography type="website-title-menu-item" className={css.menuItemContent}>Awnings</Typography>
          </Link>
        </Flex>
        <Flex tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
          <Link to="/about" className={css.menuItemLink}>
            <Typography type="website-title-menu-item" className={css.menuItemContent}>About</Typography>
          </Link>
        </Flex>
      </Flex>
      <Flex tagName="title-bar-title" isVertical gap={4} disableGrow align={'center'} className={css.titleContainer}>
        <Link to="/" className={css.menuItemLink}>
          <img src="/images/logo.png" alt="Raynesway Blinds Logo" width={80} height={80} className={css.logo} />
          <Typography type="website-title" className={css.title}>RAYNESWAY BLINDS</Typography>
        </Link>
      </Flex>
      <Flex tagName="title-bar-contact-details" className={css.contactDetails} gap={8} height="min-content" disableGrow>
        <a href="tel:+443330470585" className={css.link}>
          <Tooltip content="Call us on 03330 470585">
            <Typography type={'website-title-telephone-number'} className={css.link}>0333 047 0585</Typography>
          </Tooltip>
        </a>
        <Flex tagName="title-bar-social-links" gap={8} className={css.socialLinks}>
          <Tooltip content="Visit our Facebook page">
            <Icon name="facebook" color={theme.text.secondary} className={css.link} onClick={visit('facebook')} />
          </Tooltip>
          <Tooltip content="View our Twitter feed">
            <Icon name="twitter" color={theme.text.secondary} className={css.link} onClick={visit('twitter')} />
          </Tooltip>
          <Tooltip content="View our Instagram feed">
            <Icon name="instagram" color={theme.text.secondary} className={css.link} onClick={visit('instagram')} />
          </Tooltip>
          {/* <Tooltip content="View our Nextdoor page">
            <Icon name="nextdoor" color={theme.text.secondary} className={join(css.link, css.nextdoor)} onClick={visit('nextdoor')} />
          </Tooltip> */}
        </Flex>
      </Flex>
    </Flex>
  );
});
