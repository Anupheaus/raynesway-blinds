import { Carousel, createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { ReactNode } from 'react';

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
});

interface Props {
  className?: string;
  carouselClassName?: string;
  children?: ReactNode;
}

export const Background = createComponent('Background', ({
  className,
  carouselClassName,
  children = null,
}: Props) => {
  const { css, join } = useStyles();

  return (
    <Flex tagName="background" isVertical className={className}>
      <Carousel imageURLs={imageURLs} intervalMS={7000} transitionDurationMS={3000} className={join(css.carousel, carouselClassName)} />
      {children}
    </Flex>
  );
});