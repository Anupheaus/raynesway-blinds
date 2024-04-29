import { Flex, createComponent, createStyles, useBound } from '@anupheaus/react-ui';
import { Media } from '../media';
import { theme } from '../theme';

const useStyles = createStyles({
  whatsappMe: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,

    [theme.mediaMaxWidth]: {
      bottom: 16,
      right: 16,
    }
  },
  shadow: {
    '&>img': {
      filter: 'drop-shadow(0px 3px 1px rgba(0 0 0 / 30%))',
    },
  },
});

export const WhatsappMe = createComponent('WhatsappMe', () => {
  const { css } = useStyles();

  const createMessage = useBound(() => {
    window.open('https://wa.me/441332280585', '_blank');
  });

  return (
    <Flex className={css.whatsappMe}>
      <Media src="/images/WhatsApp.webp" className={css.shadow} onClick={createMessage} tooltip="Contact us through WhatsApp!" />
    </Flex>
  );
});
