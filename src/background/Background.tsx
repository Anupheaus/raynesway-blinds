import { Carousel, createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { ReactNode, useState } from 'react';
import { Messages } from './Messages';

const imageURLs = [
  './images/first-image.webp',
  './images/second-image.webp',
  './images/third-image.webp',
  './images/fourth-image.webp',
  './images/fifth-image.webp',
  './images/sixth-image.webp',
];

const useStyles = createStyles({
  carousel: {
    opacity: 0.5,
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
  },
  areMessagesVisible: {
    opacity: 1,
    pointerEvents: 'all',
  },
});

const intervalMS = 8000;

interface Props {
  className?: string;
  carouselClassName?: string;
  showMessages?: boolean;
  children?: ReactNode;
}

export const Background = createComponent('Background', ({
  className,
  carouselClassName,
  showMessages = false,
  children = null,
}: Props) => {
  const { css, join } = useStyles();
  const [messageIndex, setMessageIndex] = useState<number>(0);

  return (
    <Flex tagName="background" isVertical className={className}>
      <Carousel
        imageURLs={imageURLs}
        intervalMS={intervalMS}
        transitionDurationMS={3000}
        className={join(css.carousel, carouselClassName)}
        onTransition={setMessageIndex}
      />
      <Flex tagName="message" className={join(css.messages, showMessages && css.areMessagesVisible)} alignCentrally>
        <Messages index={messageIndex} intervalMS={intervalMS} />
      </Flex>
      {children}
    </Flex>
  );
});