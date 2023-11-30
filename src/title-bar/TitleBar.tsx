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
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -2,
    width: '100%',
    justifyContent: 'space-evenly',
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
  },
  menuItem: {
    paddingTop: 144,
  },
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
  },
  socialLinks: {
    paddingRight: 6,
  },
  socialLink: {
    cursor: 'pointer',
  },
});

export const TitleBar = createComponent('TitleBar', () => {
  const { css } = useStyles();

  const visit = useDelegatedBound((page: string) => () => {
    switch (page) {
      case 'twitter': window.open('https://twitter.com/rayneswayblinds', '_blank'); break;
      case 'facebook': window.open('https://www.facebook.com/rayneswayblinds', '_blank'); break;
      case 'instagram': window.open('https://www.instagram.com/rayneswayblinds', '_blank'); break;
    }
  });

  return (
    <Flex tagName="title-bar" className={css.titleBar} align="center">
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
      </Flex>
      <Flex tagName="title-bar-title" isVertical gap={4} disableGrow align={'center'} className={css.titleContainer}>
        <Link to="/" className={css.menuItemLink}>
          <img src="/images/logo.png" alt="Raynesway Blinds Logo" width={80} height={80} className={css.logo} />
          <Typography type="website-title" className={css.title}>~ RAYNESWAY BLINDS ~</Typography>
        </Link>
      </Flex>
      <Flex tagName="title-bar-contact-details" isVertical className={css.contactDetails} gap={8} align="right" height="min-content">
        <Typography type={'website-title-telephone-number'}>03330 470585</Typography>
        <Flex tagName="title-bar-social-links" gap={8} className={css.socialLinks}>
          <Tooltip content="Visit our Facebook page">
            <Icon name="facebook" color={theme.text.secondary} className={css.socialLink} onClick={visit('facebook')} />
          </Tooltip>
          <Tooltip content="View our Twitter feed">
            <Icon name="twitter" color={theme.text.secondary} className={css.socialLink} onClick={visit('twitter')} />
          </Tooltip>
          <Tooltip content="View our Instagram feed">
            <Icon name="instagram" color={theme.text.secondary} className={css.socialLink} onClick={visit('instagram')} />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
});
