import { ComponentProps } from 'react';
import { Button as ReactUIButton, createComponent, createStyles } from '@anupheaus/react-ui';
import { theme } from '../theme';

const useStyles = createStyles({
  button: {
    borderRadius: 0,
    padding: '12px 16px',
    color: theme.text.primary,

    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 4,
      border: 'solid 1px rgba(255 255 255 / 50%)',
    },
  },
});

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