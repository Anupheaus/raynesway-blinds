import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { ComponentProps, useMemo } from 'react';
import { theme } from '../theme';

const useStyles = createStyles({
  image: {
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dropShadow: {
    '&>img': {
      boxShadow: theme.shadows.medium,
    },
  },
  link: {
    cursor: 'pointer',
  },
});

interface Props extends ComponentProps<typeof Flex> {
  src: string;
  thumbnail?: string;
  dropShadow?: boolean;
  isLooped?: boolean;
}

export const Media = createComponent('Media', ({
  src,
  className,
  thumbnail,
  dropShadow = false,
  isLooped = false,
  onClick,
  ...props
}: Props) => {
  const { css, join } = useStyles();

  const extension = src.split('.').last();

  const content = useMemo(() => {
    switch (extension) {
      case 'mp4':
        return <video src={src} className={css.img} autoPlay muted loop={isLooped} poster={thumbnail} />;
      default:
        return <img src={src} className={css.img} loading={'lazy'} />;
    }
  }, [src, extension]);

  return (
    <Flex
      {...props}
      onClick={onClick}
      tagName="media"
      className={join(css.image, dropShadow && css.dropShadow, onClick != null && css.link, className)}
    >
      {content}
    </Flex>
  );
});
