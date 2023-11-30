import { AnyObject } from '@anupheaus/common';
import { createComponent, createStyles, Flex, useForceUpdate } from '@anupheaus/react-ui';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Awnings } from './awnings';
import { Background } from './background';
import { Blinds } from './blinds';
import { Shutters } from './shutters';

const useStyles = createStyles({
  background: {
    position: 'absolute',
    top: 0,
    left: -100,
    right: -100,
    bottom: -100,
    transitionProperty: 'top, left, right, bottom, opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  backgroundLeft: {
    left: 0,
    right: -200,
  },
  backgroundRight: {
    left: -200,
    right: 0,
  },
  backgroundUp: {
    left: -100,
    right: -100,
  },
  backgroundDown: {
    top: -100,
    bottom: 0,
  },
  carousel: {
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  fadeCarousel: {
    opacity: 0.2,
  },
  content: {
    position: 'absolute',
    inset: 0,
    top: 280,
    zIndex: 0,
    transitionProperty: 'top, left, right, bottom, opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  contentContainer: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    transitionProperty: 'opacity, top, left, right, bottom',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  isVisible: {
    opacity: 1,
    inset: 0,
    zIndex: 1,
  },
  innerContent: {
    position: 'absolute',
    inset: 0,
  },
  blinds: {
    left: 0,
    right: 200,
  },
  shutters: {
    left: 100,
    right: 100,
  },
  awnings: {
    left: 200,
    right: 0,
  },
});

export const Content = createComponent('Content', () => {
  const { css, join } = useStyles();
  const { pathname } = useLocation();
  const visiblePaths = useRef(new Set<string>()).current;
  const hasRendered = useRef(new Map<string, boolean>()).current;
  const refresh = useForceUpdate();

  const [backgroundClasses, contentClasses, carouselClasses] = useMemo<[string[], string[], string[]]>(() => {
    switch (pathname.toLowerCase()) {
      case '/blinds':
        return [[css.backgroundLeft, css.backgroundDown], [], [css.fadeCarousel]];
      case '/awnings':
        return [[css.backgroundRight, css.backgroundDown], [], [css.fadeCarousel]];
      case '/shutters':
        return [[css.backgroundDown], [], [css.fadeCarousel]];
      default:
        return [[css.backgroundUp], [], []];
    }
  }, [pathname]);

  function createContent(path: string, render: () => ReactNode) {
    const isVisible = pathname.toLowerCase() === `/${path.toLowerCase()}`;
    if (!isVisible && !visiblePaths.has(path)) return;
    visiblePaths.add(path);
    const currentHasRendered = hasRendered.has(path) === true;
    hasRendered.set(path, true);
    return (
      <Flex key={path} className={join(css.contentContainer, (css as AnyObject)[`content_${path}`], isVisible && currentHasRendered && css.isVisible)}>
        {render()}
      </Flex>
    );
  }

  const content = useMemo(() => [
    createContent('blinds', () => <Blinds className={join(css.innerContent, css.blinds)} />),
    createContent('shutters', () => <Shutters className={join(css.innerContent, css.shutters)} />),
    createContent('awnings', () => <Awnings className={join(css.innerContent, css.awnings)} />),
  ], [pathname, hasRendered.size]);

  useEffect(() => {
    refresh();
  }, [hasRendered.size]);

  return (
    <>
      <Background
        className={join(css.background, ...backgroundClasses)}
        carouselClassName={join(css.carousel, ...carouselClasses)}
        showMessages={pathname.toLowerCase() === '/'}
      >
        <Flex tagName="content" className={join(css.content, ...contentClasses)}>{content}</Flex>
      </Background>
    </>
  );
});