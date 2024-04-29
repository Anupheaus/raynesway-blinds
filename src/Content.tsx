import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { CSSProperties, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Background } from './background';
import { pages } from './pages';
import { useSubMenu } from './sub-menu-provider';
import { matchPath } from './helpers';
import { useLazyLoadPages } from './hooks';
import { theme } from './theme';

const xOverlap = 200;
const yOverlap = 100;

const useStyles = createStyles({
  background: {
    position: 'absolute',
    top: 0,
    left: -(xOverlap / 2),
    right: -(xOverlap / 2),
    bottom: -yOverlap,
    transitionProperty: 'top, left, right, bottom, opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    '--content-offset': `${yOverlap}px`,
  },
  contentPage: {
    left: -(xOverlap / 2),
    right: -(xOverlap / 2),
  },
  content: {
    position: 'absolute',
    inset: 0,
    top: 'calc(var(--title-area-height) + var(--menu-area-height) + var(--sub-menu-area-height) + var(--content-offset))',
    zIndex: 0,
    transitionProperty: 'top, left, right, bottom, opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',

    [theme.mediaMaxWidth]: {
      top: 'calc(var(--title-area-height)  + var(--content-offset))',
    }
  },
});

export const Content = createComponent('Content', () => {
  const { css, join } = useStyles();
  const { pathname } = useLocation();
  const subMenuOptions = useSubMenu();

  const pageStyles = useMemo<{ styles: CSSProperties, fadeCarousel: boolean; }[]>(() => {
    const x = (xOverlap / (pages.length - 2));
    return pages.map(({ isDefault }, index) => isDefault ? {
      styles: {
        top: -yOverlap,
        bottom: yOverlap,
      },
      fadeCarousel: false,
    } : {
      styles: {
        left: x * (index - 1),
        right: xOverlap - (x * (index - 1)),
      },
      fadeCarousel: true,
    });
  }, []);

  const content = useLazyLoadPages({ pages, lazyLoadedPageClassName: css.contentPage, lazyLoadedPageStyles: pageStyles.map(({ styles }) => styles) });

  const [backgroundStyle, fadeCarousel] = useMemo<[CSSProperties, boolean]>(() => {
    const currentIndex = pages.findIndex(({ path }) => matchPath(path, pathname)) ?? 0;
    const { styles, fadeCarousel: fc } = pageStyles[currentIndex] ?? pageStyles[0];
    return [currentIndex === 0 ? {
      top: 0,
      bottom: -yOverlap,
      '--sub-menu-area-height': '0px',
    } : {
      top: -yOverlap,
      bottom: 0,
      left: -(styles.left ?? 0),
      right: -(styles.right ?? 0),
      ...(subMenuOptions.length === 0 ? { '--sub-menu-area-height': '0px' } : {}),
    }, fc];
  }, [pathname, pageStyles, subMenuOptions]);

  return (
    <Background
      className={join(css.background)}
      fadeCarousel={fadeCarousel}
      style={backgroundStyle}
    >
      <Flex tagName="content" className={css.content}>
        {content}
      </Flex>
    </Background>
  );
});