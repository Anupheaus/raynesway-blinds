import { Carousel, createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { CSSProperties, ReactNode, useMemo, useState } from 'react';
import { theme } from '../theme';
import { TransitionContext, TransitionContextProps } from './TransitionContext';

const imageURLs = [
  '/images/first-image.webp',
  '/images/second-image.webp',
  '/images/third-image.webp',
  '/images/fourth-image.webp',
  '/images/fifth-image.webp',
  '/images/sixth-image.webp',
];

const useStyles = createStyles({
  carousel: {
    opacity: 0.5,
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  fadeCarousel: {
    opacity: 0.2,
  },
  messages: {
    position: 'absolute',
    top: 180,
    left: 100,
    right: 100,
    bottom: 100,
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    overflow: 'hidden',

    [theme.mediaMaxWidth]: {
      top: 320,
    },
  },
  areMessagesVisible: {
    opacity: 1,
    pointerEvents: 'all',
  },
});

const intervalMS = 8000;

interface Props {
  className?: string;
  fadeCarousel?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
  onTransition?(index: number): void;

}

export const Background = createComponent('Background', ({
  className,
  fadeCarousel = false,
  style,
  children = null,
}: Props) => {
  const { css, join } = useStyles();
  const [transitionIndex, setTransitionIndex] = useState<number>(0);

  const context = useMemo<TransitionContextProps>(() => ({
    transitionIndex,
    intervalMS,
  }), [transitionIndex]);

  return (
    <Flex tagName="background" isVertical className={className} style={style}>
      <Carousel
        imageURLs={imageURLs}
        intervalMS={intervalMS}
        transitionDurationMS={3000}
        className={join(css.carousel, fadeCarousel && css.fadeCarousel)}
        onTransition={setTransitionIndex}
      />
      <TransitionContext.Provider value={context}>
        {children}
      </TransitionContext.Provider>
    </Flex>
  );
});