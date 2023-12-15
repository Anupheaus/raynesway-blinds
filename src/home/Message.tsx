import { createAnimationKeyFrame, createComponent, createStyles } from '@anupheaus/react-ui';
import { CSSProperties, ComponentProps, ReactNode, useMemo } from 'react';
import { Typography } from '../typography';

const slideDown = createAnimationKeyFrame({ '0%': { transform: 'translateY(-60px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } });
const slideLeft = createAnimationKeyFrame({ '0%': { transform: 'translateX(60px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } });
const slideRight = createAnimationKeyFrame({ '0%': { transform: 'translateX(-60px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } });
const slideUp = createAnimationKeyFrame({ '0%': { transform: 'translateY(60px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } });

const useStyles = createStyles({
  message: {
    opacity: 0,
    animationDuration: '3s',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'forwards',
  },
  slideDown: { animationName: slideDown },
  slideLeft: { animationName: slideLeft },
  slideRight: { animationName: slideRight },
  slideUp: { animationName: slideUp },
});

interface Props {
  slide?: 'left' | 'right' | 'up' | 'down';
  delayMS?: number;
  fontType: ComponentProps<typeof Typography>['type'];
  fontSize?: ComponentProps<typeof Typography>['size'];
  fontWeight?: ComponentProps<typeof Typography>['weight'];
  color?: ComponentProps<typeof Typography>['color'];
  paddingRight?: number | string;
  paddingLeft?: number | string;
  children?: ReactNode;
}

export const Message = createComponent('Message', ({
  slide = 'left',
  delayMS = 0,
  paddingLeft,
  paddingRight,
  fontType,
  fontSize,
  color,
  fontWeight,
  children,
}: Props) => {
  const { css, join } = useStyles();

  const style = useMemo<CSSProperties>(() => ({
    animationDelay: `${delayMS}ms`,
    paddingLeft,
    paddingRight,
  }), [delayMS, paddingLeft, paddingRight]);

  return (
    <Typography
      type={fontType}
      size={fontSize}
      weight={fontWeight}
      color={color}
      className={join(
        css.message,
        slide === 'down' && css.slideDown,
        slide === 'left' && css.slideLeft,
        slide === 'right' && css.slideRight,
        slide === 'up' && css.slideUp,
      )}
      style={style}
    >
      {children}
    </Typography>
  );
});
