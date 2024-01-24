import { createComponent, createStyles, Flex, Tooltip, useDelegatedBound, useForceUpdate } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { Typography } from '../typography';
import Color from 'color';
import { Link } from 'react-router-dom';
import { Icon } from '../icon';
import { useEffect, useMemo, useRef } from 'react';
import { pages } from '../pages';
import { useSubMenu } from '../sub-menu-provider';

const useStyles = createStyles({
  titleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 'calc(var(--title-area-height) + var(--menu-area-height) + var(--sub-menu-area-height) + 25px)',
    zIndex: 1,
    justifyContent: 'center',
    pointerEvents: 'none',

    [theme.mediaMaxWidth]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  background: {
    position: 'absolute',
    top: -500,
    left: -1000,
    right: -1000,
    height: 'calc(var(--title-area-height) + 500px)',
    opacity: 0.4,
    borderRadius: '50%',
    backgroundColor: theme.background.primary,
    boxShadow: '0 0 6px 6px rgba(0 0 0 / 50%)',
    zIndex: -1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 'calc(var(--title-area-height) + var(--menu-area-height))',
    zIndex: -2,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: 12,
    boxSizing: 'border-box',
    pointerEvents: 'all',

    [theme.mediaMaxWidth]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
    },
  },
  subMenuContainer: {
    position: 'absolute',
    inset: 0,
    top: 'calc(var(--title-area-height) + var(--menu-area-height))',
    height: 'calc(var(--sub-menu-area-height) + 25px)',
    zIndex: -3,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  subMenu: {
    position: 'absolute',
    inset: 0,
    top: 'calc(0px - var(--sub-menu-area-height) - 10px)',
    height: 'var(--sub-menu-area-height)',
    transitionProperty: 'top',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: 12,
    boxSizing: 'border-box',


    [theme.mediaMaxWidth]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
    },
  },
  subMenuIsVisible: {
    top: 0,
    pointerEvents: 'all',
  },
  menuBackground: {
    position: 'absolute',
    top: 0,
    left: -100,
    right: -100,
    height: '100%',
    opacity: 0.8,
    backgroundColor: Color(theme.background.primary).darken(0.2).hex(),
    boxShadow: '0 0 10px 10px rgba(0 0 0 / 30%)',
    zIndex: -1,
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
    flexGrow: 0,
    width: 'min-content',
    pointerEvents: 'all',
  },
  menuItemContent: {
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textAlign: 'center',

    [theme.mediaMaxWidth]: {
      whiteSpace: 'normal',
    },
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
    alignItems: 'center',

    [theme.mediaMaxWidth]: {
      alignItems: 'flex-start',
    },
  },
  titleLink: {
    [theme.mediaMaxWidth]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
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
    pointerEvents: 'none',

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
      top: -84,
      right: 0,
      flexDirection: 'column',
      flexWrap: 'wrap-reverse',
      maxHeight: 'var(--title-area-height)',
    },
  },
  link: {
    cursor: 'pointer',
    height: 'min-content',
    pointerEvents: 'all',
  },
  nextdoor: {
    marginLeft: -2,
    marginTop: -2,
  },
});

export const TitleBar = createComponent('TitleBar', () => {
  const { css, join } = useStyles();
  const subMenuOptions = useSubMenu();
  const currentSubMenuOptionsRef = useRef(subMenuOptions);
  const hideSubMenu = !Reflect.areDeepEqual(subMenuOptions, currentSubMenuOptionsRef.current) && currentSubMenuOptionsRef.current.length > 0;
  if (currentSubMenuOptionsRef.current.length === 0 && subMenuOptions.length > 0) currentSubMenuOptionsRef.current = subMenuOptions;
  const update = useForceUpdate();

  const visit = useDelegatedBound((page: string) => () => {
    switch (page) {
      case 'twitter': window.open('https://twitter.com/rayneswayblinds', '_blank'); break;
      case 'facebook': window.open('https://www.facebook.com/rayneswayblinds', '_blank'); break;
      case 'instagram': window.open('https://www.instagram.com/rayneswayblinds', '_blank'); break;
      case 'linkedin': window.open('https://www.linkedin.com/company/raynesway-blinds', '_blank'); break;
      case 'pinterest': window.open('https://www.pinterest.co.uk/rayneswayblinds', '_blank'); break;
      case 'nextdoor': window.open('https://nextdoor.co.uk/pages/raynesway-blinds', '_blank'); break;
    }
  });

  const menuItems = useMemo(() => pages.filter(({ isDefault, isVisibleInMenu = true }) => !isDefault && isVisibleInMenu)
    .map(({ path, label }) => (
      <Flex key={path} tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
        <Link to={path} className={css.menuItemLink}>
          <Typography type="website-title-menu-item" className={css.menuItemContent}>{label}</Typography>
        </Link>
      </Flex>
    )), []);

  const subMenuItems = useMemo(() => currentSubMenuOptionsRef.current.map(({ path, label }) => (
    <Flex key={path} tagName="website-title-menu-item" className={css.menuItem} align="center" disableGrow>
      <Link to={path} className={css.menuItemLink}>
        <Typography type="website-title-menu-item" className={css.menuItemContent}>{label}</Typography>
      </Link>
    </Flex>
  )), [currentSubMenuOptionsRef.current]);

  useEffect(() => {
    setTimeout(() => {
      currentSubMenuOptionsRef.current = subMenuOptions;
      update();
    }, 1000);
  }, [subMenuOptions]);

  return (
    <Flex tagName="title-bar" className={css.titleBar}>
      <Flex tagName="title-bar-background" className={css.background} />
      <Flex tagName="title-bar-menu" className={css.menu}>
        <Flex tagName="title-bar-background-menu" className={css.menuBackground} />
        {menuItems}
      </Flex>
      <Flex tagName="title-bar-sub-menu" className={css.subMenuContainer}>
        <Flex tagName="title-bar-sub-menu" className={join(css.subMenu, !hideSubMenu && currentSubMenuOptionsRef.current.length > 0 && css.subMenuIsVisible)}>
          <Flex tagName="title-bar-background-sub-menu" className={css.menuBackground} />
          {subMenuItems}
        </Flex>
      </Flex>
      <Flex tagName="title-bar-title" isVertical gap={4} disableGrow className={css.titleContainer}>
        <Link to="/" className={join(css.menuItemLink, css.titleLink)}>
          <img src="/images/logo.png" alt="Raynesway Blinds Logo" width={80} height={80} className={css.logo} />
          <Typography type="website-title" className={css.title}>RAYNESWAY BLINDS</Typography>
        </Link>
      </Flex>
      <Flex tagName="title-bar-contact-details" className={css.contactDetails} gap={8} height="min-content" disableGrow>
        <a href="tel:+443330470585" className={css.link}>
          <Tooltip content="Call us on 01332 280585">
            <Typography type={'website-title-telephone-number'} className={css.link}>01332 280585</Typography>
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
          <Tooltip content="Visit our Linked In page">
            <Icon name="linkedin" color={theme.text.secondary} className={css.link} onClick={visit('linkedin')} />
          </Tooltip>
          <Tooltip content="Visit our Pinterest page">
            <Icon name="pinterest" color={theme.text.secondary} className={css.link} onClick={visit('pinterest')} />
          </Tooltip>
          <Tooltip content="Visit our Nextdoor page">
            <Icon name="nextdoor" color={theme.text.secondary} className={join(css.link, css.nextdoor)} onClick={visit('nextdoor')} />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
});
