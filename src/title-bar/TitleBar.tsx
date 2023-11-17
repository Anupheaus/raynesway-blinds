import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { Typography } from '../typography';

const useStyles = createStyles({
  titleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    overflow: 'hidden',
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: -500,
    left: -1000,
    right: -1000,
    height: 630,
    opacity: 0.8,
    borderRadius: '50%',
    backgroundColor: theme.background.primary,
    boxShadow: `0 0 10px 10px rgba(0 0 0 / 50%)`,
    zIndex: -1,
  },
  title: {
    letterSpacing: 14,
    textShadow: '0px 4px 5px rgba(0 0 0 / 40%)',
  },
  logo: {
    opacity: 0.9,
    filter: 'drop-shadow(0px 4px 5px rgba(0 0 0 / 40%))',
  },
  contactDetails: {
    position: 'absolute',
    top: 10,
    right: 10,
    bottom: 10,
  },
});

export const TitleBar = createComponent('TitleBar', () => {
  const { css } = useStyles();

  return (
    <Flex tagName={'title-bar'} className={css.titleBar} align={'center'}>
      <Flex tagName={'title-bar-background'} className={css.background} />
      <Flex tagName={'title-bar-title'} isVertical gap={4} disableGrow align={'center'}>
        <img src={'./images/logo.webp'} alt={'logo'} width={80} height={80} className={css.logo} />
        <Typography type={'website-title'} className={css.title}>~ RAYNESWAY BLINDS ~</Typography>
      </Flex>
      <Flex tagName={'title-bar-contact-details'} className={css.contactDetails}>
        <Typography type={'website-title-telephone-number'}>01332 280585</Typography>
      </Flex>
    </Flex>
  );
});
