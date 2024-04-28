import { ComponentProps } from 'react';
import { Button as ReactUIButton, createComponent, createStyles } from '@anupheaus/react-ui';
import { theme } from '../theme';

const useStyles = createStyles(({ pseudoClasses }, { applyTransition }) => ({
  button: {
    borderRadius: 4,
    padding: '12px 16px',
    backgroundColor: theme.button.normal.background,
    color: theme.button.normal.color,
    textTransform: 'uppercase',
    fontFamily: 'Mulish, sans-serif',
    boxShadow: theme.shadows.light,
    ...applyTransition('box-shadow, background-color'),

    [pseudoClasses.active]: {
      backgroundColor: theme.button.active.background,
      color: theme.button.active.color,
      boxShadow: theme.shadows.medium,
    },
  },
}));

interface Props extends ComponentProps<typeof ReactUIButton> {
}

export const Button = createComponent('Button', ({
  ...props
}: Props) => {
  const { css, join } = useStyles();

  return (
    <ReactUIButton {...props} className={join(css.button, props.className)} />
  );
});