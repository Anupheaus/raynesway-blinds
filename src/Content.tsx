import { AnyObject } from '@anupheaus/common';
import { createComponent, createStyles, Flex, useForceUpdate } from '@anupheaus/react-ui';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Awnings } from './awnings';
import { Background } from './background';
import { Blinds } from './blinds';
import { Shutters } from './shutters';
import { Helmet } from 'react-helmet';
import defaultRichResults from './rich-results/default.json';
import { About } from './about';

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
  backgroundBlinds: {
    left: 0,
    right: -200,
  },
  backgroundShutters: {
    left: -67,
    right: -134,
  },
  backgroundAwnings: {
    left: -134,
    right: -67,
  },
  backgroundAbout: {
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
    left: 67,
    right: 134,
  },
  awnings: {
    left: 134,
    right: 67,
  },
  about: {
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

  const [title, description, richResults, backgroundClasses, carouselClasses] = useMemo<[string, string, AnyObject, string[], string[]]>(() => {
    switch (pathname.toLowerCase()) {
      case '/blinds':
        return ['Raynesway Blinds - Blinds', 'Discover the perfect window solutions with Raynesway Blinds! Explore our exquisite collection ' +
          'of blinds, meticulously crafted to elevate your space.  From stylish designs to customizable options, find the ideal window treatments ' +
          'for every room.', defaultRichResults, [css.backgroundDown, css.backgroundBlinds], [css.fadeCarousel]];
      case '/shutters':
        return ['Raynesway Blinds - Shutters', 'Enhance your living spaces with Raynesway Blinds\' exquisite Shutters collection. Elevate your home\'s aesthetics ' +
          'and functionality with our premium shutter designs, meticulously crafted for durability and style.', defaultRichResults, [css.backgroundDown, css.backgroundShutters], [css.fadeCarousel]];
      case '/awnings':
        return ['Raynesway Blinds - Awnings', 'Elevate your outdoor living with Raynesway Blinds\' awnings! Explore our premium range of stylish and durable ' +
          'awnings, designed to enhance your space while providing shade and comfort. From sleek modern designs to classic styles, Raynesway Blinds\' awnings ' +
          'offers a perfect blend of form and function for your patio or deck.', defaultRichResults, [css.backgroundDown, css.backgroundAwnings], [css.fadeCarousel]];
      case '/about':
        return ['Raynesway Blinds - About', '', defaultRichResults, [css.backgroundDown, css.backgroundAbout], [css.fadeCarousel]];
      default:
        return ['Raynesway Blinds', 'Raynesway Blinds manufacture blinds, shutters and awnings using only the finest materials.  ' +
          'We are also open 5 days a week and can visit to measure and quote on saturday by appointment for your convenience.', defaultRichResults, [css.backgroundUp], []];
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
    createContent('about', () => <About className={join(css.innerContent, css.about)} />),
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
        <Flex tagName="content" className={css.content}>{content}</Flex>
      </Background>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify(richResults)}</script>
      </Helmet>
    </>
  );
});