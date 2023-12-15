import { Flex, createStyles, useForceUpdate } from '@anupheaus/react-ui';
import { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PageConfig } from '../pages';

const useStyles = createStyles({
  lazyLoadedPage: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    transitionProperty: 'opacity, top, left, right, bottom',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    overflow: 'hidden',
  },
  isVisible: {
    opacity: 1,
    zIndex: 1,
  },
});

function createMatchPath(pages: PageConfig[]) {
  const allPaths = new Set<string>(pages.map(({ path }) => path.toLowerCase()));
  return (path: string, pathname: string) => {
    path = path.toLowerCase();
    pathname = pathname.toLowerCase();
    if (path === '/') return pathname === '/';
    if (pathname === '/') return false;
    if (allPaths.has(pathname)) return path === pathname;
    const shortPath = pathname.length > path.length ? path : pathname;
    const longPath = pathname.length <= path.length ? path : pathname;
    return longPath.toLowerCase().startsWith(shortPath.toLowerCase());
  };
}

interface Props {
  pages: PageConfig[];
  lazyLoadedPageStyles?: CSSProperties[];
  lazyLoadedPageClassName?: string;
}

export function useLazyLoadPages({ pages, lazyLoadedPageClassName, lazyLoadedPageStyles }: Props): ReactNode {
  const { pathname } = useLocation();
  const { css, join } = useStyles();
  const visiblePaths = useRef(new Set<string>()).current;
  const hasRendered = useRef(new Map<string, boolean>()).current;
  const refresh = useForceUpdate();
  const matchPath = createMatchPath(pages);

  const result = useMemo(() => pages.map(({ path, component: Component }, index) => {
    const isActive = matchPath(path, pathname);
    if (!isActive && !visiblePaths.has(path)) return null;
    visiblePaths.add(path);
    const currentHasRendered = hasRendered.has(path) === true;
    hasRendered.set(path, true);
    return (
      <Flex
        tagName="lazy-loaded-page"
        key={path}
        className={join(css.lazyLoadedPage, isActive && currentHasRendered && css.isVisible, lazyLoadedPageClassName)}
        style={lazyLoadedPageStyles?.[index]}
      >
        <Component isActive={isActive} />
      </Flex>
    );
  }), [pages, lazyLoadedPageStyles, lazyLoadedPageClassName, pathname, visiblePaths.size, hasRendered.size]);

  useEffect(() => {
    refresh();
  }, [hasRendered.size]);

  return result;
}
